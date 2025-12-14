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
} from "@dnd-kit/sortable";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CSpinner,
  CFormSelect,
  CAlert,
} from "@coreui/react";
import { FaFloppyDisk } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

import { LoadingSpinner } from "src/components/common";
import State from "./State";
import type { AnnouncementItem } from "./DyouthAnnouncementsService";
import SortableItem from "./SortableItem";
import NewAnnouncementCard from "./NewAnnouncementCard";

const DYouthAnnouncements: React.FC = observer(() => {
  const { t } = useTranslation("common");
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
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

  const handleAddNew = (data: AnnouncementItem) => {
    State.addAnnouncement(data);
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleSaveItem = (index: number, data: AnnouncementItem) => {
    State.updateAnnouncement(index, data);
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleDelete = (index: number) => {
    State.removeAnnouncement(index);
    if (editingIndex === index) {
      setEditingIndex(null);
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
            className="shadow-sm hover:shadow-md transition-shadow d-flex align-items-center flex-row"
            style={{ flexDirection: 'row', display: 'flex !important' }}
          >
            {State.isSaving ? (
              <>
                <CSpinner size="sm" className="me-2" />
                <span>{t("saving") || "Збереження..."}</span>
              </>
            ) : (
              <>
                <FaFloppyDisk className="me-2" />
                <span>{t("save") || "Зберегти"}</span>
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
          </div>
        </CCardHeader>
        <CCardBody className="p-4" style={{ overflow: "visible" }}>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={State.announcements.map((_, index) => `announcement-${index}`)}
              strategy={verticalListSortingStrategy}
            >
              <div style={{ overflow: "visible" }}>
                {State.announcements.map((item, index) => (
                  <SortableItem
                    key={`announcement-${index}`}
                    item={item}
                    index={index}
                    onSave={handleSaveItem}
                    onCancel={handleCancelEdit}
                    onDelete={handleDelete}
                    isEditing={editingIndex === index}
                    onStartEdit={() => handleEdit(index)}
                  />
                ))}
                <NewAnnouncementCard onSave={handleAddNew} onCancel={handleCancelEdit} />
              </div>
            </SortableContext>
          </DndContext>
        </CCardBody>
      </CCard>
    </div>
  );
});

export default DYouthAnnouncements;

