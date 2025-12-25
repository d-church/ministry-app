import React, { useState } from "react";
import { CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";
import type { AnnouncementItem } from "src/services/DYouthAnnouncementsService";
import { StarCircleIcon, TriangleDown, TriangleUp } from "./icons";
import style from "./style.module.scss";

interface PreviewProps {
  announcements: AnnouncementItem[];
  language: "uk" | "en";
  isOpen: boolean;
  onClose: () => void;
}

function AnnounceItem({ data }: { data: AnnouncementItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mb-2">
      <div
        className="absolute left-0 top-0 z-10 transition-transform duration-500"
        style={{
          transform: `translate(-50%, -50%) ${isOpen ? "rotate(35deg)" : "rotate(0deg)"}`,
        }}
      >
        <StarCircleIcon size={20} />
      </div>

      <div className={`${style.accordionCornerCut} relative w-full overflow-visible bg-white`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-0 flex w-full items-center justify-between bg-white px-4 py-3 text-left transition-all hover:bg-gray-50 sm:px-6 sm:py-4 lg:py-5"
          style={{ fontFamily: "var(--font-manrope), 'Manrope', sans-serif" }}
        >
          <span
            className="text-base font-semibold uppercase tracking-wide sm:text-lg lg:text-xl"
            style={{ fontWeight: 600, color: "#731cfe" }}
          >
            {data.title}
          </span>
          {isOpen ? (
            <TriangleUp size={24} className="flex-shrink-0" />
          ) : (
            <TriangleDown size={24} className="flex-shrink-0" />
          )}
        </button>
        {isOpen && (
          <div
            className="px-4 pb-3 text-sm leading-relaxed text-gray-700 sm:px-6 sm:pb-4 sm:text-base lg:pb-5 lg:text-lg"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
            }}
          >
            <div className="space-y-4">
              <div
                className={`prose prose-sm max-w-none ${style.content}`}
                dangerouslySetInnerHTML={{ __html: data.body || "" }}
              />
              {data.button && data.button.title && data.button.url && (
                <a
                  href={data.button.url}
                  className="inline-block rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-all hover:bg-purple-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.button.title}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Preview: React.FC<PreviewProps> = ({ announcements, language, isOpen, onClose }) => {
  return (
    <CModal visible={isOpen} onClose={onClose} size="xl" className={`preview-modal ${style.previewContainer}`} fullscreen>
      <CModalHeader className="border-b border-gray-200">
        <CModalTitle>Preview</CModalTitle>
      </CModalHeader>
      <CModalBody className="p-0 overflow-auto" style={{ maxHeight: "calc(100vh - 120px)" }}>
        <div
          className="relative min-h-[600px] overflow-hidden"
          style={{
            background: "#1a1a1a",
            fontFamily: "var(--font-manrope), 'Manrope', sans-serif",
          }}
        >
          {/* Background */}
          <div
            className="absolute inset-0 h-full w-full opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="container relative z-10 mx-auto max-w-4xl px-12 py-8 sm:px-12 md:py-12 lg:max-w-5xl lg:px-16 xl:max-w-6xl xl:px-20">
            {/* Header */}
            <div className="mb-10 px-3">
              <h1
                className="mb-4 text-7xl font-bold leading-none tracking-tight text-white md:text-7xl lg:text-8xl xl:text-9xl"
                style={{
                  fontFamily: "var(--font-manrope), 'Manrope', sans-serif",
                  fontWeight: 600,
                }}
              >
                {language === "uk" ? (
                  <>
                    ОГОЛО
                    <br className="sm:hidden" />
                    ШЕННЯ
                  </>
                ) : (
                  <span className="block text-6xl md:text-6xl lg:text-7xl xl:text-8xl">
                    AN
                    <br className="sm:hidden" />
                    NOUNCE
                    <br className="sm:hidden" />
                    MENTS
                  </span>
                )}
              </h1>
            </div>

            {/* Accordions */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-5 xl:space-y-6">
              {announcements && announcements.length > 0 ? (
                announcements.map((announcement: AnnouncementItem) => (
                  <AnnounceItem key={announcement.id} data={announcement} />
                ))
              ) : (
                <div className="py-8 text-center text-white">
                  <p>{language === "uk" ? "Немає анонсів" : "No announcements"}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CModalBody>
    </CModal>
  );
};

export default Preview;

