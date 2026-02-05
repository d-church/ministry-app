import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation("common");

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">
        {t("language.label", { defaultValue: "Language" })}
      </span>
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="text-sm border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-700 cursor-pointer hover:border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="uk">🇺🇦 {t("language.uk")}</option>
        <option value="en">🇺🇸 {t("language.en")}</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
