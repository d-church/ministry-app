import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { reaction } from "mobx";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CSpinner,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CAlert,
} from "@coreui/react";
import { FaPlus, FaPen, FaTrash, FaGripLinesVertical, FaFloppyDisk } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

import { LoadingSpinner } from "src/components/common";
import HTMLEditor from "src/components/HTMLEditor";
import State from "./State";
import type { AnnouncementItem } from "./DyouthAnnouncementsService";

interface SortableItemProps {
  item: AnnouncementItem;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ item, index, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `announcement-${index}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-3">
      <CCard className="shadow-sm hover:shadow-md transition-shadow">
        <CCardBody className="p-4">
          <div className="flex items-start gap-3">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 mt-1"
            >
              <FaGripLinesVertical />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h4>
              <div
                className="text-sm text-gray-600 mb-2 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: item.body || "" }}
              />
            </div>
            <div className="flex gap-2">
              <CButton
                color="ghost"
                size="sm"
                onClick={onEdit}
                className="text-blue-600 hover:text-blue-900 hover:bg-blue-50"
              >
                <FaPen />
              </CButton>
              <CButton
                color="ghost"
                size="sm"
                onClick={onDelete}
                className="text-red-600 hover:text-red-900 hover:bg-red-50"
              >
                <FaTrash />
              </CButton>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
};

const DYouthAnnouncements: React.FC = observer(() => {
  const { t } = useTranslation("common");
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<AnnouncementItem>({
    title: "",
    body: "",
  });
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    State.loadAnnouncements();

    // Set up reaction to reload when locale changes
    const dispose = reaction(
      () => State.locale,
      () => {
        State.loadAnnouncements();
      },
    );

    return () => {
      dispose();
    };
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = parseInt(active.id.toString().replace("announcement-", ""));
      const newIndex = parseInt(over.id.toString().replace("announcement-", ""));

      State.reorderAnnouncements(oldIndex, newIndex);
    }
  };

  const handleAddNew = () => {
    setFormData({
      title: "",
      body: "",
    });
    setEditingIndex(null);
    setIsEditModalOpen(true);
  };

  const handleEdit = (index: number) => {
    setFormData(State.announcements[index]);
    setEditingIndex(index);
    setIsEditModalOpen(true);
  };

  const handleDelete = (index: number) => {
    if (window.confirm(t("confirmDelete") || "Ви впевнені, що хочете видалити цей анонс?")) {
      State.removeAnnouncement(index);
    }
  };

  const handleSave = async () => {
    setSaveError(null);
    setSaveSuccess(false);
    try {
      await State.saveAnnouncements();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Помилка збереження";
      setSaveError(errorMessage);
    }
  };

  const handleModalSave = () => {
    if (!formData.title.trim()) {
      setSaveError("Заголовок обов'язковий");
      return;
    }

    if (editingIndex !== null) {
      State.updateAnnouncement(editingIndex, formData);
    } else {
      State.addAnnouncement(formData);
    }

    setIsEditModalOpen(false);
    setFormData({ title: "", body: "" });
    setEditingIndex(null);
    setSaveError(null);
  };

  if (State.isLoading && State.announcements.length === 0) {
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
          <h1 className="text-2xl font-semibold text-gray-900">
            {t("sidebar.dyouthAnnouncements") || "Анонси D.Youth"}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {t("dyouthAnnouncements.description") ||
              "Керуйте анонсами для сторінки D.Youth. Перетягуйте картки для зміни порядку."}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex gap-2">
          <CFormSelect
            value={State.locale}
            onChange={(e) => State.setLocale(e.target.value as "UK" | "EN")}
            className="w-auto"
          >
            <option value="UK">UK</option>
            <option value="EN">EN</option>
          </CFormSelect>
          <CButton
            color="primary"
            onClick={handleSave}
            disabled={State.isSaving}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            {State.isSaving ? (
              <>
                <CSpinner size="sm" className="me-2" />
                {t("saving") || "Збереження..."}
              </>
            ) : (
              <>
                <FaFloppyDisk className="me-2" />
                {t("save") || "Зберегти"}
              </>
            )}
          </CButton>
        </div>
      </div>

      {saveSuccess && (
        <CAlert color="success" className="mb-4">
          {t("savedSuccessfully") || "Анонси успішно збережено!"}
        </CAlert>
      )}

      {saveError && (
        <CAlert color="danger" className="mb-4">
          {saveError}
        </CAlert>
      )}

      <CCard className="shadow-lg border-0">
        <CCardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              {t("dyouthAnnouncements.list") || "Список анонсів"}
            </h3>
            <CButton color="primary" onClick={handleAddNew}>
              <FaPlus className="me-2" />
              {t("add") || "Додати"}
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody className="p-4">
          {State.announcements.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>{t("dyouthAnnouncements.noAnnouncements") || "Немає анонсів. Додайте перший!"}</p>
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext
                items={State.announcements.map((_, index) => `announcement-${index}`)}
                strategy={verticalListSortingStrategy}
              >
                <div>
                  {State.announcements.map((item, index) => (
                    <SortableItem
                      key={`announcement-${index}`}
                      item={item}
                      index={index}
                      onEdit={() => handleEdit(index)}
                      onDelete={() => handleDelete(index)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </CCardBody>
      </CCard>

      {/* Edit/Add Modal */}
      <CModal visible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} size="lg">
        <CModalHeader>
          <CModalTitle>
            {editingIndex !== null
              ? t("editAnnouncement") || "Редагувати анонс"
              : t("addAnnouncement") || "Додати анонс"}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <label className="form-label">{t("title") || "Заголовок"} *</label>
              <CFormInput
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={t("enterTitle") || "Введіть заголовок"}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label mb-2 d-block">{t("body") || "Контент"} *</label>
              <HTMLEditor
                value={formData.body || ""}
                onChange={(value) => setFormData({ ...formData, body: value })}
                hasError={false}
                height="300px"
              />
            </div>

            {saveError && (
              <CAlert color="danger" className="mt-3">
                {saveError}
              </CAlert>
            )}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsEditModalOpen(false)}>
            {t("cancel") || "Скасувати"}
          </CButton>
          <CButton color="primary" onClick={handleModalSave}>
            {t("save") || "Зберегти"}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
});

export default DYouthAnnouncements;

