import React, { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { AnnouncementItem } from "../DYouthAnnouncementsService";
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

  const [isEditing, setIsEditing] = useState(false);
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
    // Don't trigger edit if clicking on delete button
    if (target.closest("[data-delete-button]") || target.closest("[data-delete-container]")) {
      setMouseDownPos(null);
      setHasMoved(false);
      return;
    }

    // Wait a bit to check if drag happened, then trigger edit if it wasn't a drag
    setTimeout(() => {
      if (!hasMoved && !isDragging && mouseDownPos) {
        setIsEditing(true);
      }
      setMouseDownPos(null);
      setHasMoved(false);
    }, 50);
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
          onDelete={onDelete}
          dragAttributes={attributes}
          dragListeners={listeners}
          dragStyle={style}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      )}
    </div>
  );
};

export default AnnounceCard;
