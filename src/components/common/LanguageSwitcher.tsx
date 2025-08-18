import React from "react";
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from "@coreui/react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getCurrentLanguageLabel = () => {
    return t(`language.${i18n.language}`);
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle className="nav-link">
        {getCurrentLanguageLabel()}
      </CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem
          onClick={() => changeLanguage("uk")}
          active={i18n.language === "uk"}
        >
          {t("language.uk")}
        </CDropdownItem>
        <CDropdownItem
          onClick={() => changeLanguage("en")}
          active={i18n.language === "en"}
        >
          {t("language.en")}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default LanguageSwitcher;
