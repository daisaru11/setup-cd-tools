import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { YqInstaller } from '../../src/installers/yq';

const toolDir = process.env['RUNNER_TOOL_CACHE'] as string;
const IS_WINDOWS = process.platform === 'win32';

describe('yq installer tests', () => {
  const installer = new YqInstaller();

  const versions = ['2.3.0'];

  for (const version of versions) {
    it('Acquires the specified version of yq', async () => {
      await installer.install(version);

      const dir = path.join(toolDir, 'yq', version, os.arch());

      if (IS_WINDOWS) {
        expect(fs.existsSync(path.join(dir, 'yq.exe'))).toBe(true);
      } else {
        expect(fs.existsSync(path.join(dir, 'yq'))).toBe(true);
      }
    }, 100000);
  }
});
