import { useState } from "react";
import { Problem } from "../../../types";
import CloseButton from "../../../ui/Buttons/CloseButton";

const ProblemImageArea = ({
  problem,
  setFile,
  setTouchForm,
  showError,
}: {
  problem: Problem;
  setFile: (file: File) => void;
  setTouchForm: (value: boolean) => void;
  showError: boolean;
}) => {
  const [currentImage, setCurrentImage] = useState<string | null>(
    problem?.image
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setTouchForm(true);
    }
    //TODO
    console.log("upload image to server");
  };

  return (
    <>
      {currentImage && (
        <div className="relative">
          <CloseButton
            onClick={() => {
              setCurrentImage(null);
              setTouchForm(true);
            }}
          />
          <img
            src={`/public/${currentImage}`}
            alt={problem?.title}
            className="my-4 border-double border-4 border-secondary/50"
          />
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
            <p className="text-rose-400 mt-1 text-end">
              Fotografija je obavezna!
            </p>
          )}
        </>
      )}
    </>
  );
};

export default ProblemImageArea;
