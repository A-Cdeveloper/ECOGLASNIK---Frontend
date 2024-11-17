import { useRef } from "react";
import Button from "../../ui/Buttons/Button";
import Input from "../../ui/Form/Input";
import useForgotPassword from "./hooks/useForgotPassword";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const { status, forgotPassword } = useForgotPassword();
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const isLoading = status === "pending";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPassword(
      { email: emailRef.current!.value },
      {
        // TODO oN SUCCESS
        onSettled: () => {
          emailRef.current!.value = "";
          navigate("/login/?mode=login");
        },
      }
    );
  };

  return (
    <>
      <p className="text-start w-[90%] mb-2">
        Unestite email adresu Vašeg naloga:
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
        <Input
          type="email"
          placeholder="Email"
          name="email"
          ref={emailRef}
          required
        />
        <Button size="large" style={{ width: "100%" }} disabled={isLoading}>
          {isLoading ? "Slanje zahteva..." : "Poslati Zahtev za lozinku"}
        </Button>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
