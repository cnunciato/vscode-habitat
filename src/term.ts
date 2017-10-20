import * as vscode from 'vscode';

class Term {
  private term: vscode.Terminal;
  private name: string = 'habitat';
  private pid: number;

  constructor() {
    this.getTerm();

    vscode.window.onDidCloseTerminal((t) => {
      if (t.name === this.name) {
        this.getTerm();
      }
    })
  }

  send(command: string, show: boolean = true) {
    if (show) {
      this.term.show();
    }

    this.term.sendText(command);
  }

  private getTerm() {
    const term = vscode.window.createTerminal(this.name);
    term.processId.then(id => this.pid = id);
    this.term = term;
  }
}

const term = new Term();
export { term };
