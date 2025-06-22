import React from 'react'
import { CCard, CCardBody, CCardHeader, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'

const mockPosts = [
  { id: 1, title: 'Перший пост', author: 'Іван', date: '2024-06-01' },
  { id: 2, title: 'Другий пост', author: 'Олена', date: '2024-06-02' },
  { id: 3, title: 'Третій пост', author: 'Петро', date: '2024-06-03' },
]

const Posts = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>Список постів</CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Заголовок</CTableHeaderCell>
              <CTableHeaderCell scope="col">Автор</CTableHeaderCell>
              <CTableHeaderCell scope="col">Дата</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {mockPosts.map((post) => (
              <CTableRow key={post.id}>
                <CTableDataCell>{post.id}</CTableDataCell>
                <CTableDataCell>{post.title}</CTableDataCell>
                <CTableDataCell>{post.author}</CTableDataCell>
                <CTableDataCell>{post.date}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Posts
