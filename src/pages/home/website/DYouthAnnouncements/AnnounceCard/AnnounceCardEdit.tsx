import React, { Suspense } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import type { AnnouncementItem } from "src/services/DYouthAnnouncementsService";
import HTMLEditor from "src/components/HTMLEditor";

const AnnounceCardEdit: React.FC<{
  item: AnnouncementItem;
  formData: AnnouncementItem;
  error: string | null;
  dragStyle: React.CSSProperties;
  onFormDataChange: (data: AnnouncementItem) => void;
  onSave: () => void;
  onCancel: () => void;
  onFormClick: (e: React.MouseEvent) => void;
}> = ({ formData, error, dragStyle, onFormDataChange, onSave, onCancel, onFormClick }) => {
  const { t } = useTranslation("pages/d-youth-announcements");
  return (
    <div style={dragStyle} className="mb-3">
      <div className="rounded-lg border-2 border-blue-500 bg-white shadow-sm">
        <div className="p-3" style={{ overflow: "visible" }}>
          <form onClick={onFormClick}>
            <div className="mb-2">
              <label className="block text-sm font-semibold mb-1">
                {t("announcements.title")} *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.title}
                onChange={(e) => onFormDataChange({ ...formData, title: e.target.value })}
                placeholder={t("announcements.titlePlaceholder")}
                autoFocus
              />
            </div>

            <div className="mb-2" style={{ overflow: "visible" }}>
              <label className="block text-sm font-semibold mb-1">
                {t("announcements.content")} *
              </label>
              <Suspense
                fallback={
                  <div
                    className="flex justify-center items-center p-2"
                    style={{ minHeight: "150px" }}
                  >
                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent text-blue-500" />
                  </div>
                }
              >
                <HTMLEditor
                  value={formData.body}
                  onChange={(value) => onFormDataChange({ ...formData, body: value })}
                  hasError={false}
                  initialMode={formData.editorMode || "VISUAL"}
                  onModeChange={(mode) => onFormDataChange({ ...formData, editorMode: mode })}
                />
              </Suspense>
            </div>

            <div className="mb-2 border-t pt-2">
              <label className="block text-sm font-semibold mb-2">
                {t("announcements.button", { ns: "pages/d-youth-announcements" })}
              </label>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {t("announcements.buttonTitle", { ns: "pages/d-youth-announcements" })}
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.button?.title || ""}
                    onChange={(e) =>
                      onFormDataChange({
                        ...formData,
                        button: {
                          ...formData.button,
                          title: e.target.value,
                          url: formData.button?.url || "",
                        },
                      })
                    }
                    placeholder={t("announcements.buttonTitlePlaceholder", {
                      ns: "pages/d-youth-announcements",
                    })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {t("announcements.buttonUrl", { ns: "pages/d-youth-announcements" })}
                  </label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.button?.url || ""}
                    onChange={(e) =>
                      onFormDataChange({
                        ...formData,
                        button: {
                          ...formData.button,
                          title: formData.button?.title || "",
                          url: e.target.value,
                        },
                      })
                    }
                    placeholder={t("announcements.buttonUrlPlaceholder", {
                      ns: "pages/d-youth-announcements",
                    })}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-2 py-2 px-3 bg-red-50 border border-red-200 text-red-700 rounded">
                <small>{error}</small>
              </div>
            )}

            <div className="flex gap-2 justify-end mt-2 relative z-10">
              <button
                type="button"
                onClick={onCancel}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#f4f4f5] text-[#18181B] rounded-md hover:bg-[#e4e4e7] transition-colors"
              >
                <FaXmark className="mr-1" />
                <span>{t("cancel", { ns: "common" })}</span>
              </button>
              <button
                type="button"
                onClick={onSave}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#18181B] text-white rounded-md hover:bg-[#18181B]/90 transition-colors"
              >
                <FaCheck className="mr-1" />
                <span>{t("save", { ns: "common" })}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnnounceCardEdit;
