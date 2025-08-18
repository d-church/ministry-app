import { Link } from "react-router-dom";
import { CButton, CContainer } from "@coreui/react";
import { useTranslation } from "react-i18next";

const Page404 = () => {
  const { t } = useTranslation("pages/404");

  return (
    <div className="d-flex align-items-center justify-content-center min-h-[80vh]">
      <CContainer>
        <div className="text-center">
          <h1 className="display-1 fw-light text-muted mb-4">{t("title")}</h1>
          <h2 className="h4 fw-normal mb-4">{t("heading")}</h2>
          <p className="text-muted mb-4">{t("description")}</p>
          <Link to="/" className="text-decoration-none">
            <CButton color="primary" variant="outline">
              {t("backHome")}
            </CButton>
          </Link>
        </div>
      </CContainer>
    </div>
  );
};

export default Page404;
