import { use, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { useSingleProblem } from "../hooks/useSingleProblem";
import { useUrlParams } from "../../../hooks/useUrlParams";

import { v4 as uuidv4 } from "uuid";
import { getErrorMessage } from "../../../utils/helpers";
import { Problem, ProblemOfficialEmail, User } from "../../../types";

import PromptModal from "../../../ui/PromtsAndNotifications/PromptModal";
import RestrictAccess from "../../../ui/RestrictAccess";
import Input from "../../../ui/Form/Input";
import TextArea from "../../../ui/Form/TextArea";
import Select from "../../../ui/Form/Select";
import ProblemImageArea from "./ProblemImageArea";

import Button from "../../../ui/Buttons/Button";
import Headline from "../../../ui/Headline";
import useAddEditProblem from "../hooks/useAddEditProblem";
import Organisations from "../Organisations";
import Checkbox from "../../../ui/Form/Checkbox";
import { TranslationContext } from "../../../context/translationContext";

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
    category: problem?.cat_id || 1,
    file: problem?.image ? null : (null as File | null),
    touchForm: false,
  });

  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");
  const [currentImagePinataId, setCurrentImagePinataId] = useState<string>("");

  const { t } = use(TranslationContext);

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

  const catOrganisations = useMemo(() => {
    return (
      (categories &&
        categories?.find((cat) => cat.cat_id === formState.category)
          ?.organisations) ||
      []
    );
  }, [categories, formState.category]);

  if (editMode && user?.uid !== problem?.uid) {
    return <RestrictAccess />;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const cat_id = Number(formData.get("cat_id")) as number;
    const officialEmail = formData.get("officialEmail") as ProblemOfficialEmail;

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
        status: "ACTIVE",
        officialEmail: officialEmail || "NONE",
      };
      addNewProblemMutation(newProblem, {
        onSuccess: () => {
          return navigate(`/`);
        },
      });
    }
  };

  return (
    <>
      <Headline>
        {editMode ? t("problems.edit.headline") : t("problems.add.headline")}
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
          placeholder={t("problems.formular.title")}
          name="title"
          aria-description={t("problems.formular.title")}
          defaultValue={problem?.title}
          onChange={handleInputChange}
        />
        <Select
          name="cat_id"
          aria-description={t("problems.formular.category-aria")}
          value={formState.category}
          onChange={handleCategoryChange}
          options={categories!}
          disabled={editMode}
        />

        {categories && <Organisations organisations={catOrganisations || []} />}
        <TextArea
          placeholder={t("problems.formular.description")}
          name="description"
          aria-description={t("problems.formular.description-aria")}
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
        {!editMode && (
          <>
            <Checkbox
              id={1}
              name="officialEmail"
              label={t("problems.formular.official_email ")}
            />
          </>
        )}
        <div className="flex justify-between border-t border-secondary-500/30 pt-3">
          <Button
            aria-label={t("problems.formular.cancel")}
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
            aria-label={t("problems.formular.send_add")}
            variation="info"
            size="small"
            disabled={isLoadingAddNew || isLoadingEdit || !formState.touchForm}
          >
            {!editMode &&
              (isLoadingAddNew
                ? t("problems.formular.send_add_loading")
                : t("problems.formular.send_add"))}
            {editMode &&
              (isLoadingEdit
                ? t("problems.formular.send_edit_loading")
                : t("problems.formular.send_edit"))}
          </Button>
        </div>
      </form>
    </>
  );
};

export default FormAddEditProblem;
