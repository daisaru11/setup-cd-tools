import * as core from '@actions/core';
import * as os from 'os';
import * as path from 'path';
import { Installer } from './installer';
import { getBinary } from './utils';

const toolName = 'jq';

export class JqInstaller implements Installer {
  async install(version: string) {
    const url = getDownloadUrl(version);
    const jqPath = await getBinary(toolName, version, url);

    core.debug(`jq has been cached at ${jqPath}`);

    core.addPath(path.dirname(jqPath));
  }
}

function getDownloadUrl(version: string): string {
  let filename: string | null = null;

  switch (os.platform()) {
    case 'linux':
      switch (os.arch()) {
        case 'x64':
          filename = `jq-linux64`;
          break;
      }
      break;
    case 'darwin':
      switch (os.arch()) {
        case 'x64':
          filename = `jq-osx-amd64`;
          break;
      }
      break;
    case 'win32':
      switch (os.arch()) {
        case 'x64':
          filename = `jq-win64.exe`;
          break;
      }
      break;
  }

  if (!filename) {
    throw `Unsupported platform. platform:${os.platform()}, arch:${os.arch()}`;
  }

  return `https://github.com/stedolan/jq/releases/download/jq-${version}/${filename}`;
}
