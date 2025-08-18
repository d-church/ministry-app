import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import { FaUser, FaLock } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation("pages/login");

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <h1>{t("title")}</h1>
                  <p className="text-body-secondary">{t("subtitle")}</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <FaUser />
                    </CInputGroupText>
                    <CFormInput placeholder={t("username")} autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <FaLock />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder={t("password")}
                      autoComplete="current-password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton color="primary" className="px-4">
                        {t("loginButton")}
                      </CButton>
                    </CCol>
                    <CCol xs={6} className="text-right">
                      <CButton color="link" className="px-0">
                        {t("forgotPassword")}
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
