import { useSearchParams } from "react-router-dom";

export const useUrlParams = () => {
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat") as number | null;
  const mapLng = searchParams.get("lng") as number | null;
  const solved = searchParams.get("solved") as string | null;
  const cat_id = searchParams.get("cat_id") as number | null;

  return {
    mapLat,
    mapLng,
    solved,
    cat_id,
  };
};
