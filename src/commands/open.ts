import * as vscode from 'vscode';
import { Uri } from 'vscode';

const openurl = require('openurl');
const path = require('path');

function open(...p) {
  vscode.workspace.openTextDocument(Uri.file(path.resolve(vscode.workspace.rootPath, ...p)))
    .then(doc => {
      vscode.window.showTextDocument(doc);
    });
}

function navigate(url: string) {
  openurl.open(url);
}

export { open, navigate };
