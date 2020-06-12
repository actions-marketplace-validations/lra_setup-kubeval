const core = require('@actions/core');
const exec = require('@actions/exec');

const options = {};
options.cwd = '/tmp/';

const version = core.getInput('version');

async function main() {
  try {
    await exec.exec('curl', [
      '-L',
      '-O',
      `https://github.com/instrumenta/kubeval/releases/download/${version}/kubeval-linux-amd64.tar.gz`
    ], options);
    await exec.exec('tar', ['zxvf', 'kubeval-linux-amd64.tar.gz'], options);
    await exec.exec('sudo', ['cp', 'kubeval', '/usr/local/bin'], options);
    await exec.exec('rm', ['kubeval', 'kubeval-linux-amd64.tar.gz'], options);
  } catch (error) {
    core.setFailed(error.message)
  }
}

main();
