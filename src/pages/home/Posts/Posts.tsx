import React from 'react'
import { CCard, CCardBody, CCardHeader, CButton, CBadge } from '@coreui/react'
import { useTranslation } from 'react-i18next'

interface Post {
  id: number
  title: string
  author: string
  date: string
  status: 'published' | 'draft'
}

const mockPosts: Post[] = [
  { id: 1, title: 'Перший пост', author: 'Іван', date: '2024-06-01', status: 'published' },
  { id: 2, title: 'Другий пост', author: 'Олена', date: '2024-06-02', status: 'draft' },
  { id: 3, title: 'Третій пост', author: 'Петро', date: '2024-06-03', status: 'published' },
  { id: 4, title: 'Четвертий пост', author: 'Марія', date: '2024-06-04', status: 'published' },
  { id: 5, title: 'П\'ятий пост', author: 'Андрій', date: '2024-06-05', status: 'draft' },
]

const Posts: React.FC = () => {
  const { t } = useTranslation();

  const getStatusBadge = (status: Post['status']) => {
    if (status === 'published') {
      return <CBadge color="success" className="text-xs">{t('pages.posts.status.published')}</CBadge>
    }
    return <CBadge color="warning" className="text-xs">{t('pages.posts.status.draft')}</CBadge>
  }

  const handleEdit = (id: number) => {
    console.log('Редагувати пост:', id)
  }

  const handleDelete = (id: number) => {
    console.log('Видалити пост:', id)
  }

  const handleAddPost = () => {
    console.log('Додати новий пост')
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">{t('pages.posts.title')}</h1>
          <p className="mt-2 text-sm text-gray-700">
            {t('pages.posts.description')}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <CButton
            color="primary"
            onClick={handleAddPost}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            {t('pages.posts.addPost')}
          </CButton>
        </div>
      </div>

      <CCard className="shadow-lg border-0">
        <CCardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">{t('pages.posts.allPosts')}</h3>
            <div className="flex space-x-2">
              <CButton color="outline" size="sm" className="text-xs">
                {t('pages.posts.export')}
              </CButton>
              <CButton color="outline" size="sm" className="text-xs">
                {t('pages.posts.filter')}
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
                    {t('pages.posts.table.id')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('pages.posts.table.title')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('pages.posts.table.author')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('pages.posts.table.date')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('pages.posts.table.status')}
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">{t('pages.posts.table.actions')}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{post.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-800">
                            {post.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{post.author}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getStatusBadge(post.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <CButton
                          color="link"
                          size="sm"
                          onClick={() => handleEdit(post.id)}
                          className="text-blue-600 hover:text-blue-900 p-0"
                        >
                          {t('pages.posts.edit')}
                        </CButton>
                        <CButton
                          color="link"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:text-red-900 p-0"
                        >
                          {t('pages.posts.delete')}
                        </CButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CCardBody>
      </CCard>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          {t('pages.posts.showing')} <span className="font-medium">{mockPosts.length}</span> {t('pages.posts.of')} <span className="font-medium">{mockPosts.length}</span> {t('pages.posts.results')}
        </div>
        <div className="flex space-x-2">
          <CButton color="outline" size="sm" disabled>
            {t('pages.posts.previous')}
          </CButton>
          <CButton color="outline" size="sm" disabled>
            {t('pages.posts.next')}
          </CButton>
        </div>
      </div>
    </div>
  )
}

export default Posts
