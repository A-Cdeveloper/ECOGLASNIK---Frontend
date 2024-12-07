import { Toaster } from "react-hot-toast";

const Notifications = () => {
  return (
    <Toaster
      position="bottom-right"
      gutter={3}
      containerStyle={{
        right: 10,
        top: 10,
        zIndex: 999999,
      }}
      toastOptions={{
        className: "toaststyle",
        success: {
          duration: 3000,
        },
        error: {
          duration: 4000,
        },
      }}
    />
  );
};

export default Notifications;
