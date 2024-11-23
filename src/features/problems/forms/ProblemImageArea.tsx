import { useCallback, useState } from "react";
import { Problem } from "../../../types";
import CloseButton from "../../../ui/Buttons/CloseButton";
import { FormStateType } from "./FormAddEditProblem";

const ProblemImageArea = ({
  problem,
  formState,
  setFormState,
}: {
  problem: Problem;
  formState: FormStateType;
  setFormState: React.Dispatch<React.SetStateAction<FormStateType>>;
}) => {
  const [currentImage, setCurrentImage] = useState<string | null>(
    problem?.image
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];

      if (selectedFile) {
        setFormState((prev) => ({
          ...prev,
          file: selectedFile,
          touchForm: true,
        }));
      }
      //TODO Consider replacing with an actual image upload logic
      console.log("upload image to server");
    },
    [setFormState]
  );

  const handleRemoveImage = useCallback(() => {
    setCurrentImage(null);
    setFormState((prev) => ({
      ...prev,
      touchForm: true,
    }));
  }, [setFormState]);

  return (
    <>
      {currentImage && (
        <div className="relative">
          <CloseButton onClick={handleRemoveImage} />
          <img
            src={`/${currentImage}`}
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
            name="imageProblem"
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

          {formState.showError && (
            <p className="text-rose-400 mt-2 mb-0">Fotografija je obavezna!</p>
          )}
        </>
      )}
    </>
  );
};

export default ProblemImageArea;
