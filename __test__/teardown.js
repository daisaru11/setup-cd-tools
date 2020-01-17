const io = require('@actions/io');

const toolDir = process.env['RUNNER_TOOL_CACHE'];
const tempDir = process.env['RUNNER_TEMP'];

module.exports = async () => {
  await io.rmRF(toolDir);
  await io.rmRF(tempDir);
};
