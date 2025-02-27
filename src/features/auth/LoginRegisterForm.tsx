import { ChangeEvent, FormEvent, use, useCallback, useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import AuthNotification from "../../ui/AuthNotification";
import Button from "../../ui/Buttons/Button";
import ButtonIcon from "../../ui/Buttons/ButtonIcon";
import Input from "../../ui/Form/Input";
import Headline from "../../ui/Headline";
import useLogin from "./hooks/useLogin";
import useRegister from "./hooks/useRegister";
import { TranslationContext } from "../../context/translationContext";

type FormFields = {
  email: string;
  password: string;
  firstname?: string;
  lastName?: string;
  phone?: string;
  passwordAgain?: string;
};

function LoginRegisterForm({ mode }: { mode: string }) {
  const navigate = useNavigate();
  const { t } = use(TranslationContext);
  const {
    status: loginUserStatus,
    mutate: loginUser,
    error: errorLogin,
  } = useLogin();
  const {
    status: registerUserStatus,
    mutate: registerUser,
    error: errorRegister,
    data: dataRegister,
  } = useRegister();

  const [formFields, setFormFields] = useState<FormFields>({
    email: "",
    password: "",
    firstname: "",
    lastName: "",
    phone: "",
    passwordAgain: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const isLoginMode = mode === "login";
  const isPasswordValid =
    isLoginMode || formFields.password === formFields.passwordAgain;

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isLoginMode) {
        loginUser(
          { email: formFields.email, password: formFields.password },
          {
            onSettled: () => {},
            onSuccess: () => navigate("/problems/add", { replace: true }),
          }
        );
      } else {
        registerUser(
          {
            firstname: formFields.firstname as string,
            lastname: formFields.lastName as string,
            phone: formFields.phone,
            email: formFields.email,
            password: formFields.password,
          },
          {
            onSuccess: () => {
              setFormFields({
                ...formFields,
                email: "",
                password: "",
                phone: "",
                firstname: "",
                lastName: "",
              });
            },
          }
        );
      }
    },
    [formFields, isLoginMode, loginUser, registerUser, navigate]
  );

  if (dataRegister) {
    return <AuthNotification state="success" message={dataRegister.message} />;
  }

  return (
    <>
      <Headline level={2} className="w-[90%] mb-3 uppercase font-semibold">
        {isLoginMode ? t("login.title") : t("register.title")}
      </Headline>
      {!isLoginMode && (
        <p className=" text-[12px] w-[90%] mb-2 block ">
          {t("register.user_notice")}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
        {!isLoginMode && (
          <>
            <Input
              name="firstname"
              value={formFields.firstname}
              placeholder={t("registerFields.first_name")}
              onChange={handleInputChange}
            />
            <Input
              name="lastName"
              value={formFields.lastName}
              placeholder={t("registerFields.last_name")}
              onChange={handleInputChange}
            />
            <Input
              name="phone"
              value={formFields.phone}
              placeholder={t("registerFields.phone")}
              onChange={handleInputChange}
            />
          </>
        )}

        <Input
          name="email"
          type="email"
          value={formFields.email}
          placeholder={t("loginFields.email")}
          onChange={handleInputChange}
          data-testid="email"
        />

        <div className="relative">
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formFields.password}
            placeholder={t("loginFields.password")}
            onChange={handleInputChange}
            data-testid="password"
          />
          <ButtonIcon
            type="button"
            icon={showPassword ? <HiEyeSlash /> : <HiEye />}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={(e) => {
              e.preventDefault();
              setShowPassword((prev) => !prev);
            }}
          />
        </div>

        {!isLoginMode && (
          <div className="relative">
            <Input
              name="passwordAgain"
              type={showPasswordAgain ? "text" : "password"}
              value={formFields.passwordAgain}
              placeholder={t("registerFields.password_again")}
              onChange={handleInputChange}
            />
            <ButtonIcon
              type="button"
              icon={showPasswordAgain ? <HiEyeSlash /> : <HiEye />}
              onClick={(e) => {
                e.preventDefault();
                setShowPasswordAgain((prev) => !prev);
              }}
            />
            {!isPasswordValid && formFields.passwordAgain && (
              <p className="text-rose-400 my-[3px] text-[12px]">
                {t("register.password_mismatch")}
              </p>
            )}
          </div>
        )}

        <Button
          size="large"
          variation="info"
          style={{ width: "100%" }}
          data-testid="submit-button"
          disabled={
            !isPasswordValid ||
            loginUserStatus === "pending" ||
            registerUserStatus === "pending"
          }
        >
          {isLoginMode
            ? loginUserStatus === "pending"
              ? t("login.button_loading")
              : t("login.button_text")
            : registerUserStatus === "pending"
            ? t("register.button_loading")
            : t("register.button_text")}
        </Button>

        {errorLogin && isLoginMode && (
          <AuthNotification state="error" message={errorLogin.message} />
        )}

        {errorRegister && !isLoginMode && (
          <AuthNotification state="error" message={errorRegister.message} />
        )}

        <div>
          {isLoginMode && (
            <p className="text-secondary text-center">
              <Link to="forgot-password">{t("login.lost_password_text")}</Link>
            </p>
          )}

          <p className="text-secondary text-center">
            {isLoginMode
              ? t("login.noaccount_text")
              : t("register.haveaccount_text")}
            <Link
              to={`/login/?mode=${isLoginMode ? "register" : "login"}`}
              className="text-winter"
            >
              {t(`login.switch_link_text`)}
            </Link>
            .
          </p>
        </div>
      </form>
    </>
  );
}

export default LoginRegisterForm;
