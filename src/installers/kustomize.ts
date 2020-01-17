import * as core from '@actions/core';
import * as os from 'os';
import * as path from 'path';
import { Installer } from './installer';
import { getTarballBinary } from './utils';

const toolName = 'kustomize';

export class KustomizeInstaller implements Installer {
  async install(version: string) {
    const url = getDownloadUrl(version);
    const kustomizePath = await getTarballBinary(toolName, version, url);

    core.debug(`kustomize has been cached at ${kustomizePath}`);

    core.addPath(path.dirname(kustomizePath));
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

  if (!arch || !platform) {
    throw `Unsupported platform. platform:${os.platform()}, arch:${os.arch()}`;
  }

  return `https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv${version}/kustomize_v${version}_${platform}_${arch}.tar.gz`;
}
