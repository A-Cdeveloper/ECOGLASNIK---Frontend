import useAuth from "../context/useAuth";
import Headline from "./Headline";

const SimulateAuthUser = () => {
  const { setSessionStorageData, removeSessionStorageData, isAuthenticated } =
    useAuth();

  console.log(isAuthenticated);
  return (
    <div
      className={`flex flex-wrap gap-3 ${
        isAuthenticated ? "bg-green" : "bg-red"
      } fixed end-0 top-[50vh] z-[99999999999999999999999999999999] p-5`}
    >
      <Headline level={1} className="w-full">
        {isAuthenticated ? "Loged in" : "Logged out"}
      </Headline>
      <button
        className="btn btn-primary"
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
        Login User
      </button>
      <button className="btn btn-primary" onClick={removeSessionStorageData}>
        Logoff User
      </button>
    </div>
  );
};

export default SimulateAuthUser;
