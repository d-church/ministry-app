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
      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border-green-200">
        {t("ministries.active")}
      </span>
    ) : (
      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800 border-yellow-200">
        {t("ministries.pending")}
      </span>
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
              <span className="font-medium text-gray-700">
                {t(`ministries.names.${ministry.name}`)}
              </span>
              {getStatusBadge(ministry.status)}
            </div>
          ))}
          {ministries.length === 0 && <div className="text-gray-400">{t("ministries.empty")}</div>}
        </div>
      </div>
    </div>
  );
};

export default MinistriesCard;
