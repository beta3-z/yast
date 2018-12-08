import * as CodeMirror from 'codemirror';
import 'codemirrorJavaScriptMode';

export function start(): void
{
    const root = <HTMLDivElement> document.getElementById('root');
    const code = <HTMLTextAreaElement> document.getElementById('code');

    const editor = CodeMirror.fromTextArea(code, {
        mode: "javascript",
        lineNumbers: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    });
}