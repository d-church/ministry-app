import React, { useState, useRef, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import { uk, enUS } from "date-fns/locale";
import { FaArrowLeft, FaFloppyDisk, FaUpload, FaTrash } from "react-icons/fa6";

import "react-datepicker/dist/react-datepicker.css";

import { HOME_ROUTE } from "src/constants";
import PostStore from "../Posts/PostStore";
import HTMLEditor from "src/components/HTMLEditor";
import type { HTMLEditorEditorMode } from "src/components/HTMLEditor/types";
import type { EditorMode } from "src/services/PostService";

interface SelectedFile {
  file: File;
  previewUrl: string;
}

interface PostFormData {
  title: string;
  html: string;
  publishDate: Date | null;
}

const CreatePost: React.FC = observer(() => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("pages/create-post");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [editorMode, setEditorMode] = useState<HTMLEditorEditorMode>("VISUAL");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
  } = useForm<PostFormData>({
    defaultValues: {
      title: "",
      html: "",
      publishDate: null,
    },
  });

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setSelectedFile({ file, previewUrl });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = () => {
    if (selectedFile) {
      URL.revokeObjectURL(selectedFile.previewUrl);
    }
    setSelectedFile(null);
  };

  const handleEditorModeChange = (mode: HTMLEditorEditorMode) => {
    setEditorMode(mode);
  };

  const onSubmit = async (data: PostFormData) => {
    try {
      const backendEditorMode: EditorMode = editorMode === "CODE" ? "CODE" : "VISUAL";
      const files = selectedFile ? [selectedFile.file] : undefined;

      await PostStore.createPost({
        html: data.html,
        title: data.title,
        publishDate: data.publishDate
          ? `${data.publishDate.getFullYear()}-${String(data.publishDate.getMonth() + 1).padStart(2, "0")}-${String(data.publishDate.getDate()).padStart(2, "0")}`
          : "",
        editorMode: backendEditorMode,
        files,
      });
      navigate(`${HOME_ROUTE}/website/posts`);
    } catch (error) {
      console.error("Failed to create post:", error);
      setError("root", {
        type: "manual",
        message: t("createError"),
      });
    }
  };

  const handleBack = () => {
    navigate(`${HOME_ROUTE}/website/posts`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-2 text-[#18181B] hover:bg-[#f4f4f5] rounded-md transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">{t("createPost")}</h1>
        </div>
      </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-lg font-semibold text-gray-900">{t("newPost")}</h2>
        </div>
        <div className="p-6 pt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                const target = e.target as HTMLElement;
                if (target.closest(".monaco-editor")) return;
                e.preventDefault();
              }
            }}
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("title")} *
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder={t("titlePlaceholder")}
                  className={`h-10 w-full rounded-md border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? "border-red-500" : "border-gray-200"}`}
                  {...register("title", {
                    required: t("titleRequired"),
                    minLength: { value: 3, message: t("titleMinLength") },
                  })}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div className="flex flex-column w-1/8">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("previewImage")}
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="preview-file-input"
                />
                {!selectedFile ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 h-10 border border-[#e4e4e7] rounded-md bg-white text-sm font-medium text-[#18181B] hover:bg-[#f4f4f5] transition-colors"
                  >
                    <FaUpload className="w-4 h-4" />
                    {t("uploadPreview")}
                  </button>
                ) : (
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                    <img
                      src={selectedFile.previewUrl}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate">{selectedFile.file.name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-column w-1/8">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("publishDate")} *
                </label>
                <Controller
                  name="publishDate"
                  control={control}
                  rules={{ required: t("publishDateRequired") }}
                  render={({
                    field,
                  }: {
                    field: { value: Date | null; onChange: (date: Date | null) => void };
                  }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      dateFormat="d MMMM yyyy"
                      locale={i18n.language === "uk" ? uk : enUS}
                      className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.publishDate ? "border-red-500" : "border-gray-300"}`}
                      placeholderText={t("publishDateRequired")}
                    />
                  )}
                />
                {errors.publishDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.publishDate.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="html" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("content")} *
                </label>
                <Controller
                  name="html"
                  control={control}
                  rules={{ required: t("contentRequired") }}
                  render={({ field }) => (
                    <HTMLEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      hasError={!!errors.html}
                      initialMode={editorMode}
                      onModeChange={handleEditorModeChange}
                    />
                  )}
                />
                {errors.html && <p className="mt-1 text-sm text-red-600">{errors.html.message}</p>}
              </div>

              {errors.root && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{errors.root.message}</p>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="px-4 h-10 border border-[#e4e4e7] rounded-md bg-white text-sm font-medium text-[#18181B] hover:bg-[#f4f4f5] disabled:opacity-50 transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-4 h-10 rounded-md bg-[#18181B] text-white text-sm font-medium hover:bg-[#18181B]/90 disabled:opacity-60 transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      {t("creating")}
                    </>
                  ) : (
                    <>
                      <FaFloppyDisk className="w-4 h-4" />
                      {t("addPost")}
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default CreatePost;
