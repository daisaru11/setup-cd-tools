import * as core from '@actions/core';
import * as os from 'os';
import * as path from 'path';
import { Installer } from './installer';
import { getBinary } from './utils';

const toolName = 'skaffold';

export class SkaffoldInstaller implements Installer {
  async install(version: string) {
    const url = getDownloadUrl(version);
    const skaffoldPath = await getBinary(toolName, version, url);

    core.debug(`skaffold has been cached at ${skaffoldPath}`);

    core.addPath(path.dirname(skaffoldPath));
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

  return `https://github.com/GoogleContainerTools/skaffold/releases/download/v${version}/skaffold-${platform}-${arch}${extension}`;
}
