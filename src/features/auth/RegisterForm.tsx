import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../ui/Form/Input";
import Button from "../../ui/Buttons/Button";
import Headline from "../../ui/Headline";

// import useLogin from "./useLogin";

function RegisterForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //const { isLoginLoading, login } = useLogin();

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     //if (!username || !password) return;

  //     login(
  //       { username, password },
  //       {
  //         onSettled: () => {
  //           setUsername("");
  //           setPassword("");
  //         },
  //         onSuccess: () => {
  //           navigate("/", { replace: true });
  //         },
  //       }
  //     );
  //   }

  return (
    <>
      <Headline level={2} className="self-start mb-3 uppercase font-semibold">
        rEGISTRUJ nALOG
      </Headline>
      <form onSubmit={() => {}}>
        <Input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <ButtonIcon
              icon={showPassword ? <HiEyeSlash /> : <HiEye />}
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            /> */}
        </>

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
          Kreiraj nalog
        </Button>
        <p className="text-secondary text-center">
          Već imate nalog? Ulogujte se{" "}
          <Link to="/login/?mode=login" className="text-winter">
            OVDE
          </Link>
          .
        </p>
      </form>
    </>
  );
}

export default RegisterForm;
