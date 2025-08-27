import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { CCard, CCardBody, CCardHeader, CButton, CSpinner, CBadge } from "@coreui/react";
import { FaPen, FaTrash } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { uk } from "date-fns/locale/uk";

import { LoadingSpinner, UserAvatar } from "src/components/common";

import PostStore from "./PostStore";

const Posts: React.FC = observer(() => {
  const { t, i18n } = useTranslation("pages/posts");

  useEffect(() => {
    PostStore.loadPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const locale = i18n.language === 'uk' ? uk : undefined;

    return format(dateString, "d MMM yyyy, HH:mm", { locale });
  };

  const handleEdit = (id: string) => {
    console.log("Редагувати пост:", id);
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
    console.log("Додати новий пост");
  };

  if (PostStore.isLoading && (!PostStore.data || PostStore.data.length === 0)) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4 lg:px-6">
      <div className="sm:flex sm:items-center mb-4">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">{t("title")}</h1>
          <p className="mt-2 text-sm text-gray-700">{t("description")}</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <CButton
            color="primary"
            onClick={handleAddPost}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            {t("addPost")}
          </CButton>
        </div>
      </div>

      <CCard className="shadow-lg border-0">
        <CCardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">{t("allPosts")}</h3>
          </div>
        </CCardHeader>
        <CCardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                                     <th
                     scope="col"
                     className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-80"
                   >
                     {t("table.title")}
                   </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("table.author")}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("table.date")}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("table.status")}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24"
                  >
                    {t("table.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {PostStore.data?.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      <div className="max-w-md truncate" title={post.title}>
                        {post.title}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
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
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(post.createdAt)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <CBadge color="success" className="text-xs">
                        {t("status.published")}
                      </CBadge>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2 justify-end">
                        <CButton
                          color="ghost"
                          size="sm"
                          onClick={() => handleEdit(post.id)}
                          className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 p-2"
                          title={t("editPost")}
                        >
                          <FaPen className="w-4 h-4" />
                        </CButton>
                        <CButton
                          color="ghost"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:text-red-900 hover:bg-red-50 p-2"
                          title={t("deletePost")}
                        >
                          <FaTrash className="w-4 h-4" />
                        </CButton>
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
        </CCardBody>
      </CCard>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          {t("showing")} <span className="font-medium">{PostStore.data?.length || 0}</span> {t("postsCount")}
          {PostStore.isLoading && <CSpinner size="sm" className="ml-2" />}
        </div>
        <div className="flex space-x-2">
          <CButton color="outline" size="sm" disabled>
            {t("previous")}
          </CButton>
          <CButton color="outline" size="sm" disabled>
            {t("next")}
          </CButton>
        </div>
      </div>
    </div>
  );
});

export default Posts;
