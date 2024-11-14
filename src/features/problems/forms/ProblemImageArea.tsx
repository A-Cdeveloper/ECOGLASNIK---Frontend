import { useState } from "react";
import { Problem } from "../../../types";

const ProblemImageArea = ({
  problem,
  setFile,
  showError,
}: {
  problem: Problem;
  setFile: (file: File) => void;
  showError: boolean;
}) => {
  const [currentImage, setCurrentImage] = useState<string | null>(
    problem?.image
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }

    console.log("upload image to server");
  };

  return (
    <>
      {currentImage && (
        <div className="relative">
          <span
            className="block bg-red text-white px-2 py-1 absolute top-0 right-0 cursor-pointer"
            onClick={() => setCurrentImage(null)}
          >
            CLEAR
          </span>
          <img src={`/public/${currentImage}`} alt={problem?.title} />
        </div>
      )}
      {!currentImage && (
        <>
          <input
            type="file"
            accept="image/*"
            id="image"
            aria-description="Problem slika"
            onChange={handleFileChange}
            className="hidden"
          />

          <label
            htmlFor="image"
            className="w-full relative h-9 cursor-pointer border-dashed border-1 border-secondary flex justify-center items-center  text-secondary hover:text-winter"
          >
            Dodaj fotografiju
          </label>

          {showError && (
            <p className="text-red mt-1">Fotografija je obavezna!</p>
          )}
        </>
      )}
    </>
  );
};

export default ProblemImageArea;
