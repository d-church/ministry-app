import React, { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from "@coreui/react";
import { useTranslation } from "react-i18next";
import type { AnnouncementItem } from "src/services/DYouthAnnouncementsService";
import AnnounceCardView from "./AnnounceCardView";
import AnnounceCardEdit from "./AnnounceCardEdit";

const AnnounceCard: React.FC<{
  item: AnnouncementItem;
  onSave: (id: string, data: AnnouncementItem) => void;
  onDelete: (id: string) => void;
}> = ({ item, onSave, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: item.id,
  });

  const { t } = useTranslation("common");
  const { t: tPage } = useTranslation("pages/d-youth-announcements");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<AnnouncementItem>(item);
  const [error, setError] = useState<string | null>(null);
  const [mouseDownPos, setMouseDownPos] = useState<{ x: number; y: number } | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    document.addEventListener("mousemove", handleGlobalMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
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
    onSave(item.id, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(item);
    setError(null);
    setIsEditing(false);
  };

  const handleFormClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't close if clicking on interactive elements
    if (
      target.closest("input") ||
      target.closest("button") ||
      target.closest("textarea") ||
      target.closest(".ql-editor") ||
      target.closest(".ql-toolbar") ||
      target.closest(".monaco-editor") ||
      target.closest("label") ||
      target.closest("select") ||
      target.closest("a")
    ) {
      return;
    }
    // Close form if clicking on form background
    handleCancel();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't start tracking if clicking on delete button or its container
    if (target.closest("[data-delete-button]") || target.closest("[data-delete-container]")) {
      return;
    }
    setMouseDownPos({ x: e.clientX, y: e.clientY });
    setHasMoved(false);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't trigger edit if clicking on delete button or if modal is open
    if (target.closest("[data-delete-button]") || target.closest("[data-delete-container]") || showDeleteModal) {
      setMouseDownPos(null);
      setHasMoved(false);
      return;
    }

    // Check if we're still on the same element (not dragged)
    if (mouseDownPos) {
      const deltaX = Math.abs(e.clientX - mouseDownPos.x);
      const deltaY = Math.abs(e.clientY - mouseDownPos.y);

      // Only trigger edit if mouse didn't move much and it wasn't a drag
      if (deltaX <= 5 && deltaY <= 5 && !hasMoved && !isDragging) {
        setIsEditing(true);
      }
    }

    setMouseDownPos(null);
    setHasMoved(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    onDelete(item.id);
  };

  return (
    <div ref={setNodeRef}>
      {isEditing ? (
        <AnnounceCardEdit
          item={item}
          formData={formData}
          error={error}
          dragStyle={style}
          onFormDataChange={setFormData}
          onSave={handleSave}
          onCancel={handleCancel}
          onFormClick={handleFormClick}
        />
      ) : (
        <AnnounceCardView
          item={item}
          onDeleteClick={handleDeleteClick}
          dragAttributes={attributes}
          dragListeners={listeners}
          dragStyle={style}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      )}
      <CModal visible={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <CModalHeader>
          <CModalTitle>{tPage("announcements.deleteConfirmTitle")}</CModalTitle>
        </CModalHeader>
        <CModalBody>{tPage("announcements.deleteConfirm")}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowDeleteModal(false)}>
            {t("cancel")}
          </CButton>
          <CButton color="danger" className="text-white" onClick={handleDeleteConfirm}>
            {t("delete")}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default AnnounceCard;
