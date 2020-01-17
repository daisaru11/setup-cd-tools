import * as core from '@actions/core';
import * as os from 'os';
import * as path from 'path';
import { Installer } from './installer';
import { getBinary } from './utils';

const toolName = 'yq';

export class YqInstaller implements Installer {
  async install(version: string) {
    const url = getDownloadUrl(version);
    const yqPath = await getBinary(toolName, version, url);

    core.debug(`yq has been cached at ${yqPath}`);

    core.addPath(path.dirname(yqPath));
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
  const extension = os.platform() === 'win32' ? '.exe' : '';

  if (!arch || !platform) {
    throw `Unsupported platform. platform:${os.platform()}, arch:${os.arch()}`;
  }

  return `https://github.com/mikefarah/yq/releases/download/${version}/yq_${platform}_${arch}${extension}`;
}
