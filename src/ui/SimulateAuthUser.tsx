import useAuth from "../context/useAuth";
import Headline from "./Headline";

const SimulateAuthUser = () => {
  const { setSessionStorageData, removeSessionStorageData, isAuthenticated } =
    useAuth();

  return (
    <div
      className={`flex flex-wrap gap-3 ${
        isAuthenticated ? "bg-green" : "bg-red"
      } fixed end-0 bottom-[5vh] z-[99999999999999999999999999999999] p-5 w-[250px]`}
    >
      <Headline level={1} className="w-full">
        {isAuthenticated ? "Loged in" : "Logged out"}
      </Headline>
      <button
        className="btn btn-primary w-full"
        onClick={() =>
          setSessionStorageData({
            user: {
              uid: 1,
              firstname: "Aleksandar",
              lastname: "Cvetkovic",
              phone: "123456789",
              email: "aleksandar.cvetkovic@gmailcom",
              password: "123456789",
              accessToken: "123456789",
              refreshToken: "123456789",
              createdAt: new Date(),
            },
          })
        }
      >
        Login User Aleksandar
      </button>
      <button
        className="btn btn-primary w-full"
        onClick={() =>
          setSessionStorageData({
            user: {
              uid: 2,
              firstname: "Biljana",
              lastname: "Vuckovic",
              phone: "123456789",
              email: "biljana.vuckovic@gmailcom",
              password: "123456789",
              accessToken: "123456789",
              refreshToken: "123456789",
              createdAt: new Date(),
            },
          })
        }
      >
        Login User Biljana
      </button>
      <button
        className="btn btn-primary w-full"
        onClick={removeSessionStorageData}
      >
        Logoff User
      </button>
    </div>
  );
};

export default SimulateAuthUser;
