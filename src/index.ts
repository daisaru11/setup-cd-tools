import * as core from '@actions/core';
import { JqInstaller } from './installers/jq';
import { YqInstaller } from './installers/yq';
import { KubectlInstaller } from './installers/kubectl';
import { KustomizeInstaller } from './installers/kustomize';
import { SkaffoldInstaller } from './installers/skaffold';
import { HelmInstaller } from './installers/helm';
import { HubInstaller } from './installers/hub';
import { Installer } from './installers/installer';

async function run() {
  for (const [tool, installer] of Object.entries(installers)) {
    const version = core.getInput(tool);
    if (version) {
      core.info(`Run installer. tool: ${tool}, version: ${version}`);
      await installer.install(version);
    }
  }

  core.info('Finished installing tools successfully.');
}

const installers = {
  jq: new JqInstaller(),
  yq: new YqInstaller(),
  kubectl: new KubectlInstaller(),
  kustomize: new KustomizeInstaller(),
  skaffold: new SkaffoldInstaller(),
  helm: new HelmInstaller(),
  hub: new HubInstaller(),
} as { [tool: string]: Installer };

run().catch(core.setFailed);
