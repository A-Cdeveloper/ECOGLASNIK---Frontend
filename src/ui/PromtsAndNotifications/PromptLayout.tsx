const PromptLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="promptModal">
      <div className="bg-primary p-5 rounded-md flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default PromptLayout;
