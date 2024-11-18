import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Problem, User } from "../../../types";
import Button from "../../../ui/Buttons/Button";
import Headline from "../../../ui/Headline";
import useAddNewProblem from "../hooks/useAddNewProblem";
import { useCategories } from "../hooks/useCategories";
import { useSingleProblem } from "../hooks/useSingleProblem";
import { useUrlParams } from "../../../hooks/useUrlParams";
import useUpdateProblem from "../hooks/useUpdateProblem";
import { useNavigate } from "react-router-dom";
import PromptModal from "../../../ui/PromptModal";
import RestrictAccess from "../../../ui/RestrictAccess";
import Input from "../../../ui/Form/Input";
import TextArea from "../../../ui/Form/TextArea";
import Select from "../../../ui/Form/Select";
import ProblemImageArea from "./ProblemImageArea";

export type FormStateType = {
  category: number;
  file: File | null;
  touchForm: boolean;
  showError: boolean;
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
  const { status: addNewStatus, mutate: addNewProblemMutation } =
    useAddNewProblem();
  const { status: editProblemStatus, mutate: editProblemMutation } =
    useUpdateProblem();
  const { categories } = useCategories();
  const { problem } = useSingleProblem(problemId || "");

  const [formState, setFormState] = useState<FormStateType>({
    category: problem?.cat_id || 0,
    file: problem?.image ? null : (null as File | null),
    touchForm: false,
    showError: false,
  });

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
    const imageProblem = formData.get("imageProblem") as File | null;

    if (formState.file) {
      formData.append("image", formState.file);
    }

    if (imageProblem?.size === 0) {
      setFormState((prev) => ({
        ...prev,
        showError: true,
      }));
      return;
    }

    if (editMode) {
      editProblemMutation(
        {
          ...problem!,
          title,
          description,
          cat_id,
          image: formState?.file?.name || "",
        },
        {
          onSuccess: () => {
            navigate(
              `/problems/${problem?.id}/?lat=${problem?.position.lat}&lng=${problem?.position.lng}`
            );
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
        image: formState.file?.name || "",
        status: "active",
      };

      addNewProblemMutation(newProblem, {
        onSuccess: () => {
          return navigate(`/problems/user/${user?.uid}}`);
        },
      });
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

      <form onSubmit={handleSubmit} className="space-y-2 my-4">
        <Input
          placeholder="Naslov problema"
          name="title"
          aria-description="Unesi naslov problema"
          defaultValue={problem?.title}
          onChange={handleInputChange}
          required
        />
        <Select
          name="cat_id"
          aria-description="Izaberi kategoriju problema"
          value={formState.category}
          onChange={handleCategoryChange}
          options={categories!}
          required
        />
        <TextArea
          placeholder="Opis problema"
          name="description"
          aria-description="Unesi opis problema"
          defaultValue={problem?.description}
          onChange={handleInputChange}
          required
          className="h-[200px]"
        />

        <ProblemImageArea
          problem={problem!}
          formState={formState}
          setFormState={setFormState}
        />

        <div className="flex justify-end">
          <Button
            aria-label="Pošalji problem"
            variation="success"
            size="medium"
            disabled={isLoadingAddNew}
          >
            {!editMode && (isLoadingAddNew ? "Slanje..." : "Prijavi")}
            {editMode && (isLoadingEdit ? "Izmena..." : "Izmeni")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default FormAddEditProblem;
