import React, { useState } from "react";
import parse from "html-react-parser";
import clsx from "clsx";
import type { AnnouncementItem } from "src/services/DYouthAnnouncementsService";
import { StarCircleIcon, TriangleDown, TriangleUp } from "./icons";
import style from "./style.module.scss";

export const AnnounceItem: React.FC<{ data: AnnouncementItem }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mb-2">
      <div
        className="absolute left-0 top-0 z-10 transition-transform duration-500"
        style={{
          transform: `translate(-50%, -50%) ${
            isOpen ? "rotate(35deg)" : "rotate(0deg)"
          }`,
        }}
      >
        <StarCircleIcon size={20} />
      </div>

      <div className="accordion-corner-cut relative w-full overflow-visible bg-white">
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
              <div className={clsx("prose prose-sm max-w-none", style.content)}>
                {parse(data.body)}
              </div>
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
};

