import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { uk } from "date-fns/locale/uk";

import { LoadingSpinner, UserAvatar } from "src/components/common";
import { HOME_ROUTE } from "src/constants";

import PostStore from "./PostStore";

const Posts: React.FC = observer(() => {
  const { t, i18n } = useTranslation("pages/posts");
  const navigate = useNavigate();

  useEffect(() => {
    PostStore.loadPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const locale = i18n.language === "uk" ? uk : undefined;
    return format(dateString, "d MMM yyyy, HH:mm", { locale });
  };

  const handleView = (id: string) => {
    navigate(`${HOME_ROUTE}/website/posts/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`${HOME_ROUTE}/website/posts/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t("confirmDelete"))) {
      try {
        await PostStore.deletePost(id);
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  const handleAddPost = () => {
    navigate(`${HOME_ROUTE}/website/posts/create`);
  };

  if (PostStore.isLoading && (!PostStore.data || PostStore.data.length === 0)) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{t("title")}</h1>
          <p className="mt-1 text-sm text-gray-500">{t("description")}</p>
        </div>
        <button
          onClick={handleAddPost}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-[#18181B] text-white text-sm font-medium hover:bg-[#18181B]/90 transition-colors"
        >
          <FaPlus className="w-4 h-4" />
          {t("addPost")}
        </button>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 h-12 bg-white">
              <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm w-80">
                {t("table.title")}
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                {t("table.author")}
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                {t("table.date")}
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                {t("table.status")}
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm w-24">
                {t("table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {PostStore.data?.map((post) => (
              <tr
                key={post.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors h-[60px]"
              >
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                  <div
                    className="max-w-md truncate cursor-pointer hover:text-blue-600 transition-colors"
                    title={post.title}
                    onClick={() => handleView(post.id)}
                  >
                    {post.title}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <UserAvatar user={post.author} size="sm" />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {post.author.first_name} {post.author.last_name}
                      </div>
                      <div className="text-xs text-gray-500">{post.author.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                  {formatDate(post.createdAt)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border-green-200">
                    {t("status.published")}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(post.id)}
                      className="p-2 text-[#18181B] hover:bg-[#f4f4f5] rounded-md transition-colors"
                      title={t("editPost")}
                    >
                      <FaPen className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title={t("deletePost")}
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )) || (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                  {t("noPostsFound")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {t("showing")} <span className="font-medium">{PostStore.data?.length || 0}</span>{" "}
          {t("postsCount")}
          {PostStore.isLoading && (
            <span className="inline-block ml-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent text-blue-500" />
          )}
        </div>
        <div className="flex gap-2">
          <button
            disabled
            className="px-3 h-8 text-sm border border-[#e4e4e7] rounded-md bg-white text-[#18181B] hover:bg-[#f4f4f5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t("previous")}
          </button>
          <button
            disabled
            className="px-3 h-8 text-sm border border-[#e4e4e7] rounded-md bg-white text-[#18181B] hover:bg-[#f4f4f5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t("next")}
          </button>
        </div>
      </div>
    </div>
  );
});

export default Posts;
