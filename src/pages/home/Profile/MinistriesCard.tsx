import { CBadge } from "@coreui/react";
import { FaUsers } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

interface Ministry {
  id: number;
  name: string;
  status: string;
}

const MinistriesCard = () => {
  const { t } = useTranslation("pages/profile");

  const ministries: Ministry[] = [
    { id: 1, name: "worship", status: "active" },
    { id: 2, name: "prayer", status: "pending" },
  ];

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <CBadge color="success" className="text-xs px-2 py-1">
        {t("ministries.active")}
      </CBadge>
    ) : (
      <CBadge color="warning" className="text-xs px-2 py-1">
        {t("ministries.pending")}
      </CBadge>
    );
  };

  return (
    <div className="flex-[2]">
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100 h-full">
        <div className="flex items-center gap-2 mb-4">
          <FaUsers className="text-gray-400 text-lg" />
          <span className="font-semibold text-gray-800 text-lg">{t("ministries.title")}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ministries.map((ministry) => (
            <div
              key={ministry.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col gap-2 shadow-sm"
            >
              <span className="font-medium text-gray-700">{t(`ministries.names.${ministry.name}`)}</span>
              {getStatusBadge(ministry.status)}
            </div>
          ))}
          {ministries.length === 0 && (
            <div className="text-gray-400">{t("ministries.empty")}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinistriesCard;
