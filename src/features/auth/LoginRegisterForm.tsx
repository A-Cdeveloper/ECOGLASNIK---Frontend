import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import AuthNotification from "../../ui/AuthNotification";
import Button from "../../ui/Buttons/Button";
import ButtonIcon from "../../ui/Buttons/ButtonIcon";
import Input from "../../ui/Form/Input";
import Headline from "../../ui/Headline";
import useLogin from "./hooks/useLogin";
import useRegister from "./hooks/useRegister";

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
            onSuccess: () => navigate("/", { replace: true }),
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
        {isLoginMode ? "Login" : "Kreiraj nalog"}
      </Headline>
      <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
        {!isLoginMode && (
          <>
            <Input
              name="firstname"
              value={formFields.firstname}
              placeholder="Ime*"
              onChange={handleInputChange}
            />
            <Input
              name="lastName"
              value={formFields.lastName}
              placeholder="Prezime*"
              onChange={handleInputChange}
            />
            <Input
              name="phone"
              value={formFields.phone}
              placeholder="Telefon"
              onChange={handleInputChange}
            />
          </>
        )}

        <Input
          name="email"
          type="email"
          value={formFields.email}
          placeholder="Email*"
          onChange={handleInputChange}
        />

        <div className="relative">
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formFields.password}
            placeholder="Lozinka*"
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

        {!isLoginMode && (
          <div className="relative">
            <Input
              name="passwordAgain"
              type={showPasswordAgain ? "text" : "password"}
              value={formFields.passwordAgain}
              placeholder="Potvrdi lozinku*"
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
              <p className="text-rose-400 my-[3px] text-[12px]">
                Lozinke se ne podudaraju.
              </p>
            )}
          </div>
        )}

        <Button
          size="large"
          variation="info"
          style={{ width: "100%" }}
          disabled={
            !isPasswordValid ||
            loginUserStatus === "pending" ||
            registerUserStatus === "pending"
          }
        >
          {isLoginMode
            ? loginUserStatus === "pending"
              ? "Prijava..."
              : "Prijavi se"
            : registerUserStatus === "pending"
            ? "Registracija..."
            : "Registruj nalog"}
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
              <Link to="forgot-password">Zaboravljena lozinka?</Link>
            </p>
          )}

          <p className="text-secondary text-center">
            {isLoginMode
              ? "Nemate nalog? Registrujte se "
              : "Imate nalog? Ulogujte se "}
            <Link
              to={`/login/?mode=${isLoginMode ? "register" : "login"}`}
              className="text-winter"
            >
              OVDE
            </Link>
            .
          </p>
        </div>
      </form>
    </>
  );
}

export default LoginRegisterForm;
