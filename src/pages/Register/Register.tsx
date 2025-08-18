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
} from '@coreui/react'
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'

const Register = () => {
  const { t } = useTranslation("pages/register");

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>{t("title")}</h1>
                  <p className="text-body-secondary">{t("subtitle")}</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <FaUser />
                    </CInputGroupText>
                    <CFormInput placeholder={t("username")} autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <FaEnvelope />
                    </CInputGroupText>
                    <CFormInput placeholder={t("email")} autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <FaLock />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder={t("password")}
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <FaLock />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder={t("repeatPassword")}
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success">{t("createAccount")}</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
