import React, { useEffect, useCallback, useState, Suspense } from "react";
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
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa6";

import type { AnnouncementItem } from "src/services/DYouthAnnouncementsService";

import { LoadingSpinner } from "src/components/common";
import type { Language } from "src/types";
import State from "./State";
import AnnounceCard from "./AnnounceCard";
import NewAnnouncementCard from "./NewAnnouncementCard";

const Preview = React.lazy(() => import("./Preview"));

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
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {t("sidebar.dyouthAnnouncements", { ns: "common" })}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{t("description")}</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Language selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="announcements-language" className="text-sm font-medium text-gray-700">
              {t("languageLabel")}
            </label>
            <select
              id="announcements-language"
              value={State.language}
              onChange={(e) => State.setLanguage(e.target.value as Language)}
              className="px-3 py-2 border border-gray-200 rounded-md bg-white text-sm text-gray-700 cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="uk">{t("language.uk", { ns: "common" })}</option>
              <option value="en">{t("language.en", { ns: "common" })}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save error alert */}
      {State.saveError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{State.saveError}</p>
        </div>
      )}

      {/* Card */}
      <div className="rounded-lg border bg-white shadow-sm">
        {/* Card header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-lg font-semibold text-gray-900">{t("list")}</h2>
          <button
            onClick={() => setShowPreview(true)}
            className="inline-flex items-center gap-2 px-3 h-9 border border-[#e4e4e7] rounded-md bg-white text-sm font-medium text-[#18181B] hover:bg-[#f4f4f5] transition-colors"
          >
            <FaEye className="w-4 h-4" />
            <span>Preview</span>
          </button>
        </div>

        {/* Card body */}
        <div className="p-6 pt-0" style={{ overflow: "visible" }}>
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
        </div>
      </div>

      {/* Preview modal (lazy) */}
      {showPreview && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent text-white" />
            </div>
          }
        >
          <Preview
            announcements={State.data || []}
            language={State.language}
            isOpen={showPreview}
            onClose={() => setShowPreview(false)}
          />
        </Suspense>
      )}
    </div>
  );
});

export default DYouthAnnouncements;
