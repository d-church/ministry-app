import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { CCard, CCardBody, CCardHeader, CButton, CBadge, CSpinner } from '@coreui/react'
import { useTranslation } from 'react-i18next'

import { LoadingSpinner, UserAvatar } from 'src/components/common';

import PostStore from './PostStore'

const Posts: React.FC = observer(() => {
  const { t } = useTranslation("pages/posts");

  useEffect(() => {
    const loadData = async () => {
      await PostStore.loadPosts();
    };

    loadData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (likesCount: number, commentsCount: number) => {
    if (likesCount > 0 || commentsCount > 0) {
      return <CBadge color="success" className="text-xs">Активний</CBadge>
    }
    return <CBadge color="secondary" className="text-xs">Новий</CBadge>
  }

  const handleEdit = (id: string) => {
    console.log('Редагувати пост:', id)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей пост?')) {
      try {
        await PostStore.deletePost(id);
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  }

  const handleLike = async (id: string) => {
    try {
      await PostStore.likePost(id);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  }

  const handleAddPost = () => {
    console.log('Додати новий пост')
  }

  if (PostStore.isLoading && (!PostStore.data || PostStore.data.length === 0)) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">{t('title')}</h1>
          <p className="mt-2 text-sm text-gray-700">
            {t('description')}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <CButton
            color="primary"
            onClick={handleAddPost}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            {t('addPost')}
          </CButton>
        </div>
      </div>

      <CCard className="shadow-lg border-0">
        <CCardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">{t('allPosts')}</h3>
            <div className="flex space-x-2">
              <CButton color="outline" size="sm" className="text-xs">
                {t('export')}
              </CButton>
              <CButton color="outline" size="sm" className="text-xs">
                {t('filter')}
              </CButton>
            </div>
          </div>
        </CCardHeader>
        <CCardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Заголовок
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Автор
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата створення
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Лайки
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Коментарі
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">{t('table.actions')}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {PostStore.data?.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      <div className="max-w-xs truncate" title={post.title}>
                        {post.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <UserAvatar
                          user={post.author}
                          size="sm"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {post.author.first_name} {post.author.last_name}
                          </div>
                          <div className="text-xs text-gray-500">{post.author.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(post.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className={`${post.isLiked ? 'text-red-500' : 'text-gray-400'} mr-1`}>
                          ❤️
                        </span>
                        {post.likesCount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-1">💬</span>
                        {post.commentsCount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getStatusBadge(post.likesCount, post.commentsCount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <CButton
                          color="link"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`${post.isLiked ? 'text-red-600 hover:text-red-900' : 'text-gray-600 hover:text-gray-900'} p-0`}
                        >
                          {post.isLiked ? 'Не подобається' : 'Подобається'}
                        </CButton>
                        <CButton
                          color="link"
                          size="sm"
                          onClick={() => handleEdit(post.id)}
                          className="text-blue-600 hover:text-blue-900 p-0"
                        >
                          Редагувати
                        </CButton>
                        <CButton
                          color="link"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:text-red-900 p-0"
                        >
                          Видалити
                        </CButton>
                      </div>
                    </td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                      Постів не знайдено
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CCardBody>
      </CCard>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Показано <span className="font-medium">{PostStore.data?.length || 0}</span> постів
          {PostStore.isLoading && <CSpinner size="sm" className="ml-2" />}
        </div>
        <div className="flex space-x-2">
          <CButton color="outline" size="sm" disabled>
            Попередня
          </CButton>
          <CButton color="outline" size="sm" disabled>
            Наступна
          </CButton>
        </div>
      </div>
    </div>
  )
});

export default Posts
