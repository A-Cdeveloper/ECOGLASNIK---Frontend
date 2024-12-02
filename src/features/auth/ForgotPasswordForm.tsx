import { useRef } from "react";
import AuthNotification from "../../ui/AuthNotification";
import Button from "../../ui/Buttons/Button";
import Input from "../../ui/Form/Input";
import useForgotPassword from "./hooks/useForgotPassword";

const ForgotPasswordForm = () => {
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
        Unestite email adresu Vašeg naloga:
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
        <Input type="email" placeholder="Email" name="email" ref={emailRef} />
        <Button size="large" style={{ width: "100%" }} disabled={isLoading}>
          {isLoading ? "Slanje zahteva..." : "Poslalji zahtev za novu lozinku"}
        </Button>
      </form>
      {forgotPasswordError && (
        <AuthNotification state="error" message={forgotPasswordError.message} />
      )}
    </>
  );
};

export default ForgotPasswordForm;
