const { exec } = require('child_process');

const version = process.argv[2];

exec('kustomize version --short', (error, stdout, stderr) => {
  let ver;
  ver = stdout.split(' ')[0];
  ver = ver.replace(/^{/g, '');
  ver = ver.replace(/^Version\//g, '');
  ver = ver.replace(/^kustomize\//g, '');
  ver = ver.replace(/^v/g, '');

  if (ver !== version) {
    process.exit(1);
  }
});
