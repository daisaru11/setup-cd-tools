import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';

export async function getBinary(
  toolName: string,
  version: string,
  url: string,
): Promise<string> {
  let cachedToolpath: string;
  cachedToolpath = tc.find(toolName, version);

  if (!cachedToolpath) {
    core.debug(`Downloading ${toolName} from: ${url}`);

    let downloadPath: string | null = null;
    try {
      downloadPath = await tc.downloadTool(url);
    } catch (error) {
      throw `Failed to download version ${version}: ${error}`;
    }

    cachedToolpath = await tc.cacheFile(
      downloadPath,
      toolName + getExecutableExtension(),
      toolName,
      version,
    );
  }

  const executablePath = path.join(
    cachedToolpath,
    toolName + getExecutableExtension(),
  );

  fs.chmodSync(executablePath, '777');

  return executablePath;
}

export async function getTarballBinary(
  toolName: string,
  version: string,
  url: string,
  binaryPath: string = '',
): Promise<string> {
  let cachedToolpath: string;
  cachedToolpath = tc.find(toolName, version);

  if (!cachedToolpath) {
    core.debug(`Downloading ${toolName} from: ${url}`);

    let downloadPath: string | null = null;
    try {
      downloadPath = await tc.downloadTool(url);
    } catch (error) {
      throw `Failed to download version ${version}: ${error}`;
    }

    let extPath: string;
    if (path.extname(url) === 'zip') {
      extPath = await tc.extractZip(downloadPath);
    } else {
      extPath = await tc.extractTar(downloadPath);
    }

    cachedToolpath = await tc.cacheFile(
      path.join(extPath, binaryPath, toolName + getExecutableExtension()),
      toolName + getExecutableExtension(),
      toolName,
      version,
    );
  }

  const executablePath = path.join(
    cachedToolpath,
    toolName + getExecutableExtension(),
  );

  fs.chmodSync(executablePath, '777');

  return executablePath;
}

export function getExecutableExtension(): string {
  if (os.type().match(/^Win/)) {
    return '.exe';
  }
  return '';
}
