import React, { useEffect, useCallback, useState } from "react";
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
import { CCard, CCardBody, CCardHeader, CAlert, CButton } from "@coreui/react";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa6";

import type { AnnouncementItem } from "src/services/DYouthAnnouncementsService";

import { LoadingSpinner } from "src/components/common";
import type { Language } from "src/types";
import State from "./State";
import AnnounceCard from "./AnnounceCard";
import NewAnnouncementCard from "./NewAnnouncementCard";
import Preview from "./Preview";

const DYouthAnnouncements: React.FC = observer(() => {
  const { t } = useTranslation("pages/d-youth-announcements");
  const [showPreview, setShowPreview] = useState(false);
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
      State.reorderAndSave(active.id as string, over.id as string);
    }
  }, []);

  const handleAddNew = useCallback((data: AnnouncementItem) => {
    State.pushAndSave(data);
  }, []);

  const handleSaveItem = useCallback((id: string, data: AnnouncementItem) => {
    State.updateByIdAndSave(id, data);
  }, []);

  const handleDelete = useCallback((id: string) => {
    console.log("handleDelete", id);
    State.removeByIdAndSave(id);
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
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <div className="flex flex-col">
            <label htmlFor="announcements-language" className="block text-sm font-medium text-gray-700 mb-2">
              {t("languageLabel")}
            </label>
            <select
              id="announcements-language"
              value={State.language}
              onChange={(e) => State.setLanguage(e.target.value as Language)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 cursor-pointer hover:border-gray-400 transition-colors"
            >
              <option value="uk">{t("language.uk", { ns: "common" })}</option>
              <option value="en">{t("language.en", { ns: "common" })}</option>
            </select>
          </div>
        </div>
      </div>
      {State.saveError && (
        <CAlert color="danger" className="mb-4">
          {State.saveError}
        </CAlert>
      )}
      <CCard className="shadow-lg border-0">
        <CCardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">{t("list")}</h3>
            <CButton
              color="primary"
              variant="outline"
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 leading-none"
            >
              <FaEye className="w-4 h-4 flex-shrink-0" />
              Preview
            </CButton>
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
      <Preview
        announcements={State.data || []}
        language={State.language}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
});

export default DYouthAnnouncements;
