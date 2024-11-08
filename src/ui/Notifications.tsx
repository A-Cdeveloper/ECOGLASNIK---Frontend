import { Toaster } from "react-hot-toast";

const Notifications = () => {
  return (
    <Toaster
      position="top-center"
      gutter={3}
      containerStyle={{
        right: 0,
        top: 10,
      }}
      toastOptions={{
        className: "toaststyle",
        success: {
          duration: 5000,
        },
        error: {
          duration: 5000,
        },
      }}
    />
  );
};

export default Notifications;
