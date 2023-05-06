const vscode = require('vscode');

const global = vscode.window;

/**
 * 提示信息
 * 
 * @usage message.success(msg)
 * @usage message.error(msg)
 * @usage message.warning(msg)
 */
const message = (() => {
  const msgMap = {
    success: 'showInformationMessage',
    info: 'showInformationMessage',
    error: 'showErrorMessage',
    warning: 'showWarningMessage'
  };
  let msg = Object.create(null);
  for (const key in msgMap) {
    msg[key] = (...args) => global[msgMap[key]](...args);
  }
  return msg;
})();

/**
 * 状态栏提示信息
 * 
 * @param {string} txt 状态栏信息
 * @returns A disposable which hides the status bar message.
 */
const barMessage = (txt) => {
  return global.setStatusBarMessage(txt, 1000);
}

/**
 * 确认框
 * 
 * @param {string} txt 确认框信息
 * @returns A promise that resolves to the confirm result. 
 */
const confirm = (txt) => {
  let msgs = ["是", "否"];
  let resMap = {
    '是': 'ok',
    '否': 'cancel',
    '不再提示': 'noHints'
  };
  msgs.unshift(txt);
  return new Promise((resolve, reject) => {
    message.info(...msgs).then(res => {
      resolve(resMap[res]);
    })
    .catch(reject);
  })
}

/**
 * 快速选择
 * 
 * @param {array} options 快速选择列表
 * @returns A promise that resolves to the selection.
 */
const quickPick = (options) => {
  return new Promise((resolve, reject) => {
    global.showQuickPick(options).then(res => {
      resolve(res);
    })
    .catch(reject);
  })
}

/**
 * 获取 编辑器在窗口中的位置
 * 
 * @returns vscode视图中的第几栏
 */
 const getViewColumn = () => {
  const activeEditor = global.activeTextEditor;
  if (!activeEditor) {
    return vscode.ViewColumn.One;
  }
  switch (activeEditor.viewColumn) {
    case vscode.ViewColumn.One:
      return vscode.ViewColumn.Two;
  }
  return activeEditor.viewColumn;
}


module.exports = {
  message,
  barMessage,
  confirm,
  quickPick,
  getViewColumn
};