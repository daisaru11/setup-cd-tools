const io = require('@actions/io');
const path = require('path');

module.exports = async () => {
  const toolDir = path.join(__dirname, 'runner', 'tools');
  const tempDir = path.join(__dirname, 'runner', 'temp');

  process.env['RUNNER_TOOL_CACHE'] = toolDir;
  process.env['RUNNER_TEMP'] = tempDir;

  await io.rmRF(toolDir);
  await io.rmRF(tempDir);
};
