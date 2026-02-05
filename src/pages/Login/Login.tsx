import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AccountStore from "../../store/AccountStore";
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
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || t("errorMessage"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="rounded-lg border bg-white shadow-sm w-full max-w-md">
        {/* Card header */}
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-2xl font-bold text-center">{t("title")}</h2>
          <p className="text-sm text-gray-500 text-center">{t("subtitle")}</p>
        </div>

        {/* Card body */}
        <div className="p-6 pt-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t("username")}
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                placeholder={t("username")}
                className={`h-10 w-full rounded-md border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
                {...register("email", {
                  required: t("emailRequired") || "Email обов'язковий",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t("emailInvalid") || "Невірний формат email",
                  },
                })}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t("password")}
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder={t("password")}
                className={`h-10 w-full rounded-md border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
                {...register("password", {
                  required: t("passwordRequired") || "Пароль обов'язковий",
                  minLength: {
                    value: 6,
                    message: t("passwordMinLength") || "Мінімум 6 символів",
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="h-10 w-full rounded-md bg-[#18181B] text-white text-sm font-medium hover:bg-[#18181B]/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  {t("loggingIn") || "Вхід..."}
                </span>
              ) : (
                t("loginButton")
              )}
            </button>

            <div className="mt-3 text-center">
              <button
                type="button"
                className="text-sm text-[#18181B] underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                {t("forgotPassword")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
