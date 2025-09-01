import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
import { FaArrowLeft, FaFloppyDisk } from "react-icons/fa6";

import { HOME_ROUTE } from "src/constants";
import PostStore from "../Posts/PostStore";
import PostService, { type Post } from "src/services/PostService";
import HTMLEditor from "src/components/HTMLEditor";

interface PostFormData {
  title: string;
  html: string;
}

const EditPost: React.FC = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("pages/edit-post");

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const onSubmit = async (data: PostFormData) => {
    if (!id) return;

    try {
      await PostStore.updatePost(id, data);
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
      <div className="px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-center h-64">
          <CSpinner size="sm" className="w-8 h-8" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-500">{t("postNotFound")}</p>
            <CButton
              color="primary"
              onClick={() => navigate(`${HOME_ROUTE}/website/posts`)}
              className="mt-4"
            >
              {t("backToPosts")}
            </CButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4 lg:px-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CButton
              color="ghost"
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-900"
            >
              <FaArrowLeft className="w-4 h-4" />
            </CButton>
            <h1 className="text-2xl font-semibold text-gray-900">{t("editPost")}</h1>
          </div>
        </div>
      </div>

      <CCard className="shadow-lg border-0">
        <CCardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">{t("editPost")}</h3>
          </div>
        </CCardHeader>
        <CCardBody className="p-6">
          <CForm
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                const target = e.target as HTMLElement;
                // Don't prevent Enter in Monaco Editor (HTML/CSS modes)
                if (target.closest('.monaco-editor')) {
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
                        value={field.value}
                        onChange={field.onChange}
                        hasError={!!errors.html}
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
                      <span>{t("updating")}</span>
                    </>
                  ) : (
                    <>
                      <FaFloppyDisk className="inline w-4 h-4 mr-2" />
                      <span>{t("updatePost")}</span>
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

export default EditPost;
