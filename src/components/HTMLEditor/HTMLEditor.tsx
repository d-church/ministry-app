import React, { useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { CButton, CButtonGroup, CFormTextarea } from "@coreui/react";
import { FaEye, FaCode } from "react-icons/fa6";

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
      <div className="mb-2 flex justify-end">
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
        <CFormTextarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            height,
            fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            backgroundColor: '#f8f9fa',
          }}
          className={cn(
            "html-editor html-mode",
            hasError && "border-red-500"
          )}
          rows={Math.floor(parseInt(height) / 24) || 10}
        />
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
