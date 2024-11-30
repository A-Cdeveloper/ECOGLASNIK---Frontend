import { useCallback, useRef, useState } from "react";
import Button from "../../ui/Buttons/Button";
import Input from "../../ui/Form/Input";
import useForgotPassword from "./hooks/useForgotPassword";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import ButtonIcon from "../../ui/Buttons/ButtonIcon";

const ResetPasswordForm = () => {
  const { status, forgotPassword } = useForgotPassword();
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const isLoading = status === "pending";

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
      <p className="text-start w-[90%] mb-2">Postavi novu lozinku:</p>
      <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
        <div className="relative">
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formFields.password}
            placeholder="Nova lozinka*"
            onChange={handleInputChange}
            required
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
            placeholder="Potvrdi novu lozinku*"
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
            <p className="text-rose-400 my-[3px]">Lozinke se ne podudaraju</p>
          )}
        </div>
        <Button size="large" style={{ width: "100%" }} disabled={isLoading}>
          {isLoading ? "Slanje zahteva..." : "Sačuvaj lozinku"}
        </Button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
