import React, { useState, Suspense } from "react";
import { CCard, CCardBody, CButton, CForm, CFormInput, CAlert, CSpinner } from "@coreui/react";
import { FaPlus, FaCheck, FaXmark } from "react-icons/fa6";
import type { AnnouncementItem } from "./DyouthAnnouncementsService";
import HTMLEditor from "src/components/HTMLEditor";

interface NewAnnouncementCardProps {
  onSave: (data: AnnouncementItem) => void;
  onCancel: () => void;
}

const NewAnnouncementCard: React.FC<NewAnnouncementCardProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<AnnouncementItem>({
    title: "",
    body: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    if (!formData.title.trim()) {
      setError("Заголовок обов'язковий");
      return;
    }
    onSave(formData);
    setFormData({ title: "", body: "" });
    setError(null);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setFormData({ title: "", body: "" });
    setError(null);
    setIsOpen(false);
    onCancel();
  };

  const handleFormClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't close if clicking on interactive elements
    if (
      target.closest('input') ||
      target.closest('button') ||
      target.closest('textarea') ||
      target.closest('.ql-editor') ||
      target.closest('.ql-toolbar') ||
      target.closest('.monaco-editor') ||
      target.closest('label') ||
      target.closest('select') ||
      target.closest('a')
    ) {
      return;
    }
    // Close form if clicking on form background
    handleCancel();
  };

  if (!isOpen) {
    return (
      <div className="mb-3">
        <CCard className="shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
          <CCardBody className="p-4">
            <button
              onClick={() => setIsOpen(true)}
              className="w-100 text-start text-gray-600 hover:text-blue-600 d-flex align-items-center gap-2"
            >
              <FaPlus />
              <span>Додати новий анонс</span>
            </button>
          </CCardBody>
        </CCard>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <CCard className="shadow-sm border-2 border-blue-500">
        <CCardBody className="p-3" style={{ overflow: "visible" }}>
          <CForm onClick={handleFormClick}>
            <div className="mb-2">
              <label className="form-label fw-semibold small">Заголовок *</label>
              <CFormInput
                type="text"
                size="sm"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Введіть заголовок"
                autoFocus
              />
            </div>

            <div className="mb-2" style={{ overflow: "visible" }}>
              <label className="form-label mb-1 d-block fw-semibold small">Контент *</label>
              <Suspense
                fallback={
                  <div className="d-flex justify-content-center align-items-center p-2" style={{ minHeight: "150px" }}>
                    <CSpinner size="sm" />
                  </div>
                }
              >
                <HTMLEditor
                  value={formData.body || ""}
                  onChange={(value) => setFormData({ ...formData, body: value })}
                  hasError={false}
                  height="200px"
                />
              </Suspense>
            </div>

            {error && (
              <CAlert color="danger" className="mb-2 py-2">
                <small>{error}</small>
              </CAlert>
            )}

            <div
              className="d-flex gap-2 justify-content-end mt-2"
              style={{ position: "relative", zIndex: 10 }}
            >
              <CButton color="secondary" size="sm" onClick={handleCancel} className="d-flex align-items-center">
                <FaXmark className="me-1" />
                <span>Скасувати</span>
              </CButton>
              <CButton color="primary" size="sm" onClick={handleSave} className="d-flex align-items-center">
                <FaCheck className="me-1" />
                <span>Додати</span>
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default NewAnnouncementCard;
