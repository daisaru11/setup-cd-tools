import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { SkaffoldInstaller } from '../../src/installers/skaffold';

const toolDir = process.env['RUNNER_TOOL_CACHE'] as string;
const IS_WINDOWS = process.platform === 'win32';

describe('skaffold installer tests', () => {
  const installer = new SkaffoldInstaller();

  const versions = ['1.2.0'];

  for (const version of versions) {
    it('Acquires the specified version of skaffold', async () => {
      await installer.install(version);

      const dir = path.join(toolDir, 'skaffold', version, os.arch());

      if (IS_WINDOWS) {
        expect(fs.existsSync(path.join(dir, 'skaffold.exe'))).toBe(true);
      } else {
        expect(fs.existsSync(path.join(dir, 'skaffold'))).toBe(true);
      }
    }, 100000);
  }
});
