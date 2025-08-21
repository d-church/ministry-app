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
  CAlert,
  CSpinner,
} from "@coreui/react";
import { FaUser, FaLock } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AccountStore from "../../stores/AccountStore";
import type { LoginCredentials } from "../../services/AuthService";

const Login = () => {
  const { t } = useTranslation("pages/login");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    setError("");

    try {
      await AccountStore.login(data);
      // Перенаправляємо на головну сторінку після успішного входу
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || t("errorMessage"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center px-3">
      <CContainer fluid className="px-2">
        <CRow className="justify-content-center">
          <CCol xs={12} sm={10} md={8} lg={6} xl={5} xxl={4}>
            <CCard className="p-2 p-sm-4 shadow-sm border-0">
              <CCardBody className="px-2 px-sm-4">
                <CForm onSubmit={handleSubmit(onSubmit)}>
                  <h1 className="text-center mb-3 fs-2 fs-sm-1">{t("title")}</h1>
                  <p className="text-body-secondary text-center mb-4">{t("subtitle")}</p>

                  {error && (
                    <CAlert color="danger" className="mb-3">
                      {error}
                    </CAlert>
                  )}

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <FaUser />
                    </CInputGroupText>
                    <CFormInput
                      placeholder={t("username")}
                      autoComplete="username"
                      type="email"
                      invalid={!!errors.email}
                      {...register("email", {
                        required: t("emailRequired") || "Email обов'язковий",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t("emailInvalid") || "Невірний формат email",
                        },
                      })}
                    />
                  </CInputGroup>
                  {errors.email && (
                    <div className="text-danger mb-2 small">{errors.email.message}</div>
                  )}

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <FaLock />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder={t("password")}
                      autoComplete="current-password"
                      invalid={!!errors.password}
                      {...register("password", {
                        required: t("passwordRequired") || "Пароль обов'язковий",
                        minLength: {
                          value: 6,
                          message: t("passwordMinLength") || "Мінімум 6 символів",
                        },
                      })}
                    />
                  </CInputGroup>
                  {errors.password && (
                    <div className="text-danger mb-3 small">{errors.password.message}</div>
                  )}

                  <CRow className="g-2">
                    <CCol xs={12} sm={6}>
                      <CButton
                        color="primary"
                        className="w-100 py-2"
                        type="submit"
                        disabled={isLoading}
                        size="lg"
                      >
                        {isLoading ? (
                          <>
                            <CSpinner size="sm" className="me-2" />
                            {t("loggingIn") || "Вхід..."}
                          </>
                        ) : (
                          t("loginButton")
                        )}
                      </CButton>
                    </CCol>
                    <CCol xs={12} sm={6} className="text-center text-sm-end">
                      <CButton color="link" className="px-0 py-2 w-100 w-sm-auto">
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
