import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { JqInstaller } from '../../src/installers/jq';

const toolDir = process.env['RUNNER_TOOL_CACHE'] as string;
const IS_WINDOWS = process.platform === 'win32';

describe('jq installer tests', () => {
  const installer = new JqInstaller();

  const versions = ['1.6'];

  for (const version of versions) {
    it('Acquires the specified version of jq', async () => {
      await installer.install(version);

      const dir = path.join(toolDir, 'jq', version, os.arch());

      if (IS_WINDOWS) {
        expect(fs.existsSync(path.join(dir, 'jq.exe'))).toBe(true);
      } else {
        expect(fs.existsSync(path.join(dir, 'jq'))).toBe(true);
      }
    }, 100000);
  }
});
