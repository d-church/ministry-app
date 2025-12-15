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
import type { AnnouncementItem } from "./DYouthAnnouncementsService";
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

  const [editingId, setEditingId] = useState<string | null>(null);
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
      // Pass IDs directly - faster than finding indices
      State.reorder(active.id as string, over.id as string);
    }
  };

  const handleAddNew = (data: AnnouncementItem) => {
    State.push(data);
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSaveItem = (id: string, data: AnnouncementItem) => {
    State.updateById(id, data);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    State.removeById(id);
    if (editingId === id) {
      setEditingId(null);
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


  if (State.isLoading && (!State.data || State.data.length === 0)) {
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
              items={(State.data || []).map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <div style={{ overflow: "visible" }}>
                {(State.data || []).map((item) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    onSave={handleSaveItem}
                    onCancel={handleCancelEdit}
                    onDelete={handleDelete}
                    isEditing={editingId === item.id}
                    onStartEdit={() => handleEdit(item.id)}
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

