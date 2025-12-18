import React, { useEffect, useCallback } from "react";
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
import { CCard, CCardBody, CCardHeader, CSpinner, CAlert } from "@coreui/react";
import { FaFloppyDisk } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

import { LoadingSpinner } from "src/components/common";
import type { Language } from "src/types";
import State from "./State";
import type { AnnouncementItem } from "./DYouthAnnouncementsService";
import AnnounceCard from "./AnnounceCard";
import NewAnnouncementCard from "./NewAnnouncementCard";

const DYouthAnnouncements: React.FC = observer(() => {
  const { t } = useTranslation("pages/dyouth-announcements");
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    State.loadAnnouncements();

    const dispose = reaction(
      () => State.language,
      () => {
        State.loadAnnouncements();
      },
    );

    return () => {
      dispose();
    };
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      State.reorder(active.id as string, over.id as string);
    }
  }, []);

  const handleAddNew = useCallback((data: AnnouncementItem) => {
    State.push(data);
  }, []);

  const handleSaveItem = useCallback((id: string, data: AnnouncementItem) => {
    State.updateById(id, data);
  }, []);

  const handleDelete = useCallback((id: string) => {
    State.removeById(id);
  }, []);

  const handleSave = useCallback(async () => {
    await State.saveAnnouncements();
  }, []);

  useEffect(() => {
    return () => {
      State.removeData();
    };
}, []);

  return (
    <div className="px-2 sm:px-4 lg:px-6">
      <div className="sm:flex sm:items-center mb-4">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t("sidebar.dyouthAnnouncements", { ns: "common" })}
          </h1>
          <p className="mt-2 text-sm text-gray-700">{t("description")}</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex gap-2">
          <select
            value={State.language}
            onChange={(e) => State.setLanguage(e.target.value as Language)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="uk">{t("language.uk", { ns: "common" })}</option>
            <option value="en">{t("language.en", { ns: "common" })}</option>
          </select>
          <button
            onClick={handleSave}
            disabled={State.isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {State.isSaving ? (
              <>
                <CSpinner size="sm" className="mr-2" />
                <span>{t("saving", { ns: "common" })}</span>
              </>
            ) : (
              <>
                <FaFloppyDisk className="mr-2" />
                <span>{t("save", { ns: "common" })}</span>
              </>
            )}
          </button>
        </div>
      </div>
      {State.saveSuccess && (
        <CAlert color="success" className="mb-4">
          {t("savedSuccessfully", { ns: "common" })}
        </CAlert>
      )}
      {State.saveError && (
        <CAlert color="danger" className="mb-4">
          {State.saveError}
        </CAlert>
      )}
      <CCard className="shadow-lg border-0">
        <CCardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">{t("list")}</h3>
          </div>
        </CCardHeader>
        <CCardBody className="p-4" style={{ overflow: "visible" }}>
          {State.isLoading && (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          )}
          {!State.isLoading && (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={(State.data || []).map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <div style={{ overflow: "visible" }}>
                  {(State.data || []).map((item) => (
                    <AnnounceCard
                      key={item.id}
                      item={item}
                      onSave={handleSaveItem}
                      onDelete={handleDelete}
                    />
                  ))}
                  <NewAnnouncementCard onSave={handleAddNew} onCancel={() => {}} />
                </div>
              </SortableContext>
            </DndContext>
          )}
        </CCardBody>
      </CCard>
      )
    </div>
  );
});

export default DYouthAnnouncements;
