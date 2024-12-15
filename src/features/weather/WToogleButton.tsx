import React from "react";

const WToogleButton = ({
  onToogleWeater,
  children,
}: {
  onToogleWeater: () => void;
  children: React.ReactNode;
}) => {
  return (
    <span
      className="bg-turquoise-900 absolute top-[-27px]  px-2 py-[4px] cursor-pointer text-[13px]"
      onClick={onToogleWeater}
    >
      {children}
    </span>
  );
};

export default WToogleButton;
