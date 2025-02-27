import { use, useCallback, useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { useUrlParams } from "../../hooks/useUrlParams";
import AuthNotification from "../../ui/AuthNotification";
import Button from "../../ui/Buttons/Button";
import ButtonIcon from "../../ui/Buttons/ButtonIcon";
import Input from "../../ui/Form/Input";
import useResetPassword from "./hooks/useResetPassword";
import { TranslationContext } from "../../context/translationContext";

const ResetPasswordForm = () => {
  const { t } = use(TranslationContext);
  const {
    status: resetPasswordStatus,
    mutate: resetPassword,
    data,
    error,
  } = useResetPassword();
  const { token: verificationCode } = useUrlParams();

  const isLoading = resetPasswordStatus === "pending";

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const [formFields, setFormFields] = useState<{ [key: string]: string }>({
    password: "",
    passwordAgain: "",
  });

  const isPasswordValid = formFields.password === formFields.passwordAgain;

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormFields((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword({
      password: formFields.password,
      verificationCode: verificationCode || "",
    });
  };

  if (data) {
    return <AuthNotification state="success" message={data.message} />;
  }

  return (
    <>
      <p className="text-start w-[90%] mb-2">
        {t("resetPassword.user_notice")}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
        <div className="relative">
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formFields.password}
            placeholder={t("resetPassword.password")}
            onChange={handleInputChange}
          />
          <ButtonIcon
            icon={showPassword ? <HiEyeSlash /> : <HiEye />}
            onClick={(e) => {
              e.preventDefault();
              setShowPassword((prev) => !prev);
            }}
          />
        </div>
        <div className="relative">
          <Input
            name="passwordAgain"
            type={showPasswordAgain ? "text" : "password"}
            value={formFields.passwordAgain}
            placeholder={t("resetPassword.password_again")}
            onChange={handleInputChange}
          />
          <ButtonIcon
            icon={showPasswordAgain ? <HiEyeSlash /> : <HiEye />}
            onClick={(e) => {
              e.preventDefault();
              setShowPasswordAgain((prev) => !prev);
            }}
          />
          {!isPasswordValid && formFields.passwordAgain && (
            <p className="text-rose-400 my-[3px]">
              {t("resetPassword.password_mismatch")}
            </p>
          )}
        </div>
        <Button
          size="large"
          style={{ width: "100%" }}
          disabled={!isPasswordValid || resetPasswordStatus === "pending"}
          variation="info"
        >
          {isLoading
            ? t("resetPassword.button_loading")
            : t("resetPassword.button_text")}
        </Button>
        {error && <AuthNotification state="error" message={error.message} />}
      </form>
    </>
  );
};

export default ResetPasswordForm;
