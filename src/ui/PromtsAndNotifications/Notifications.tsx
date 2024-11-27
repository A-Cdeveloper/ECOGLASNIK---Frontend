import { Toaster } from "react-hot-toast";

const Notifications = () => {
  return (
    <Toaster
      position="bottom-center"
      gutter={3}
      containerStyle={{
        right: 0,
        top: 10,
      }}
      toastOptions={{
        className: "toaststyle",
        success: {
          duration: 4000,
        },
        error: {
          duration: 4000,
        },
      }}
    />
  );
};

export default Notifications;
