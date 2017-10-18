import * as vscode from 'vscode';

function info(message) {
  vscode.window.showInformationMessage(message);
}

function prompt(message, placeholder?): Thenable<string> {
  return vscode.window.showInputBox({ prompt: message, value: placeholder });
}

function quickPick(items: string[]):Thenable<string> {
  return vscode.window.showQuickPick(items);
}

function status(message) {
  vscode.window.setStatusBarMessage(message);
}

function warn(message, ...opts): Thenable<string> {
  return vscode.window.showWarningMessage(message, ...opts);
}

export { info, prompt, quickPick, status, warn };
