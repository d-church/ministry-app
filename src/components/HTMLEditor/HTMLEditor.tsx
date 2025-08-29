import React, { useMemo } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import cn from "clsx";
import { useTranslation } from "react-i18next";

import QuillResizeImage from "quill-resize-image";
import htmlEditButton from "quill-html-edit-button";

import "react-quill-new/dist/quill.snow.css";
import "./style.scss";

Quill.register("modules/resize", QuillResizeImage);
Quill.register("modules/htmlEditButton", htmlEditButton);

const HTMLEditor: React.FC<{
  value?: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  height?: string;
}> = ({ value = "", onChange, hasError = false, height = "400px" }) => {
  const { i18n, t } = useTranslation("common");
  const modules = useMemo(() => {
    return {
      ...defaultModules,
      htmlEditButton: {
        msg: t("htmlEditor.editHtmlMessage"),
        okText: t("htmlEditor.ok"),
        cancelText: t("htmlEditor.cancel"),
        buttonHTML: "&lt;HTML/&gt;",
        buttonTitle: "HTML",
        syntax: false,
      },
    };
  }, [i18n.language]);

  return (
    <ReactQuill
      theme="snow"
      defaultValue={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      style={{
        height,
      }}
      className={cn("html-editor", hasError && "border-red-500")}
    />
  );
};

const defaultModules = {
  toolbar: [
    // Headers dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    // Font size
    [{ size: ["small", false, "large", "huge"] }],

    // Text formatting
    ["bold", "italic", "underline", "strike"],

    // Text color and background
    [{ color: [] as string[] }, { background: [] as string[] }],

    // Lists
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],

    // Text alignment
    [{ align: [] as string[] }],

    // Text direction
    [{ direction: "rtl" }],

    // Blockquote and code block
    ["blockquote", "code-block"],

    // Links, images, videos
    ["link", "image", "video"],

    // Clean formatting
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
