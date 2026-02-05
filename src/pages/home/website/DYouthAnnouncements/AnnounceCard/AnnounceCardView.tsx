import React from "react";
import { useTranslation } from "react-i18next";
import type { AnnouncementItem } from "src/services/DYouthAnnouncementsService";

const AnnounceCardView: React.FC<{
  item: AnnouncementItem;
  onDeleteClick: () => void;
  dragAttributes: any;
  dragListeners: any;
  dragStyle: React.CSSProperties;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
}> = ({
  item,
  onDeleteClick,
  dragAttributes,
  dragListeners,
  dragStyle,
  onMouseDown,
  onMouseUp,
}) => {
  const { t } = useTranslation("common");
  return (
    <div
      style={dragStyle}
      className="mb-3"
      {...dragAttributes}
      {...dragListeners}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div className="rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h4>
              <div
                className="text-sm text-gray-600 mb-2 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: item.body || "" }}
              />
            </div>
            <div
              className="flex gap-2"
              data-delete-container
              onMouseDown={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                data-delete-button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onDeleteClick();
                }}
                className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnounceCardView;
