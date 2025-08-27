import React from "react";
import ReactQuill from "react-quill-new";

import "react-quill-new/dist/quill.snow.css";

const HTMLEditor: React.FC<{
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasError?: boolean;
  height?: string;
}> = ({ value = "", onChange, placeholder, hasError = false, height = "300px" }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
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
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "blockquote",
  "code-block",
  "link",
  "image",
  "video",
];

export default HTMLEditor;
