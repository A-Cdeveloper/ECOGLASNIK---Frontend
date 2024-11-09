import Button from "../../../ui/Buttons/Button";
import Headline from "../../../ui/Headline";

const Form = ({
  handleSubmit,
  handleFileChange,
  categories,
  isLoading,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories?: { cat_id: number; cat_name: string }[];
  isLoading?: boolean;
}) => {
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
          {isLoading ? "Slanje..." : "Pošalji"}
        </Button>
      </form>
    </>
  );
};

export default Form;
