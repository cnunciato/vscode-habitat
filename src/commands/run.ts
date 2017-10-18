const { exec } = require('child_process');

function run(command: string): Promise<number> {

  return new Promise((resolve, reject) => {
    const child = exec(command);

    child.on('error', (err) => {
      reject(err);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  })
}

export { run };
