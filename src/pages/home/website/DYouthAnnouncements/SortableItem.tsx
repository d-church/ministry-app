import React, { useState, useEffect, Suspense } from "react";
import {
  CCard,
  CCardBody,
  CButton,
  CForm,
  CFormInput,
  CAlert,
  CSpinner,
} from "@coreui/react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { AnnouncementItem } from "./DyouthAnnouncementsService";
import HTMLEditor from "src/components/HTMLEditor";

interface SortableItemProps {
  item: AnnouncementItem;
  index: number;
  onSave: (index: number, data: AnnouncementItem) => void;
  onCancel: () => void;
  onDelete: (index: number) => void;
  isEditing: boolean;
  onStartEdit: () => void;
}

const SortableItem: React.FC<SortableItemProps> = ({
  item,
  index,
  onSave,
  onCancel,
  onDelete,
  isEditing,
  onStartEdit,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: `announcement-${index}`,
  });

  const [formData, setFormData] = useState<AnnouncementItem>(item);
  const [error, setError] = useState<string | null>(null);
  const [mouseDownPos, setMouseDownPos] = useState<{ x: number; y: number } | null>(null);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setFormData(item);
      setError(null);
    }
  }, [isEditing, item]);

  useEffect(() => {
    if (!mouseDownPos) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const deltaX = Math.abs(e.clientX - mouseDownPos.x);
      const deltaY = Math.abs(e.clientY - mouseDownPos.y);
      // If mouse moved more than 5px, consider it a drag
      if (deltaX > 5 || deltaY > 5) {
        setHasMoved(true);
      }
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [mouseDownPos]);

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      setError("Заголовок обов'язковий");
      return;
    }
    onSave(index, formData);
  };

  const handleCancel = () => {
    setFormData(item);
    setError(null);
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

  if (isEditing) {
    return (
      <div ref={setNodeRef} style={style} className="mb-3">
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
                    value={formData.body}
                    onChange={(value) => setFormData({ ...formData, body: value })}
                    hasError={false}
                  />
                </Suspense>
              </div>

              {error && (
                <CAlert color="danger" className="mb-2 py-2">
                  <small>{error}</small>
                </CAlert>
              )}

              <div className="d-flex gap-2 justify-content-end mt-2" style={{ position: "relative", zIndex: 10 }}>
                <CButton color="secondary" size="sm" onClick={handleCancel} className="d-flex align-items-center">
                  <FaXmark className="me-1" />
                  <span>Скасувати</span>
                </CButton>
                <CButton color="primary" size="sm" onClick={handleSave} className="d-flex align-items-center">
                  <FaCheck className="me-1" />
                  <span>Зберегти</span>
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </div>
    );
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't start tracking if clicking on delete button or its container
    if (target.closest('[data-delete-button]') || target.closest('[data-delete-container]')) {
      return;
    }
    setMouseDownPos({ x: e.clientX, y: e.clientY });
    setHasMoved(false);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't trigger edit if clicking on delete button
    if (target.closest('[data-delete-button]') || target.closest('[data-delete-container]')) {
      setMouseDownPos(null);
      setHasMoved(false);
      return;
    }

    // Wait a bit to check if drag happened, then trigger edit if it wasn't a drag
    setTimeout(() => {
      if (!hasMoved && !isDragging && mouseDownPos) {
        onStartEdit();
      }
      setMouseDownPos(null);
      setHasMoved(false);
    }, 50);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-3"
      {...attributes}
      {...listeners}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <CCard className="shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
        <CCardBody className="p-4">
          <div className="d-flex align-items-start gap-3">
            <div className="flex-1">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h4>
              <div
                className="text-sm text-gray-600 mb-2 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: item.body || "" }}
              />
            </div>
            <div
              className="d-flex gap-2"
              data-delete-container
              onMouseDown={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <CButton
                color="ghost"
                size="sm"
                data-delete-button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onDelete(index);
                }}
                className="text-red-600 hover:text-red-900 hover:bg-red-50"
              >
                Видалити
              </CButton>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default SortableItem;
