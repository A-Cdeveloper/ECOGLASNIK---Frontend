import { getErrorMessage } from "../utils/helpers";

const AuthNotification = ({
  state,
  message,
}: {
  state: string;
  message: string;
}) => {
  return (
    <p
      className={`${
        state === "success" ? "text-success-100" : "text-danger-100"
      } my-2 whitespace-pre-wrap text-center text-[14px]`}
      data-testid="auth-notification"
    >
      {getErrorMessage(message)}
    </p>
  );
};

export default AuthNotification;
