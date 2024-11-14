import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../ui/Form/Input";
import Button from "../../ui/Buttons/Button";
import Headline from "../../ui/Headline";
import ButtonIcon from "../../ui/Buttons/ButtonIcon";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { set } from "date-fns";

// import useLogin from "./useLogin";

function LoginRegisterForm({ mode }: { mode: string }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //
  const [firstname, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  //
  const [showPassword, setShowPassword] = useState(false);

  const isLoginMode = mode === "login";

  //const { isLoginLoading, login } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    console.log(email, password);

    // login(
    //   { username, password },
    //   {
    //     onSettled: () => {
    //       setUsername("");
    //       setPassword("");
    //     },
    //     onSuccess: () => {
    //       navigate("/", { replace: true });
    //     },
    //   }
    // );
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
              placeholder="Ime"
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <Input
              type="lastname"
              value={lastName}
              placeholder="Prezime"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <Input
              type="phone"
              value={phone}
              placeholder="Telefon"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </>
        )}

        <Input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Lozinka"
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
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={confirmpassword}
              placeholder="Potvrdi lozinku"
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
            <ButtonIcon
              icon={showPassword ? <HiEyeSlash /> : <HiEye />}
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            />
          </div>
        )}

        <Button
          size="large"
          style={{ width: "100%" }}
          // variation={!isLoginLoading ? "primary" : "disabled"}
        >
          {/* {!isLoginLoading ? (
              "Login"
            ) : (
              <>
                Working... <SpinnerMini />
              </>
            )} */}
          {isLoginMode ? "Prijavi se" : "Kreiraj nalog"}
        </Button>
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
