import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { useSingleProblem } from "../hooks/useSingleProblem";
import { useUrlParams } from "../../../hooks/useUrlParams";

import { v4 as uuidv4 } from "uuid";
import { getErrorMessage } from "../../../utils/helpers";
import { Problem, User } from "../../../types";

import PromptModal from "../../../ui/PromtsAndNotifications/PromptModal";
import RestrictAccess from "../../../ui/RestrictAccess";
import Input from "../../../ui/Form/Input";
import TextArea from "../../../ui/Form/TextArea";
import Select from "../../../ui/Form/Select";
import ProblemImageArea from "./ProblemImageArea";

import Button from "../../../ui/Buttons/Button";
import Headline from "../../../ui/Headline";
import useAddEditProblem from "../hooks/useAddEditProblem";

export type FormStateType = {
  category: number;
  file: File | null;
  touchForm: boolean;
};

const FormAddEditProblem = ({
  editMode,
  problemId,
  user,
}: {
  editMode?: boolean;
  problemId?: string;
  user: User | null;
}) => {
  const { mapLat, mapLng } = useUrlParams();
  const {
    status: addNewStatus,
    mutate: addNewProblemMutation,
    error: addNewProblemError,
  } = useAddEditProblem("add");
  const {
    status: editProblemStatus,
    mutate: editProblemMutation,
    error: editProblemError,
  } = useAddEditProblem("edit");

  const { categories } = useCategories();
  const { problem } = useSingleProblem(problemId || "");

  const [formState, setFormState] = useState<FormStateType>({
    category: problem?.cat_id || 0,
    file: problem?.image ? null : (null as File | null),
    touchForm: false,
  });

  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");
  const [currentImagePinataId, setCurrentImagePinataId] = useState<string>("");

  const uploadImageLoading = !!currentImageUrl;

  useEffect(() => {
    setCurrentImageUrl(problem?.image || "");
    setCurrentImagePinataId(problem?.pinata_id || "");
  }, [problem?.image, problem?.pinata_id]);

  const navigate = useNavigate();

  const isLoadingAddNew = addNewStatus === "pending";
  const isLoadingEdit = editProblemStatus === "pending";

  const handleInputChange = useCallback(() => {
    setFormState((prev) => ({ ...prev, touchForm: true }));
  }, []);

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFormState((prev) => ({
        ...prev,
        touchForm: true,
        category: +e.target.value,
      }));
    },
    []
  );

  if (editMode && user?.uid !== problem?.uid) {
    return <RestrictAccess />;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const cat_id = Number(formData.get("cat_id")) as number;

    if (editMode) {
      editProblemMutation(
        {
          ...problem!,
          title,
          description,
          cat_id,
          image: currentImageUrl,
          pinata_id: currentImagePinataId,
        },
        {
          onSuccess: () => {
            navigate(`/problems/user/${user?.uid}`);
          },
        }
      );
    } else {
      const newProblem: Problem = {
        id: uuidv4(),
        title,
        description,
        cat_id,
        position: {
          lat: mapLat!,
          lng: mapLng!,
        },
        uid: user!.uid,
        createdAt: new Date(), // new Date(),
        updatedAt: null,
        image: currentImageUrl,
        pinata_id: currentImagePinataId,
        status: "active",
      };

      addNewProblemMutation(newProblem, {
        onSuccess: () => {
          return navigate(`/problems/user/${user?.uid}`);
        },
      });
      //console.log(newProblem);
    }
  };

  return (
    <>
      <Headline>
        {editMode ? "izmeni detalje problema" : "Prijavi problem"}
      </Headline>

      <PromptModal
        formStatus={formState.touchForm && !isLoadingAddNew && !isLoadingEdit}
      />

      {addNewProblemError && (addNewProblemError || !uploadImageLoading) && (
        <p className="text-rose-400 mt-0 whitespace-pre-wrap">
          {getErrorMessage(addNewProblemError.message)}
        </p>
      )}

      {editProblemError && (editProblemError || !uploadImageLoading) && (
        <p className="text-rose-400 mt-0 whitespace-pre-wrap">
          {getErrorMessage(editProblemError?.message)}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-2 my-4">
        <Input
          placeholder="Naslov problema"
          name="title"
          aria-description="Unesi naslov problema"
          defaultValue={problem?.title}
          onChange={handleInputChange}
        />
        <Select
          name="cat_id"
          aria-description="Izaberi kategoriju problema"
          value={formState.category}
          onChange={handleCategoryChange}
          options={categories!}
        />
        <TextArea
          placeholder="Opis problema"
          name="description"
          aria-description="Unesi opis problema"
          defaultValue={problem?.description}
          onChange={handleInputChange}
          className="h-[80px] lg:h-[200px]"
        />

        <ProblemImageArea
          problem={problem!}
          setFormState={setFormState}
          currentImageUrl={currentImageUrl}
          setCurrentImageUrl={setCurrentImageUrl}
          setCurrentImagePinataId={setCurrentImagePinataId}
        />

        <div className="flex justify-between border-t border-secondary-500/30 pt-3">
          <Button
            aria-label="Odustani"
            variation="danger"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Odustani
          </Button>
          <Button
            aria-label="Pošalji problem"
            variation="info"
            size="small"
            disabled={isLoadingAddNew || isLoadingEdit || !formState.touchForm}
          >
            {!editMode && (isLoadingAddNew ? "Slanje..." : "Prijavi problem")}
            {editMode && (isLoadingEdit ? "Izmena..." : "Izmeni problem")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default FormAddEditProblem;
