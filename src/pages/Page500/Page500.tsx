import { Link } from "react-router-dom";
import { CButton, CContainer } from "@coreui/react";
import { useTranslation } from "react-i18next";

const Page500 = () => {
  const { t } = useTranslation("pages/500");

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <CContainer>
        <div className="text-center">
          <h1 className="display-1 fw-light text-muted mb-4">{t("title")}</h1>
          <h2 className="h4 fw-normal mb-4">{t("heading")}</h2>
          <p className="text-muted mb-4">
            {t("description")}
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/" className="text-decoration-none">
              <CButton color="primary" variant="outline">
                {t("home")}
              </CButton>
            </Link>
            <CButton
              color="secondary"
              variant="outline"
              onClick={() => window.location.reload()}
            >
              {t("refresh")}
            </CButton>
          </div>
        </div>
      </CContainer>
    </div>
  );
};

export default Page500;
