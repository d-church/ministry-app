import React, { useMemo, useState, Suspense } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import Editor from "@monaco-editor/react";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { CButton, CButtonGroup, CSpinner } from "@coreui/react";
import { FaEye, FaCode, FaSun, FaMoon } from "react-icons/fa6";

import QuillResizeImage from "quill-resize-image";

import "react-quill-new/dist/quill.snow.css";
import "./style.scss";

Quill.register("modules/resize", QuillResizeImage);

const HTMLEditor: React.FC<{
  value?: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  height?: string;
}> = ({ value = "", onChange, hasError = false, height = "400px" }) => {
  const { t } = useTranslation("common");
  const [mode, setMode] = useState<'visual' | 'html'>('visual');
  const [editorTheme, setEditorTheme] = useState<'light' | 'dark'>('dark');
  const visualModules = useMemo(() => {
    return {
      ...defaultModules,
      resize: {
        locale: {},
      },
    };
  }, []);

  return (
    <div>
      <div className="mb-2 flex justify-between items-center">
        <div className="flex gap-2">
          {mode === 'html' && (
            <CButtonGroup size="sm">
              <CButton
                color={editorTheme === 'light' ? 'primary' : 'secondary'}
                variant={editorTheme === 'light' ? undefined : 'outline'}
                onClick={() => setEditorTheme('light')}
                className="flex items-center gap-1"
              >
                <FaSun className="inline w-3 h-3" />
                Light
              </CButton>
              <CButton
                color={editorTheme === 'dark' ? 'primary' : 'secondary'}
                variant={editorTheme === 'dark' ? undefined : 'outline'}
                onClick={() => setEditorTheme('dark')}
                className="flex items-center gap-1"
              >
                <FaMoon className="inline w-3 h-3" />
                Dark
              </CButton>
            </CButtonGroup>
          )}
        </div>
        <CButtonGroup size="sm">
          <CButton
            color={mode === 'visual' ? 'primary' : 'secondary'}
            variant={mode === 'visual' ? undefined : 'outline'}
            onClick={() => setMode('visual')}
            className="flex items-center gap-1"
          >
            <FaEye className="inline w-3 h-3" />
            {t("htmlEditor.visualMode")}
          </CButton>
          <CButton
            color={mode === 'html' ? 'primary' : 'secondary'}
            variant={mode === 'html' ? undefined : 'outline'}
            onClick={() => setMode('html')}
            className="flex items-center gap-1"
          >
            <FaCode className="inline w-3 h-3" />
            {t("htmlEditor.htmlMode")}
          </CButton>
        </CButtonGroup>
      </div>
      {mode === 'visual' ? (
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={visualModules}
          formats={formats}
          style={{ height }}
          className={cn("html-editor", hasError && "border-red-500")}
        />
      ) : (
        <div className={cn(hasError && "border border-red-500 rounded")}>
          <Editor
            height={height}
            language="html"
            theme={editorTheme === 'dark' ? 'vs-dark' : 'vs'}
            value={value}
            onChange={(val) => onChange(val || '')}
            options={{
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
              occurrencesHighlight: false,
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
            }}
          />
        </div>
      )}
    </div>
  );
};

const defaultModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] as string[] }, { background: [] as string[] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] as string[] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
  resize: {
    locale: {},
  },
};

const formats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "align",
  "direction",
  "blockquote",
  "code-block",
  "link",
  "image",
  "video",
];

export default HTMLEditor;
