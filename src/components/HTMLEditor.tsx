import React from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import QuillResizeImage from "quill-resize-image";

Quill.register("modules/resize", QuillResizeImage);

const HTMLEditor: React.FC<{
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasError?: boolean;
  height?: string;
}> = ({ value = "", onChange, placeholder, hasError = false, height = "400px" }) => {
  return (
    <ReactQuill
      theme="snow"
      defaultValue={value}
      onChange={onChange}
      placeholder={placeholder}
      modules={modules}
      formats={formats}
      style={{
        height,
        marginBottom: "50px",
      }}
      className={hasError ? "border-red-500" : ""}
    />
  );
};

const modules = {
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
