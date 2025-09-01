import React from "react";
import Editor from "@monaco-editor/react";
import type { EditorProps } from "@monaco-editor/react";
import cn from "clsx";

const CodeEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  height?: string;
  theme?: 'light' | 'dark';
}> = ({
  value,
  onChange,
  hasError = false,
  height = "400px",
  theme = 'dark'
}) => {
  return (
    <div className={cn(hasError && "border border-red-500 rounded")}>
      <Editor
        height={height}
        language="html"
        theme={theme === 'dark' ? 'vs-dark' : 'vs'}
        value={value}
        onChange={(val) => onChange(val || '')}
        options={options}
      />
    </div>
  );
};

const options: EditorProps['options'] = {
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  fontSize: 14,
  lineNumbers: 'on',
  wordWrap: 'on',
  automaticLayout: true,
  formatOnPaste: true,
  formatOnType: true,
  tabSize: 2,
  insertSpaces: true,
  acceptSuggestionOnEnter: 'off',
  quickSuggestions: {
    other: true,
    comments: true,
    strings: true
  },
  renderLineHighlight: 'line',
  multiCursorModifier: 'ctrlCmd',
  selectionHighlight: false,
  suggest: {
    showKeywords: true,
    showSnippets: true,
    showColors: true,
    showFiles: true,
    showReferences: true,
    showFolders: true,
    showTypeParameters: true,
    showIssues: true,
    showUsers: true,
    showValues: true,
    showMethods: true,
    showFunctions: true,
    showConstructors: true,
    showFields: true,
    showVariables: true,
    showClasses: true,
    showStructs: true,
    showInterfaces: true,
    showModules: true,
    showProperties: true,
    showEvents: true,
    showOperators: true,
    showUnits: true,
    showConstants: true,
    showEnums: true,
    showEnumMembers: true,
  },
}

export default CodeEditor;
