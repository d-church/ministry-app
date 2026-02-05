import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { uk } from "date-fns/locale/uk";
import "react-quill-new/dist/quill.snow.css";
import { FaArrowLeft, FaPen, FaTrash } from "react-icons/fa6";

import { HOME_ROUTE } from "src/constants";
import PostService, { type Post } from "src/services/PostService";
import PostStore from "../Posts/PostStore";
import UserAvatar from "src/components/common/UserAvatar";

const ViewPost: React.FC = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation("pages/view-post");

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
    const locale = i18n.language === "uk" ? uk : undefined;
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
            onClick={handleBack}
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
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-2 text-[#18181B] hover:bg-[#f4f4f5] rounded-md transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">{t("viewPost")}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-2 px-3 h-9 border border-[#e4e4e7] rounded-md bg-white text-sm font-medium text-[#18181B] hover:bg-[#f4f4f5] transition-colors"
          >
            <FaPen className="w-4 h-4" />
            {t("editPost")}
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-3 h-9 border border-red-200 rounded-md bg-white text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <FaTrash className="w-4 h-4" />
            {t("deletePost")}
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-lg border bg-white shadow-sm">
        {/* Card header: title + badge */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border-green-200">
            {t("status.published")}
          </span>
        </div>

        {/* Card body */}
        <div className="p-6 pt-0">
          {/* Author + date bar */}
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
            <div className="text-sm text-gray-500">{formatDate(post.createdAt)}</div>
          </div>

          {/* Content */}
          <div className="ql-editor ql-snow">
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>

          {/* Stats */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>
                {t("stats.likes")}: {post.likesCount}
              </span>
              <span>
                {t("stats.comments")}: {post.commentsCount}
              </span>
              <span>
                {t("stats.lastUpdated")}: {formatDate(post.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ViewPost;
