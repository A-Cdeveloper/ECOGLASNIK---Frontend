import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Problem } from "../../../types";
import Button from "../../../ui/Buttons/Button";
import Headline from "../../../ui/Headline";
import useAddNewProblem from "../hooks/useAddNewProblem";
import { useCategories } from "../hooks/useCategories";
import { useSingleProblem } from "../hooks/useSingleProblem";
import { useUrlParams } from "../../../hooks/useUrlParams";
import useUpdateProblem from "../hooks/useUpdateProblem";
import { useNavigate } from "react-router-dom";

const Form = ({
  editMode,
  problemId,
}: {
  editMode?: boolean;
  problemId?: string;
}) => {
  const { mapLat, mapLng } = useUrlParams();
  const [file, setFile] = useState<File | null>(null);
  const { status: addNewStatus, mutate: addNewProblemMutation } =
    useAddNewProblem();
  const { status: editProblemStatus, mutate: editProblemMutation } =
    useUpdateProblem();
  const { categories } = useCategories();
  const { problem } = useSingleProblem(problemId!);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const isLoadingAddNew = addNewStatus === "pending";
  const isLoadingEdit = editProblemStatus === "pending";

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const cat_id = Number(formData.get("cat_id")) as number;

    if (file) {
      formData.append("image", file);
    }

    if (editMode) {
      editProblemMutation(
        {
          ...problem!,
          title,
          description,
          cat_id,
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
        uid: 1,
        createdAt: new Date(), // new Date(),
        updatedAt: null,
        image: file?.name || "",
        status: "active",
      };

      addNewProblemMutation(newProblem);
    }
  };

  return (
    <>
      <Headline>
        {editMode ? "izmeni detalje problema" : "Prijavi problem"}
      </Headline>
      <form onSubmit={handleSubmit} className="space-y-2 my-4">
        <input
          type="text"
          placeholder="Naslov problema"
          name="title"
          aria-description="Unesi naslov problema"
          defaultValue={problem?.title}
          required
        />
        <select
          name="cat_id"
          aria-description="Izaberi kategoriju problema"
          value={category || problem?.cat_id}
          onChange={handleCategoryChange}
          required
        >
          <option>Izaberi kategoriju problema</option>
          {categories?.map((category) => (
            <option key={category.cat_id} value={category.cat_id}>
              {category.cat_name}
            </option>
          ))}
        </select>
        <textarea
          name="description"
          id="description"
          placeholder="Opis problema"
          className="h-[150px]"
          aria-description="Unesi opis problema"
          defaultValue={problem?.description}
          required
        ></textarea>
        {!editMode && (
          <input
            type="file"
            name="imageFile"
            id="image"
            accept="image/*"
            className="bg-transparent border-0 text-white"
            onChange={handleFileChange}
            aria-description="Dodaj sliku problema"
            defaultValue={problem?.image || ""}
            required
          />
        )}
        <div className="flex justify-end">
          <Button
            aria-label="Pošalji problem"
            variation="danger"
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

export default Form;
