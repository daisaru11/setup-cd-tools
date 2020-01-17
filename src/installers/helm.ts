import * as core from '@actions/core';
import * as os from 'os';
import * as path from 'path';
import { Installer } from './installer';
import { getTarballBinary } from './utils';

const toolName = 'helm';

export class HelmInstaller implements Installer {
  async install(version: string) {
    const url = getDownloadUrl(version);
    const binPath = getBinPath();
    const helmPath = await getTarballBinary(toolName, version, url, binPath);

    core.debug(`helm has been cached at ${helmPath}`);

    core.addPath(path.dirname(helmPath));
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
  const extension = os.platform() === 'win32' ? '.zip' : '.tar.gz';

  if (!arch || !platform) {
    throw `Unsupported platform. platform:${os.platform()}, arch:${os.arch()}`;
  }

  return `https://get.helm.sh/helm-v${version}-${platform}-${arch}${extension}`;
}

function getBinPath(): string {
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

  if (!arch || !platform) {
    throw `Unsupported platform. platform:${os.platform()}, arch:${os.arch()}`;
  }

  return `${platform}-${arch}`;
}
