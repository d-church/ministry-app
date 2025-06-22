import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CRow,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CProgress,
  CBadge,
  CAlert,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CSpinner,
  CWidgetStatsF,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilChart,
  cilSpeedometer,
  cilPeople,
  cilPlus,
  cilPencil,
  cilTrash,
} from '@coreui/icons'

const Overview = () => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const mockUsers = [
    { id: 1, name: 'О. Іван Петренко', email: 'pastor@d.church', status: 'active', role: 'Пастор' },
    { id: 2, name: 'Олена Коваленко', email: 'worship@d.church', status: 'active', role: 'Музичне служіння' },
    { id: 3, name: 'Петро Сидоренко', email: 'youth@d.church', status: 'active', role: 'Молодіжне служіння' },
    { id: 4, name: 'Марія Іваненко', email: 'children@d.church', status: 'active', role: 'Дитяче служіння' },
    { id: 5, name: 'Андрій Мельник', email: 'admin@d.church', status: 'active', role: 'Адміністратор' },
  ]

  const mockStats = [
    { title: 'Прихожани', value: '156', icon: cilUser, color: 'primary' },
    { title: 'Служіння', value: '23', icon: cilChart, color: 'success' },
    { title: 'Молитовні запити', value: '89', icon: cilSpeedometer, color: 'warning' },
    { title: 'Відвідувачі сайту', value: '1,247', icon: cilPeople, color: 'info' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setVisible(false)
      setFormData({ name: '', email: '', message: '' })
    }, 2000)
  }

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <CBadge color="success">Активний</CBadge>
    ) : (
      <CBadge color="secondary">Неактивний</CBadge>
    )
  }

  const getRoleBadge = (role: string) => {
    const colors = {
      'Пастор': 'danger',
      'Музичне служіння': 'warning',
      'Молодіжне служіння': 'info',
      'Дитяче служіння': 'success',
      'Адміністратор': 'primary'
    }
    return <CBadge color={colors[role as keyof typeof colors]}>{role}</CBadge>
  }

  return (
    <div className="p-4">

      {/* Статистика */}
      <CRow className="mb-4">
        {mockStats.map((stat, index) => (
          <CCol key={index} sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon icon={stat.icon} height={24} />}
              title={stat.title}
              value={stat.value}
              color={stat.color}
            />
          </CCol>
        ))}
      </CRow>

      {/* Алерти */}
      <CRow className="mb-4">
        <CCol>
          <CAlert color="success" className="mb-2">
            <strong>Успіх!</strong> Операція виконана успішно.
          </CAlert>
          <CAlert color="warning" className="mb-2">
            <strong>Увага!</strong> Будь ласка, перевірте введені дані.
          </CAlert>
          <CAlert color="info">
            <strong>Інформація!</strong> Це тестова сторінка для демонстрації компонентів.
          </CAlert>
        </CCol>
      </CRow>

      {/* Основні картки */}
      <CRow className="mb-4">
        <CCol lg={8}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <CCardTitle className="mb-0">Список користувачів</CCardTitle>
              <CButton
                color="primary"
                size="sm"
                onClick={() => setVisible(true)}
                className="d-flex align-items-center gap-2"
              >
                <CIcon icon={cilPlus} size="sm" />
                Додати користувача
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Ім'я</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Статус</CTableHeaderCell>
                    <CTableHeaderCell>Роль</CTableHeaderCell>
                    <CTableHeaderCell>Дії</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {mockUsers.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell>{user.id}</CTableDataCell>
                      <CTableDataCell>{user.name}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell>{getStatusBadge(user.status)}</CTableDataCell>
                      <CTableDataCell>{getRoleBadge(user.role)}</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex gap-2">
                          <CButton color="info" size="sm">
                            <CIcon icon={cilPencil} size="sm" />
                          </CButton>
                          <CButton color="danger" size="sm">
                            <CIcon icon={cilTrash} size="sm" />
                          </CButton>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol lg={4}>
          <CCard className="mb-4">
            <CCardHeader>
              <CCardTitle className="mb-0">Прогрес завдань</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Підготовка до служіння</span>
                  <span>85%</span>
                </div>
                <CProgress value={85} className="mb-3" />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Молодіжна конференція</span>
                  <span>60%</span>
                </div>
                <CProgress value={60} color="warning" className="mb-3" />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Дитячий табір</span>
                  <span>95%</span>
                </div>
                <CProgress value={95} color="success" className="mb-3" />
              </div>
              <div>
                <div className="d-flex justify-content-between mb-1">
                  <span>Ремонт приміщення</span>
                  <span>35%</span>
                </div>
                <CProgress value={35} color="danger" />
              </div>
            </CCardBody>
          </CCard>

          <CCard>
            <CCardHeader>
              <CCardTitle className="mb-0">Швидкі дії</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <div className="d-grid gap-2">
                <CButton color="primary" variant="outline">
                  Створити оголошення
                </CButton>
                <CButton color="success" variant="outline">
                  Додати молитовний запит
                </CButton>
                <CButton color="warning" variant="outline">
                  Планування служіння
                </CButton>
                <CButton color="info" variant="outline">
                  Звіт про відвідуваність
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Модальне вікно */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Додати нового користувача</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <CFormLabel htmlFor="name">Ім'я</CFormLabel>
              <CFormInput
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="email">Email</CFormLabel>
              <CFormInput
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="message">Повідомлення</CFormLabel>
              <CFormTextarea
                id="message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Скасувати
          </CButton>
          <CButton
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            className="d-flex align-items-center gap-2"
          >
            {loading && <CSpinner size="sm" />}
            {loading ? 'Збереження...' : 'Зберегти'}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Overview;
