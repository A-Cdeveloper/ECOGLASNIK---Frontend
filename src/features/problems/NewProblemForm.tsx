import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUrlParams } from "../../hooks/useUrlParams";
import Button from "../../ui/Buttons/Button";
import useAddNewProblem from "./hooks/useAddNewProblem";
import { useCategories } from "./hooks/useCategories";
import Headline from "../../ui/Headline";
import AddProblemBanner from "./AddProblemBanner";
import { Problem } from "../../types";

const NewProblemForm = () => {
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
      <Headline>Prijavi problem</Headline>
      <form onSubmit={handleSubmit} className="space-y-2 my-4">
        <input
          type="text"
          placeholder="Naslov problema"
          name="title"
          aria-description="Unesi naslov problema"
          required
        />
        <select
          name="cat_id"
          aria-description="Izaberi kategoriju problema"
          required
        >
          <option value="">Izaberi kategoriju problema</option>
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
          required
        ></textarea>
        <input
          type="file"
          name="imageFile"
          id="image"
          accept="image/*"
          className="bg-transparent border-0 text-white"
          onChange={handleFileChange}
          aria-description="Dodaj sliku problema"
          required
        />
        <Button
          aria-label="Pošalji problem"
          variation="danger"
          size="large"
          disabled={isLoading}
        >
          {isLoading ? "U procesu..." : "Pošalji"}
        </Button>
      </form>
    </>
  );
};

export default NewProblemForm;
