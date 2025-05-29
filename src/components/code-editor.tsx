import { Editor, Monaco } from "@monaco-editor/react";

type CodeEditorProps = {
  code: string | undefined;
  onChange: (value: string | undefined) => void;
};
function CodeEditor({ code, onChange }: CodeEditorProps) {
  function handleEditorWillMount(monaco: Monaco) {
    // Register the Prophet language once
    monaco.languages.register({ id: "prophet" });

    // Define the Monarch tokenizer and language configuration
    monaco.languages.setMonarchTokensProvider("prophet", {
      // List of Prophet keywords (common control flow and reserved words)
      keywords: [
        "If",
        "Then",
        "Else",
        "ElseIf",
        "EndIf",
        "For",
        "Next",
        "Do",
        "While",
        "Loop",
        "Select",
        "Case",
        "EndSelect",
        "Function",
        "EndFunction",
        "Dim",
        "Set",
        "Let",
        "True",
        "False",
        "Nothing",
        "Exit",
        "Return",
      ],

      // Operators and symbols
      operators: [
        "=",
        "<>",
        "<",
        "<=",
        ">",
        ">=",
        "+",
        "-",
        "*",
        "/",
        "^",
        "And",
        "Or",
        "Not",
      ],

      // Symbols for delimiters
      symbols: /[=><!~?:&|+\-*/^%]+/,

      // Escape sequences in strings
      escapes: /\\(?:[abfnrtv\\"'])/,

      // The main tokenizer for our languages
      tokenizer: {
        root: [
          // identifiers and keywords
          [
            /[a-zA-Z_][\w]*/,
            {
              cases: {
                "@keywords": "keyword",
                "@default": "identifier",
              },
            },
          ],

          // whitespace
          { include: "@whitespace" },

          // numbers: integer and float
          [/\d*\.\d+([eE][-+]?\d+)?/, "number.float"],
          [/\d+/, "number"],

          // strings
          [/"([^"\\]|\\.)*$/, "string.invalid"], // non-terminated string
          [/"([^"\\]|\\.)*"/, "string"],

          // operators
          [
            /@symbols/,
            {
              cases: {
                "@operators": "operator",
                "@default": "",
              },
            },
          ],

          // delimiters and punctuation
          [/[{}()[]]/, "@brackets"],
          [/[;,.]/, "delimiter"],

          // comments: single line starting with //
          [/\/\/.*$/, "comment"],

          // comments: single line starting with #
          [/#.*$/, "comment"],
        ],

        whitespace: [[/[ \t\r\n]+/, "white"]],
      },
    });

    // Language configuration for brackets, auto-closing pairs, etc.
    monaco.languages.setLanguageConfiguration("prophet", {
      comments: {
        lineComment: "#",
      },
      brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
      ],
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"', notIn: ["string"] },
      ],
      surroundingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
      ],
      folding: {
        markers: {
          start: new RegExp("^\\s*#region\\b"),
          end: new RegExp("^\\s*#endregion\\b"),
        },
      },
    });

    // Define a theme to color tokens
    monaco.editor.defineTheme("prophetTheme", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "0000FF", fontStyle: "bold" },
        { token: "identifier", foreground: "000000" },
        { token: "number", foreground: "098658" },
        { token: "number.float", foreground: "098658" },
        { token: "string", foreground: "A31515" },
        { token: "operator", foreground: "000000" },
        { token: "delimiter", foreground: "000000" },
        { token: "comment", foreground: "008000", fontStyle: "italic" },
        { token: "white", foreground: "000000" },
      ],
      colors: {
        "editor.foreground": "#000000",
        "editor.background": "#FFFFFF",
        "editorCursor.foreground": "#000000",
        "editor.lineHighlightBackground": "#F0F0F0",
        "editorLineNumber.foreground": "#BBBBBB",
        "editor.selectionBackground": "#ADD6FF",
        "editor.inactiveSelectionBackground": "#E5EBF1",
      },
    });
  }
  return (
    <div className="bg-gray-200 p-4">
      <Editor
        height="50vh"
        width="500"
        defaultLanguage="prophet"
        // defaultValue={`If A = 0121 Then\n  // your code here\nEnd If`}
        defaultValue={`If A = 0121 Then\n  # your code here\nEnd If`}
        beforeMount={handleEditorWillMount}
        theme="prophetTheme"
      />
    </div>
  );
}

export default CodeEditor;
