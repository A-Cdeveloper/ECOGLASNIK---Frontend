import { createContext } from "react";
import Headline from "../Headline";

type PromptContextType = null;

const PromptContext = createContext<PromptContextType>(null);

const PromptLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PromptContext.Provider value={null}>
      <div className="promptModalBackDrop">
        <div className="bg-primary-500 px-5 pt-3 pb-5 rounded-md flex flex-col justify-start items-center border-secondary-100 border-[1px]">
          {children}
        </div>
      </div>
    </PromptContext.Provider>
  );
};

const Header = ({ title }: { title: string }) => {
  return <Headline level={2}>{title}</Headline>;
};

const IntroText = ({ intro }: { intro: string }) => {
  return <p>{intro}</p>;
};

const Buttons = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-4 space-x-4">{children}</div>;
};

PromptLayout.Header = Header;
PromptLayout.IntroText = IntroText;
PromptLayout.Buttons = Buttons;

export default PromptLayout;
