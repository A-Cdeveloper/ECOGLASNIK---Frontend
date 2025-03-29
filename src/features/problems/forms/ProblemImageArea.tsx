import { use, useCallback } from "react";
import { Problem } from "../../../types";
import CloseButton from "../../../ui/Buttons/CloseButton";
import { FormStateType } from "./FormAddEditProblem";

import useUploadImageProblem from "../hooks/useUploadImageProblem";
import MiniSpinner from "../../../ui/MiniSpinner";
import ProblemImage from "../ProblemImage";
import { getErrorMessage } from "../../../utils/helpers";
import { TranslationContext } from "../../../context/translationContext";

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
  const {
    status: uploadImageStatus,
    mutateAsync: uploadImageMutation,
    progress,
    error,
  } = useUploadImageProblem();

  const { t } = use(TranslationContext);

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
      <div className="w-full h-full flex justify-center flex-wrap items-center gap-4 py-3 ">
        <MiniSpinner />
        {progress !== 100 ? (
          <>
            {t("problems.formular.add_image_loading")}
            <div className="relative h-2 bg-gray-200 rounded-md w-3/4 md:w-1/3">
              <div
                className="absolute top-0 left-0 h-2 bg-warrning-500 rounded-md"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-[12px] ms-1 block">{progress}%</span>
          </>
        ) : (
          <span>{t("problems.formular.add_image_pending")}</span>
        )}
      </div>
    );
  }

  return (
    <>
      {currentImageUrl && (
        <div className="relative">
          <CloseButton onClick={handleRemoveImage} />

          <ProblemImage
            image={currentImageUrl}
            alt={problem?.title}
            className="w-full h-auto overflow-hidden my-4 mx-auto border-double border-4 border-secondary-100"
          />
        </div>
      )}
      {!currentImageUrl && (
        <>
          <p className="text-[12px] text-secondary-100 leading-[15px]">
            {t("problems.formular.add_image_required")}
            <br />
            {t("problems.formular.add_image_explination")}
          </p>
          <input
            type="file"
            accept="image/*"
            id="image"
            name="imageProblem"
            aria-description={t("problems.formular.add_image")}
            onChange={handleFileChange}
            className="hidden"
          />

          <label
            htmlFor="image"
            className="w-full relative h-9 cursor-pointer border-dashed border-1 border-secondary flex justify-center items-center  text-secondary hover:text-winter"
          >
            {t("problems.formular.add_image")}
          </label>
          {error?.message && (
            <p className="text-rose-400 mt-0 whitespace-pre-wrap">
              {getErrorMessage(error?.message)}
            </p>
          )}
        </>
      )}
    </>
  );
};

export default ProblemImageArea;
