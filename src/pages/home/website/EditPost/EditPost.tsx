import React, { useEffect, useState, useRef, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import { uk, enUS } from "date-fns/locale";
import { FaArrowLeft, FaFloppyDisk, FaUpload, FaTrash } from "react-icons/fa6";

import "react-datepicker/dist/react-datepicker.css";

import { HOME_ROUTE } from "src/constants";
import PostStore from "../Posts/PostStore";
import PostService, { type Post } from "src/services/PostService";
import HTMLEditor from "src/components/HTMLEditor";

interface PostFormData {
  title: string;
  html: string;
  createdAt?: Date;
}

const EditPost: React.FC = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation("pages/edit-post");

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<{ file: File; previewUrl: string } | null>(null);
  const [existingFileRemoved, setExistingFileRemoved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
    reset,
  } = useForm<PostFormData>();

  useEffect(() => {
    if (!id) {
      navigate(`${HOME_ROUTE}/website/posts`);
      return;
    }

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const fetchedPost = await PostService.get(id);
        setPost(fetchedPost);

        reset({
          title: fetchedPost.title,
          html: fetchedPost.html,
          createdAt: fetchedPost.createdAt
            ? (() => {
                const date = new Date(fetchedPost.createdAt);
                date.setHours(0, 0, 0, 0);
                return date;
              })()
            : undefined,
        });
      } catch (error) {
        console.error("Failed to load post:", error);
        navigate(`${HOME_ROUTE}/website/posts`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate, reset]);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setSelectedFile({ file, previewUrl });
    setExistingFileRemoved(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = () => {
    if (selectedFile) {
      URL.revokeObjectURL(selectedFile.previewUrl);
      setSelectedFile(null);
    } else {
      setExistingFileRemoved(true);
    }
  };

  const onSubmit = async (data: PostFormData) => {
    if (!id) return;

    try {
      const publishDate = data.createdAt
        ? `${data.createdAt.getFullYear()}-${String(data.createdAt.getMonth() + 1).padStart(2, "0")}-${String(data.createdAt.getDate()).padStart(2, "0")}`
        : undefined;

      await PostStore.updatePost(id, {
        title: data.title,
        html: data.html,
        publishDate,
        files: selectedFile ? [selectedFile.file] : undefined,
      });
      navigate(`${HOME_ROUTE}/website/posts`);
    } catch (error) {
      console.error("Failed to update post:", error);
      setError("root", {
        type: "manual",
        message: t("updateError"),
      });
    }
  };

  const handleBack = () => {
    navigate(`${HOME_ROUTE}/website/posts`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-t-transparent text-blue-500"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500">{t("postNotFound")}</p>
          <button
            onClick={() => navigate(`${HOME_ROUTE}/website/posts`)}
            className="mt-4 px-4 h-10 rounded-md bg-[#18181B] text-white text-sm font-medium hover:bg-[#18181B]/90 transition-colors"
          >
            {t("backToPosts")}
          </button>
        </div>
      </div>
    );
  }

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
          <h1 className="text-xl font-semibold text-gray-900">{t("editPost")}</h1>
        </div>
      </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-lg font-semibold text-gray-900">{t("editPost")}</h2>
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
                  id="edit-preview-file-input"
                />
                {selectedFile ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-md border border-gray-200">
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
                    <img
                      src={selectedFile.previewUrl}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                ) : post?.files?.[0] && !existingFileRemoved ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 truncate mb-0">{post.files[0].path}</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                    <img
                      src={post.files[0].url}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 h-10 border border-[#e4e4e7] rounded-md bg-white text-sm font-medium text-[#18181B] hover:bg-[#f4f4f5] transition-colors"
                  >
                    <FaUpload className="w-4 h-4" />
                    {t("uploadPreview")}
                  </button>
                )}
              </div>

              <div className="flex flex-column w-1/8">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("publicationDate")}
                </label>
                <Controller
                  name="createdAt"
                  control={control}
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
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholderText={t("publicationDatePlaceholder")}
                    />
                  )}
                />
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
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.html}
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
                      {t("updating")}
                    </>
                  ) : (
                    <>
                      <FaFloppyDisk className="w-4 h-4" />
                      {t("updatePost")}
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

export default EditPost;
