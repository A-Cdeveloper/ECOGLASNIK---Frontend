import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUrlParams } from "../../hooks/useUrlParams";
import { Problem } from "../../types";
import AddProblemBanner from "./AddProblemBanner";
import Form from "./forms/Form";
import useAddNewProblem from "./hooks/useAddNewProblem";
import { useCategories } from "./hooks/useCategories";

const ProblemForm = () => {
  const { mapLat, mapLng } = useUrlParams();
  const [file, setFile] = useState<File | null>(null);
  const { status, mutate } = useAddNewProblem();
  const { categories } = useCategories();

  const isLoading = status === "pending";

  if (!mapLat || !mapLng) {
    return <AddProblemBanner />;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
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

    const newProblem: Problem = {
      id: uuidv4(),
      title,
      description,
      cat_id,
      position: {
        lat: mapLat,
        lng: mapLng,
      },
      uid: 1,
      createdAt: new Date(), // new Date(),
      updatedAt: null,
      image: file?.name || "",
      status: "active",
    };

    mutate(newProblem);
  };

  return (
    <>
      <Form
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
        categories={categories}
        isLoading={isLoading}
      />
    </>
  );
};

export default ProblemForm;
