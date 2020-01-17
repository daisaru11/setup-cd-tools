import * as core from '@actions/core';
import * as os from 'os';
import * as path from 'path';
import { Installer } from './installer';
import { getTarballBinary } from './utils';

const toolName = 'hub';

export class HubInstaller implements Installer {
  async install(version: string) {
    const url = getDownloadUrl(version);
    const binPath = getBinPath(url);
    const hubPath = await getTarballBinary(toolName, version, url, binPath);

    core.debug(`hub has been cached at ${hubPath}`);

    core.addPath(path.dirname(hubPath));
  }
}

function getDownloadUrl(version: string): string {
  let platformMap: { [platform: string]: string } = {
    linux: 'linux',
    darwin: 'darwin',
    win32: 'windows',
  };

  let archMap: { [arch: string]: string } = {
    x64: 'amd64',
  };

  const arch = archMap[os.arch()];
  const platform = platformMap[os.platform()];
  const extension = os.platform() === 'win32' ? '.zip' : '.tgz';

  if (!arch || !platform) {
    throw `Unsupported platform. platform:${os.platform()}, arch:${os.arch()}`;
  }

  return `https://github.com/github/hub/releases/download/v${version}/hub-${platform}-${arch}-${version}${extension}`;
}

function getBinPath(url: string): string {
  if (os.platform() === 'win32') {
    return 'bin';
  }

  return path.join(path.basename(url, path.extname(url)), 'bin');
}
