import * as vscode from 'vscode';
import { prereqs } from './prereqs';
import { install, navigate, planBuild, planInit, planScaffold, search, studioEnter } from './commands/index';

function onActivate(context: vscode.ExtensionContext) {
  registerCommmand(context, 'extension.habBuild', withPrereqs(planBuild));
  registerCommmand(context, 'extension.habPlanInit', withPrereqs(planInit));
  registerCommmand(context, 'extension.habPlanScaffold', withPrereqs(planScaffold));
  registerCommmand(context, 'extension.habStudioEnter', withPrereqs(studioEnter));
  registerCommmand(context, 'extension.habBuilder', () => navigate('https://bldr.habitat.sh/#/pkgs'));
  registerCommmand(context, 'extension.habDocs', () => navigate('https://www.habitat.sh/docs'));
  registerCommmand(context, 'extension.habInstall', install);
  registerCommmand(context, 'extension.habSearch', search);

  function registerCommmand(context, name, handler) {
    context.subscriptions.push(
      vscode.commands.registerCommand(name, handler)
    );
  }

  function withPrereqs(next) {
    return () => {
      prereqs.verify()
        .then(() => next())
        .catch(() => {});
    };
  }
}

function onDeactivate() {
  console.log('Hasta la vista, extension.');
}

export { onActivate, onDeactivate };
