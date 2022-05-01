import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { HubInstaller } from '../../src/installers/hub';

const toolDir = process.env['RUNNER_TOOL_CACHE'] as string;
const IS_WINDOWS = process.platform === 'win32';

describe('hub installer tests', () => {
  const installer = new HubInstaller();

  const versions = ['2.14.2'];

  for (const version of versions) {
    it('Acquires the specified version of hub', async () => {
      await installer.install(version);

      const dir = path.join(toolDir, 'hub', version, os.arch());

      if (IS_WINDOWS) {
        expect(fs.existsSync(path.join(dir, 'hub.exe'))).toBe(true);
      } else {
        expect(fs.existsSync(path.join(dir, 'hub'))).toBe(true);
      }
    }, 100000);
  }
});
