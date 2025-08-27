import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { uk } from "date-fns/locale/uk";
import { useTranslation as useI18n } from "react-i18next";
import "react-quill-new/dist/quill.snow.css";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CSpinner,
  CBadge,
} from "@coreui/react";
import { FaArrowLeft, FaPen, FaTrash } from "react-icons/fa6";

import { HOME_ROUTE } from "src/constants";
import PostService, { type Post } from "src/services/PostService";
import PostStore from "../Posts/PostStore";
import UserAvatar from "src/components/common/UserAvatar";

const ViewPost: React.FC = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("pages/view-post");
  const { i18n } = useI18n();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      } catch (error) {
        console.error("Failed to load post:", error);
        navigate(`${HOME_ROUTE}/website/posts`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const formatDate = (dateString: string) => {
    const locale = i18n.language === 'uk' ? uk : undefined;
    return format(dateString, "d MMM yyyy, HH:mm", { locale });
  };

  const handleBack = () => {
    navigate(`${HOME_ROUTE}/website/posts`);
  };

  const handleEdit = () => {
    if (id) {
      navigate(`${HOME_ROUTE}/website/posts/${id}/edit`);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    if (window.confirm(t("confirmDelete"))) {
      try {
        await PostStore.deletePost(id);
        navigate(`${HOME_ROUTE}/website/posts`);
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
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
              onClick={handleBack}
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
              <FaArrowLeft className="inline w-4 h-4" />
            </CButton>
            <h1 className="text-2xl font-semibold text-gray-900">{t("viewPost")}</h1>
          </div>
          <div className="flex items-center gap-2">
            <CButton
              color="primary"
              variant="outline"
              onClick={handleEdit}
              className="flex items-center gap-2"
            >
              <FaPen className="inline w-4 h-4" />
              {t("editPost")}
            </CButton>
            <CButton
              color="danger"
              variant="outline"
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <FaTrash className="inline w-4 h-4" />
              {t("deletePost")}
            </CButton>
          </div>
        </div>
      </div>

                  <CCard className="shadow-lg border-0">
        <CCardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
            <CBadge color="success" className="text-xs">
              {t("status.published")}
            </CBadge>
          </div>
        </CCardHeader>
        <CCardBody className="p-6">
          {/* Автор та дата */}
          <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <UserAvatar user={post.author} size="md" />
              <div>
                <div className="font-medium text-gray-900">
                  {post.author.first_name} {post.author.last_name}
                </div>
                <div className="text-sm text-gray-500">{post.author.role}</div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {formatDate(post.createdAt)}
            </div>
          </div>

          {/* Контент */}
          <div className="ql-editor ql-snow">
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>

          {/* Статистика */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>{t("stats.likes")}: {post.likesCount}</span>
              <span>{t("stats.comments")}: {post.commentsCount}</span>
              <span>
                {t("stats.lastUpdated")}: {formatDate(post.updatedAt)}
              </span>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
});

export default ViewPost;
