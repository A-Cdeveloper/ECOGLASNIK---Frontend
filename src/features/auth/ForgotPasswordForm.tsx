import { use, useRef } from "react";
import AuthNotification from "../../ui/AuthNotification";
import Button from "../../ui/Buttons/Button";
import Input from "../../ui/Form/Input";
import useForgotPassword from "./hooks/useForgotPassword";
import { TranslationContext } from "../../context/translationContext";

const ForgotPasswordForm = () => {
  const { t } = use(TranslationContext);
  const {
    status: forgotPasswordStatus,
    mutate: forgotPassword,
    error: forgotPasswordError,
    data,
  } = useForgotPassword();
  const emailRef = useRef<HTMLInputElement>(null);

  const isLoading = forgotPasswordStatus === "pending";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPassword(
      { email: emailRef.current!.value },
      {
        onSettled: () => {
          emailRef.current!.value = "";
        },
      }
    );
  };

  if (data) {
    return <AuthNotification state="success" message={data.message} />;
  }

  return (
    <>
      <p className="text-start w-[90%] mb-2">
        {t("forgotPassword.user_notice")}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
        <Input
          type="email"
          placeholder={t("forgotPassword.email")}
          name="email"
          ref={emailRef}
        />
        <Button
          size="large"
          style={{ width: "100%" }}
          disabled={isLoading}
          variation="info"
        >
          {isLoading
            ? t("forgotPassword.button_loading")
            : t("forgotPassword.button_text")}
        </Button>
      </form>
      {forgotPasswordError && (
        <AuthNotification state="error" message={forgotPasswordError.message} />
      )}
    </>
  );
};

export default ForgotPasswordForm;
