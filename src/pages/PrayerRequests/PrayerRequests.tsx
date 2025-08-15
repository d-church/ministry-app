import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CButton, CBadge, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CForm, CFormInput, CFormTextarea, CFormSelect } from '@coreui/react'
import { FaPlus, FaPray, FaHeart, FaClock } from 'react-icons/fa'

interface PrayerRequest {
  id: number
  title: string
  description: string
  requester: string
  category: 'healing' | 'family' | 'work' | 'spiritual' | 'other'
  priority: 'low' | 'medium' | 'high'
  status: 'active' | 'answered' | 'archived'
  dateCreated: string
  dateAnswered?: string
}

const mockPrayerRequests: PrayerRequest[] = [
  {
    id: 1,
    title: 'Зцілення для мами',
    description: 'Моя мама хвора і потребує молитви за зцілення',
    requester: 'Олена Коваленко',
    category: 'healing',
    priority: 'high',
    status: 'active',
    dateCreated: '2024-07-01',
  },
  {
    id: 2,
    title: 'Мир в родині',
    description: 'Прошу молитися за примирення в нашій родині',
    requester: 'Іван Петренко',
    category: 'family',
    priority: 'medium',
    status: 'active',
    dateCreated: '2024-07-03',
  },
  {
    id: 3,
    title: 'Нова робота',
    description: 'Пошук роботи після звільнення',
    requester: 'Марія Іваненко',
    category: 'work',
    priority: 'medium',
    status: 'answered',
    dateCreated: '2024-06-15',
    dateAnswered: '2024-06-30',
  },
  {
    id: 4,
    title: 'Духовне зростання',
    description: 'Молитва за поглиблення відносин з Богом',
    requester: 'Андрій Мельник',
    category: 'spiritual',
    priority: 'low',
    status: 'active',
    dateCreated: '2024-07-05',
  },
]

const PrayerRequests: React.FC = () => {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(mockPrayerRequests)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other' as PrayerRequest['category'],
    priority: 'medium' as PrayerRequest['priority'],
  })

  const getCategoryBadge = (category: PrayerRequest['category']) => {
    const categoryMap = {
      healing: { color: 'danger', text: 'Зцілення', icon: <FaHeart className="w-3 h-3" /> },
      family: { color: 'warning', text: 'Родина', icon: <FaHeart className="w-3 h-3" /> },
      work: { color: 'info', text: 'Робота', icon: <FaClock className="w-3 h-3" /> },
      spiritual: { color: 'success', text: 'Духовне', icon: <FaPray className="w-3 h-3" /> },
      other: { color: 'secondary', text: 'Інше', icon: <FaPray className="w-3 h-3" /> },
    }
    const category_info = categoryMap[category]
    return (
      <CBadge color={category_info.color} className="text-xs flex items-center gap-1">
        {category_info.icon}
        {category_info.text}
      </CBadge>
    )
  }

  const getPriorityBadge = (priority: PrayerRequest['priority']) => {
    if (priority === 'high') {
      return <CBadge color="danger" className="text-xs">Високий</CBadge>
    } else if (priority === 'medium') {
      return <CBadge color="warning" className="text-xs">Середній</CBadge>
    }
    return <CBadge color="secondary" className="text-xs">Низький</CBadge>
  }

  const getStatusBadge = (status: PrayerRequest['status']) => {
    if (status === 'answered') {
      return <CBadge color="success" className="text-xs">Дана відповідь</CBadge>
    } else if (status === 'archived') {
      return <CBadge color="secondary" className="text-xs">Архівовано</CBadge>
    }
    return <CBadge color="primary" className="text-xs">Активно</CBadge>
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newRequest: PrayerRequest = {
      id: Math.max(...prayerRequests.map(pr => pr.id)) + 1,
      title: formData.title,
      description: formData.description,
      requester: 'Поточний користувач', // В реальному додатку це буде з контексту
      category: formData.category,
      priority: formData.priority,
      status: 'active',
      dateCreated: new Date().toISOString().split('T')[0],
    }
    setPrayerRequests([newRequest, ...prayerRequests])
    setFormData({ title: '', description: '', category: 'other', priority: 'medium' })
    setShowModal(false)
  }

  const handleStatusChange = (id: number, newStatus: PrayerRequest['status']) => {
    setPrayerRequests(prev => prev.map(pr =>
      pr.id === id
        ? {
            ...pr,
            status: newStatus,
            dateAnswered: newStatus === 'answered' ? new Date().toISOString().split('T')[0] : undefined
          }
        : pr
    ))
  }

  const handleDelete = (id: number) => {
    setPrayerRequests(prev => prev.filter(pr => pr.id !== id))
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <FaPray className="text-blue-600" />
            Молитовні потреби
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Управління молитовними проханнями та потребами спільноти
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <CButton
            color="primary"
            onClick={() => setShowModal(true)}
            className="shadow-sm hover:shadow-md transition-shadow flex items-center gap-2"
          >
            <FaPlus className="w-4 h-4" />
            Додати молитовну потребу
          </CButton>
        </div>
      </div>

      <CCard className="shadow-lg border-0">
        <CCardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Всі молитовні потреби</h3>
            <div className="flex space-x-2">
              <CButton color="outline" size="sm" className="text-xs">
                Експорт
              </CButton>
              <CButton color="outline" size="sm" className="text-xs">
                Фільтр
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
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Назва
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Автор запиту
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Категорія
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Пріоритет
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата створення
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Дії</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {prayerRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{request.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-medium">{request.title}</div>
                      <div className="text-gray-500 text-xs mt-1 max-w-xs truncate">
                        {request.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-800">
                            {request.requester.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{request.requester}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getCategoryBadge(request.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getPriorityBadge(request.priority)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.dateCreated}
                      {request.dateAnswered && (
                        <div className="text-xs text-green-600">
                          Відповідь: {request.dateAnswered}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        {request.status === 'active' && (
                          <CButton
                            color="link"
                            size="sm"
                            onClick={() => handleStatusChange(request.id, 'answered')}
                            className="text-green-600 hover:text-green-900 p-0"
                          >
                            Відповісти
                          </CButton>
                        )}
                        <CButton
                          color="link"
                          size="sm"
                          onClick={() => handleDelete(request.id)}
                          className="text-red-600 hover:text-red-900 p-0"
                        >
                          Видалити
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
          Показано <span className="font-medium">{prayerRequests.length}</span> з <span className="font-medium">{prayerRequests.length}</span> результатів
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

      {/* Modal для додавання молитовної потреби */}
      <CModal visible={showModal} onClose={() => setShowModal(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Додати молитовну потребу</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={handleSubmit}>
          <CModalBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Назва *
                </label>
                <CFormInput
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Коротка назва молитовної потреби"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Опис *
                </label>
                <CFormTextarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Детальний опис молитовної потреби"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категорія
                  </label>
                  <CFormSelect
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as PrayerRequest['category'] }))}
                  >
                    <option value="healing">Зцілення</option>
                    <option value="family">Родина</option>
                    <option value="work">Робота</option>
                    <option value="spiritual">Духовне</option>
                    <option value="other">Інше</option>
                  </CFormSelect>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Пріоритет
                  </label>
                  <CFormSelect
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as PrayerRequest['priority'] }))}
                  >
                    <option value="low">Низький</option>
                    <option value="medium">Середній</option>
                    <option value="high">Високий</option>
                  </CFormSelect>
                </div>
              </div>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowModal(false)}>
              Скасувати
            </CButton>
            <CButton color="primary" type="submit">
              Додати
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </div>
  )
}

export default PrayerRequests
