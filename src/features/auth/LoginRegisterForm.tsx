import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Buttons/Button";
import ButtonIcon from "../../ui/Buttons/ButtonIcon";
import Input from "../../ui/Form/Input";
import Headline from "../../ui/Headline";
import useLogin from "./hooks/useLogin";
import useRegister from "./hooks/useRegister";

function LoginRegisterForm({ mode }: { mode: string }) {
  const { status: loginUserStatus, mutate: loginUser } = useLogin();
  const { status: registerUserStatus, mutate: registerUser } = useRegister();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //
  const [firstname, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  //
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const isLoginMode = mode === "login";
  const isPasswordValid = !isLoginMode ? password === passwordAgain : true;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isLoginMode) {
      if (!email || !password) return;
      loginUser(
        { email, password },
        {
          onSettled: () => {
            setEmail("");
            setPassword("");
          },
          onSuccess: () => {
            navigate("/", { replace: true });
          },
        }
      );
    } else {
      if (!firstname || !lastName || !email || !password) return;
      registerUser(
        { firstname, lastname: lastName, phone, email, password },
        {
          onSettled: () => {
            setFirstname("");
            setLastName("");
            setPhone("");
            setEmail("");
            setPassword("");
            setPasswordAgain("");
          },
          onSuccess: () => {
            navigate("/", { replace: true });
          },
        }
      );
    }
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
              type="firstname"
              value={firstname}
              placeholder="Ime*"
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <Input
              type="lastname"
              value={lastName}
              placeholder="Prezime*"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <Input
              type="phone"
              value={phone}
              placeholder="Telefon"
              onChange={(e) => setPhone(e.target.value)}
            />
          </>
        )}

        <Input
          type="email"
          value={email}
          placeholder="Email*"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Lozinka*"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <ButtonIcon
            icon={showPassword ? <HiEyeSlash /> : <HiEye />}
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
          />
        </div>
        {!isLoginMode && (
          <>
            <div className="relative">
              <Input
                type={showPasswordAgain ? "text" : "password"}
                value={passwordAgain}
                placeholder="Potvrdi lozinku*"
                onChange={(e) => setPasswordAgain(e.target.value)}
              />
              <ButtonIcon
                icon={showPasswordAgain ? <HiEyeSlash /> : <HiEye />}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPasswordAgain(!showPasswordAgain);
                }}
              />
              {!isPasswordValid && passwordAgain !== "" ? (
                <p className="text-rose-400 my-[3px]">Password don't match.</p>
              ) : (
                ""
              )}
            </div>
          </>
        )}

        <Button
          size="large"
          style={{ width: "100%" }}
          disabled={!isPasswordValid}
        >
          {isLoginMode
            ? loginUserStatus === "pending"
              ? "Prijava..."
              : "Prijavi se"
            : registerUserStatus === "pending"
            ? "Registracija..."
            : "Registuj nalog"}
        </Button>
        {isLoginMode && (
          <>
            <p className="text-secondary text-center">
              <Link to="forgot-password">Zaboravljena lozinka?</Link>
            </p>
          </>
        )}
        <p className="text-secondary text-center">
          {isLoginMode
            ? "Nemate nalog? Regstrujte se "
            : "Imate nalog? Ulogujte se "}
          <Link
            to={`/login/?mode=${isLoginMode ? "register" : "login"}`}
            className="text-winter"
          >
            OVDE
          </Link>
          .
        </p>
      </form>
    </>
  );
}

export default LoginRegisterForm;
