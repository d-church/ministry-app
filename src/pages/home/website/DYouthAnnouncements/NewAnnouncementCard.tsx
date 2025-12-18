import React, { useState, Suspense } from "react";
import { CCard, CCardBody, CSpinner } from "@coreui/react";
import { FaPlus, FaCheck, FaXmark } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import type { AnnouncementItem } from "src/services/DYouthAnnouncementsService";
import HTMLEditor from "src/components/HTMLEditor";

interface NewAnnouncementCardProps {
  onSave: (data: AnnouncementItem) => void;
  onCancel: () => void;
}

const NewAnnouncementCard: React.FC<NewAnnouncementCardProps> = ({ onSave, onCancel }) => {
  const { t } = useTranslation("pages/dyouth-announcements");
  const [formData, setFormData] = useState<AnnouncementItem>({
    id: "",
    title: "",
    body: "",
    editorMode: "VISUAL",
  });
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    if (!formData.title.trim()) {
      setError(t("announcements.titleRequired"));
      return;
    }
    const dataWithId: AnnouncementItem = {
      ...formData,
      id: formData.id || crypto.randomUUID(),
    };
    onSave(dataWithId);
    setFormData({ id: "", title: "", body: "", editorMode: "VISUAL" });
    setError(null);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setFormData({ id: "", title: "", body: "", editorMode: "VISUAL" });
    setError(null);
    setIsOpen(false);
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

  if (!isOpen) {
    return (
      <div className="mb-3">
        <CCard className="shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
          <CCardBody className="p-4">
            <button
              onClick={() => setIsOpen(true)}
              className="w-full text-left text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
              <FaPlus />
              <span>{t("announcements.addNew")}</span>
            </button>
          </CCardBody>
        </CCard>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <CCard className="shadow-sm border-2 border-blue-500">
        <CCardBody className="p-3" style={{ overflow: "visible" }}>
          <form onClick={handleFormClick}>
            <div className="mb-2">
              <label className="block text-sm font-semibold mb-1">
                {t("announcements.title")} *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  <div className="flex justify-center items-center p-2" style={{ minHeight: "150px" }}>
                    <CSpinner size="sm" />
                  </div>
                }
              >
                <HTMLEditor
                  value={formData.body || ""}
                  onChange={(value) => setFormData({ ...formData, body: value })}
                  hasError={false}
                  initialMode={formData.editorMode || "VISUAL"}
                  onModeChange={(mode) => setFormData({ ...formData, editorMode: mode })}
                />
              </Suspense>
            </div>

            <div className="mb-2 border-t pt-2">
              <label className="block text-sm font-semibold mb-2">
                {t("announcements.button")}
              </label>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {t("announcements.buttonTitle")}
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.button?.title || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        button: {
                          ...formData.button,
                          title: e.target.value,
                          url: formData.button?.url || "",
                        },
                      })
                    }
                    placeholder={t("announcements.buttonTitlePlaceholder")}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {t("announcements.buttonUrl")}
                  </label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.button?.url || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        button: {
                          ...formData.button,
                          title: formData.button?.title || "",
                          url: e.target.value,
                        },
                      })
                    }
                    placeholder={t("announcements.buttonUrlPlaceholder")}
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
                onClick={handleCancel}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                <FaXmark className="mr-1" />
                <span>{t("cancel", { ns: "common" })}</span>
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <FaCheck className="mr-1" />
                <span>{t("announcements.add")}</span>
              </button>
            </div>
          </form>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default NewAnnouncementCard;
