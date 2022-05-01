import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { HelmInstaller } from '../../src/installers/helm';

const toolDir = process.env['RUNNER_TOOL_CACHE'] as string;
const IS_WINDOWS = process.platform === 'win32';

describe('helm installer tests', () => {
  const installer = new HelmInstaller();

  const versions = ['3.8.0'];

  for (const version of versions) {
    it('Acquires the specified version of helm', async () => {
      await installer.install(version);

      const dir = path.join(toolDir, 'helm', version, os.arch());

      if (IS_WINDOWS) {
        expect(fs.existsSync(path.join(dir, 'helm.exe'))).toBe(true);
      } else {
        expect(fs.existsSync(path.join(dir, 'helm'))).toBe(true);
      }
    }, 100000);
  }
});
