import React, { useState, useRef, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import { uk, enUS } from "date-fns/locale";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CSpinner,
} from "@coreui/react";
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
    <div className="px-2 sm:px-4 lg:px-6">
      <div className="sm:flex sm:items-center mb-4">
        <div className="sm:flex-auto">
          <div className="flex items-center space-x-3">
            <CButton
              color="ghost"
              size="sm"
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-900"
            >
              <FaArrowLeft className="w-4 h-4" />
            </CButton>
            <h1 className="text-2xl font-semibold text-gray-900">{t("createPost")}</h1>
          </div>
        </div>
      </div>

      <CCard className="shadow-lg border-0">
        <CCardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">{t("newPost")}</h3>
          </div>
        </CCardHeader>
        <CCardBody className="p-6">
          <CForm
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                const target = e.target as HTMLElement;
                if (target.closest(".monaco-editor")) {
                  return;
                }
                e.preventDefault();
              }
            }}
          >
            <div className="space-y-6">
              <div>
                <CFormLabel htmlFor="title" className="text-sm font-medium text-gray-700">
                  {t("title")} *
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="title"
                  {...register("title", {
                    required: t("titleRequired"),
                    minLength: {
                      value: 3,
                      message: t("titleMinLength"),
                    },
                  })}
                  className={`mt-1 ${errors.title ? "border-red-500" : ""}`}
                  placeholder={t("titlePlaceholder")}
                />
                {errors.title && (
                  <div className="mt-1 text-sm text-red-600">{errors.title.message}</div>
                )}
              </div>

              <div>
                <CFormLabel htmlFor="publishDate" className="text-sm font-medium text-gray-700">
                  {t("publishDate")} *
                </CFormLabel>
                <CFormInput
                  type="date"
                  id="publishDate"
                  {...register("publishDate", {
                    required: t("publishDateRequired"),
                  })}
                  className={`mt-1 ${errors.publishDate ? "border-red-500" : ""}`}
                />
                {errors.publishDate && (
                  <div className="mt-1 text-sm text-red-600">{errors.publishDate.message}</div>
                )}
              </div>

              <div>
                <CFormLabel className="text-sm font-medium text-gray-700">
                  {t("previewImage")}
                </CFormLabel>
                <div className="mt-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="preview-file-input"
                  />
                  {!selectedFile ? (
                    <CButton
                      color="secondary"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <FaUpload className="inline w-6 h-6 pr-2" />
                      <span>{t("uploadPreview")}</span>
                    </CButton>
                  ) : (
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-md border">
                      <img
                        src={selectedFile.previewUrl}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 truncate">{selectedFile.file.name}</p>
                      </div>
                      <CButton
                        color="danger"
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveFile}
                        className="flex items-center"
                      >
                        <FaTrash className="w-4 h-4" />
                      </CButton>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <CFormLabel className="text-sm font-medium text-gray-700">
                  {t("publishDate")} *
                </CFormLabel>
                <div className="mt-1">
                  <Controller
                    name="publishDate"
                    control={control}
                    rules={{
                      required: t("publishDateRequired"),
                    }}
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
                    <div className="mt-1 text-sm text-red-600">{errors.publishDate.message}</div>
                  )}
                </div>
              </div>

              <div>
                <CFormLabel htmlFor="html" className="text-sm font-medium text-gray-700">
                  {t("content")} *
                </CFormLabel>
                <div className="mt-1">
                  <Controller
                    name="html"
                    control={control}
                    rules={{
                      required: t("contentRequired"),
                    }}
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
                </div>
                {errors.html && (
                  <div className="mt-1 text-sm text-red-600">{errors.html.message}</div>
                )}
              </div>

              {errors.root && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <div className="text-sm text-red-600">{errors.root.message}</div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4">
                <CButton
                  color="secondary"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  {t("cancel")}
                </CButton>
                <CButton
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <CSpinner size="sm" className="inline w-4 h-4 mr-2" />
                      <span>{t("creating")}</span>
                    </>
                  ) : (
                    <>
                      <FaFloppyDisk className="inline w-4 h-4 mr-2" />
                      <span>{t("addPost")}</span>
                    </>
                  )}
                </CButton>
              </div>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
});

export default CreatePost;
