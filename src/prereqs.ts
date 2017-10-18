import { commandExists, install, warn, navigate } from './commands/index';

class Prerequisites {

  verify(): Promise<any[]> {
    return Promise.all([ this.habInstalled(), this.dockerInstalled() ]);
  }

  private habInstalled(): Promise<any> {
    return new Promise((resolve, reject) => {
      commandExists('hab')
        .then(() => resolve())
        .catch(err => {
          warn('The Habitat CLI is not installed. Would you like to install the latest stable version?', 'Yes', 'No')
            .then(choice => {
              if (choice === 'Yes') {
                install()
                  .then(() => resolve())
                  .catch((err) => reject(err));
              }
            });
      });
    });
  }

  private dockerInstalled(): Promise<any> {
    return new Promise((resolve, reject) => {

      if (['win32', 'darwin'].indexOf(process.platform) !== -1) {
        commandExists('docker')
          .then(() => resolve())
          .catch(err => {
            warn('Habitat Studio requires Docker on non-Linux platforms. Would you like to install it?', 'Yes', 'No')
              .then(choice => {
                if (choice === 'Yes') {
                  navigate('https://www.docker.com/community-edition')
                }
              });
        });
      } else {
        resolve();
      }
    });
  }
}

const prereqs = new Prerequisites();
export { prereqs };
