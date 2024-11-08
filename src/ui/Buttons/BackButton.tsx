import { useNavigate } from "react-router-dom";

const BackButton = ({ to = "/" }: { to?: string }) => {
  const navigate = useNavigate();
  return (
    <div className="mb-4 border-b-1 border-secondary/20">
      <button onClick={() => navigate(to)}> ← Nazad</button>
    </div>
  );
};

export default BackButton;
