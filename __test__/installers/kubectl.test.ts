import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { KubectlInstaller } from '../../src/installers/kubectl';

const toolDir = process.env['RUNNER_TOOL_CACHE'] as string;
const IS_WINDOWS = process.platform === 'win32';

describe('kubectl installer tests', () => {
  const installer = new KubectlInstaller();

  const versions = ['1.17.2', '1.16.6'];

  for (const version of versions) {
    it('Acquires the specified version of kubectl', async () => {
      await installer.install(version);

      const dir = path.join(toolDir, 'kubectl', version, os.arch());

      if (IS_WINDOWS) {
        expect(fs.existsSync(path.join(dir, 'kubectl.exe'))).toBe(true);
      } else {
        expect(fs.existsSync(path.join(dir, 'kubectl'))).toBe(true);
      }
    }, 100000);
  }
});
