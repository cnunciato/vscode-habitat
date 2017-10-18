import * as vscode from 'vscode';
import * as which from 'which';

const fs = require('fs');
const path = require('path');

function commandExists(command: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    which(command, (err, path) => {
      if (err) {
        reject(err);
      } else {
        resolve(path);
      }
    });
  });
}

function fileExists(...segments: string[]): boolean {
  return fs.existsSync(path.resolve(vscode.workspace.rootPath, path.join(...segments)));
}

export { commandExists, fileExists };
