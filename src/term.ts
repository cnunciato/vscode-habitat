import * as vscode from 'vscode';

class Term {
  private term: vscode.Terminal;

  constructor() {
    this.term = vscode.window.createTerminal('habitat');
  }

  send(command: string, show: boolean = true) {
    if (show) {
      this.term.show();
    }

    this.term.sendText(command);
  }
}

const term = new Term();
export { term };
