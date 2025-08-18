import React from "react";
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from "@coreui/react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation("common");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getCurrentLanguageWithFlag = () => {
    // TODO: move to constants
    return i18n.language === "uk" ? "🇺🇦" : "🇺🇸";
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle className="nav-link text-3xl">
        {getCurrentLanguageWithFlag()}
      </CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem
          onClick={() => changeLanguage("uk")}
          className="cursor-pointer"
          active={i18n.language === "uk"}
        >
          🇺🇦 {t("language.uk")}
        </CDropdownItem>
        <CDropdownItem
          onClick={() => changeLanguage("en")}
          className="cursor-pointer"
          active={i18n.language === "en"}
        >
          🇺🇸 {t("language.en")}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default LanguageSwitcher;
