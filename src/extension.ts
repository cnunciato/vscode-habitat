import { onActivate, onDeactivate } from './activation';

export function activate(context) {
  onActivate(context);
}

export function deactivate() {
  onDeactivate();
}
