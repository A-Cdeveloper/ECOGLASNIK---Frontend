import { useCallback } from "react";
import { Problem } from "../../../types";
import CloseButton from "../../../ui/Buttons/CloseButton";
import { FormStateType } from "./FormAddEditProblem";

import useUploadImageProblem from "../hooks/useUploadImageProblem";
import MiniSpinner from "../../../ui/MiniSpinner";

const ProblemImageArea = ({
  problem,
  setFormState,
  currentImageUrl,
  setCurrentImageUrl,
  setCurrentImagePinataId,
}: {
  problem: Problem;
  setFormState: React.Dispatch<React.SetStateAction<FormStateType>>;
  currentImageUrl: string;
  setCurrentImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setCurrentImagePinataId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { status: uploadImageStatus, mutateAsync: uploadImageMutation } =
    useUploadImageProblem();

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];

      if (selectedFile) {
        setFormState((prev) => ({
          ...prev,
          file: selectedFile,
          touchForm: true,
        }));
      }

      const data = await uploadImageMutation(selectedFile as File);

      setCurrentImageUrl(data.imageUrl);
      setCurrentImagePinataId(data.pinata_id);
    },
    [
      setCurrentImagePinataId,
      setCurrentImageUrl,
      setFormState,
      uploadImageMutation,
    ]
  );

  const handleRemoveImage = useCallback(() => {
    setCurrentImageUrl("");
    setCurrentImagePinataId("");
    setFormState((prev) => ({
      ...prev,
      touchForm: true,
    }));
  }, [setCurrentImagePinataId, setCurrentImageUrl, setFormState]);

  const isLoadingUploadImage = uploadImageStatus === "pending";

  if (isLoadingUploadImage) {
    return (
      <div className="w-full h-full flex justify-center items-center gap-4 py-3">
        <MiniSpinner />
        Slika se uploaduje...
      </div>
    );
  }

  return (
    <>
      {currentImageUrl && (
        <div className="relative">
          <CloseButton onClick={handleRemoveImage} />
          <div className="w-full h-auto overflow-hidden my-4 mx-auto">
            <img
              src={currentImageUrl}
              alt={problem?.title}
              className="my-4 border-double border-4 border-secondary/50 object-cover position-center"
            />
          </div>
        </div>
      )}
      {!currentImageUrl && (
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
        </>
      )}
    </>
  );
};

export default ProblemImageArea;
