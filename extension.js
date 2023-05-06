// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')
const { message } = require('./tool')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let remInfo = vscode.workspace.getConfiguration('rem')
	vscode.workspace.getConfiguration()
	console.log('比例：', remInfo.ratio)
	const remMap = {
		add: {
			reg: /(:?\s*[^\(\d-])(-?\d+px)/g,
			rep: '$1rem($2)',
			tip: '已添加rem'
		},
		del: {
			reg: /rem\((-?\d+px)\)/g,
			rep: '$1',
			tip: '已删除rem'
		}
	}
	const fn = (mode) => {
		const editor = vscode.window.activeTextEditor
		if(!editor) return message.warning('未选中')
		const document = editor.document
		let txt = document.getText(editor.selection)
		txt = txt.replace(remMap[mode].reg, remMap[mode].rep)
		editor.edit((edit) => {
			edit.replace(editor.selection, txt)
		})
		message.success(remMap[mode].tip)
	}
	const addRem = vscode.commands.registerCommand('add-rem.addRem', () => {
		fn('add')
	})
	const delRem = vscode.commands.registerCommand('add-rem.delRem', () => {
		fn('del')
	})
	context.subscriptions.push(addRem, delRem)
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
