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
}> = ({ value, onChange, hasError = false, height }) => {
  const style = height ? { height } : {};
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      style={style}
      className={cn("html-editor", hasError && "border-red-500")}
    />
  );
};

const colorPalette = [
  "#000000", // black
  "#FFFFFF", // white
  "#FF0000", // red
  "#00FF00", // green
  "#0000FF", // blue
  "#FFFF00", // yellow
  "#FF00FF", // magenta
  "#00FFFF", // cyan
  "#800000", // maroon
  "#008000", // green (dark)
  "#000080", // navy
  "#808000", // olive
  "#800080", // purple
  "#008080", // teal
  "#C0C0C0", // silver
  "#808080", // gray
  "#FFA500", // orange
  "#A52A2A", // brown
  "#FFC0CB", // pink
  "#4169E1", // royal blue
];

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: colorPalette }, { background: colorPalette }],
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
