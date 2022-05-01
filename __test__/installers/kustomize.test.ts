import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { KustomizeInstaller } from '../../src/installers/kustomize';

const toolDir = process.env['RUNNER_TOOL_CACHE'] as string;
const IS_WINDOWS = process.platform === 'win32';

describe('kustomize installer tests', () => {
  const installer = new KustomizeInstaller();

  const versions = ['4.5.4'];

  for (const version of versions) {
    it('Acquires the specified version of kustomize', async () => {
      await installer.install(version);

      const dir = path.join(toolDir, 'kustomize', version, os.arch());

      if (IS_WINDOWS) {
        expect(fs.existsSync(path.join(dir, 'kustomize.exe'))).toBe(true);
      } else {
        expect(fs.existsSync(path.join(dir, 'kustomize'))).toBe(true);
      }
    }, 100000);
  }
});
