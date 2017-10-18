
import * as request from 'request';
import { fileExists, info, open, prompt, quickPick, run, status } from './';
import { term } from '../term';

function planBuild() {
  term.send('build');
}

function planInit(scaffold: string = undefined) {
  let command = 'hab plan init';

  if (scaffold) {
    command += ` -s ${scaffold}`;
  }

  term.send(command);

  const i = setInterval(() => {
    const path = ['habitat', 'plan.sh'];

    if (fileExists(...path)) {
      clearInterval(i);
      open(...path);
    }
  }, 500);
}

function planScaffold() {
  quickPick(['Node.js', 'Ruby'])
    .then(choice => {
      if (choice.trim() !== '') {
        let option;

        if (choice === 'Node.js') {
          option = 'node';
        } else if (choice === 'Ruby') {
          option = 'ruby';
        }

        planInit(option);
      }
    });
}

function studioEnter() {
  prompt('Which Habitat origin? ', process.env.HAB_ORIGIN || 'myorigin')
    .then(origin => {
      if (origin.trim() !== '') {
        term.send(`export HAB_ORIGIN=${origin}`);
        term.send('hab studio enter');
      }
    });
}

function install(version: string = '_latest'): Promise<any> {
  const url = `https://api.bintray.com/packages/habitat/stable/${packageForPlatform()}/versions/${version}`;

  return new Promise((resolve, reject) => {
    request({ url: url, method: 'GET', json: true }, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        const version = body.name;
        status(`Installing the latest stable version of Habitat (${version})...`);

        run('curl https://raw.githubusercontent.com/habitat-sh/habitat/master/components/hab/install.sh | bash')
          .then(code => {
            status(`Done. You are now running Habitat ${version}.`);
            term.send("hab --version");
            resolve();
          })
          .catch(code => {
            const message = `Failed to install Habitat. The exit code was ${code}.`;
            status(message);
            reject(new Error(message));
          });
      }
    });
  });
}

function packageForPlatform() {
  return {
      darwin: 'hab-x86_64-darwin',
      freebsd: 'hab-x86_64-linux',
      linux: 'hab-x86_64-linux',
      win32: 'hab-x86_64-windows'
  }[process.platform];
}

export { install, planBuild, planInit, planScaffold, studioEnter };
