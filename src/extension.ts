import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "Copy All Reference Paths" activated!');

    const copyAllPathsCommand = vscode.commands.registerCommand(
        'copy-all-refs.copyAllPaths',
        async () => {
            try {
                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    vscode.window.showErrorMessage('No active editor found');
                    return;
                }

                const position = editor.selection.active;
                const document = editor.document;

                const references = await vscode.commands.executeCommand<any[]>(
                    'vscode.executeReferenceProvider',
                    document.uri,
                    position
                );

                if (!references || references.length === 0) {
                    vscode.window.showWarningMessage('No references found');
                    return;
                }

                const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '';
                
                // 🔥 ТУТ ЕДИНСТВЕННОЕ ИЗМЕНЕНИЕ - формат path:line
                const lines = references.map(ref => {
                    let filePath = ref.uri.fsPath;
                    
                    if (workspaceFolder && filePath.startsWith(workspaceFolder)) {
                        filePath = filePath.substring(workspaceFolder.length + 1);
                    }
                    
                    const lineNumber = ref.range.start.line + 1; // нумерация с 1
                    
                    return `${filePath}:${lineNumber}`;
                });

                // Убираем дубликаты
                const uniqueLines = [...new Set(lines)].sort();

                if (uniqueLines.length === 0) {
                    vscode.window.showWarningMessage('No valid paths found');
                    return;
                }

                await vscode.env.clipboard.writeText(uniqueLines.join('\n'));

                vscode.window.showInformationMessage(
                    `✅ Copied ${uniqueLines.length} references (path:line)`
                );

                console.log('Copied:', uniqueLines);

            } catch (error) {
                vscode.window.showErrorMessage(`Error: ${error}`);
                console.error('Error:', error);
            }
        }
    );

    context.subscriptions.push(copyAllPathsCommand);
}

export function deactivate() {}