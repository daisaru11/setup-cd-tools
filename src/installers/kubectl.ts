import * as core from '@actions/core';
import * as os from 'os';
import * as path from 'path';
import { Installer } from './installer';
import { getBinary } from './utils';

const toolName = 'kubectl';

export class KubectlInstaller implements Installer {
  async install(version: string) {
    const url = getDownloadUrl(version);
    const kubectlPath = await getBinary(toolName, version, url);

    core.debug(`kubectl has been cached at ${kubectlPath}`);

    core.addPath(path.dirname(kubectlPath));
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

  return `https://storage.googleapis.com/kubernetes-release/release/v${version}/bin/${platform}/${arch}/kubectl${extension}`;
}
