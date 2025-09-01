import React from "react";
import ReactQuill, { Quill } from "react-quill-new";
import cn from "clsx";

import QuillResizeImage from "quill-resize-image";

import "react-quill-new/dist/quill.snow.css";

Quill.register("modules/resize", QuillResizeImage);

const VisualEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  height?: string;
}> = ({ value, onChange, hasError = false, height = "400px" }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      style={{ height }}
      className={cn("html-editor", hasError && "border-red-500")}
    />
  );
};

const modules = {
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

export default VisualEditor;
