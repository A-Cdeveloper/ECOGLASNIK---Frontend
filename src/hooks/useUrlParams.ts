import { useSearchParams } from "react-router-dom";

export const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mapLat = searchParams.get("lat") as number | null;
  const mapLng = searchParams.get("lng") as number | null;
  const status = searchParams.get("status") as string | null;
  const cat_id = searchParams.get("cat_id") as number | null;
  const token = searchParams.get("token") as string | null;
  const mode = searchParams.get("mode") as string | null;
  const currentParams = new URLSearchParams(window.location.search);

  const setCurrentParams = () => {
    setSearchParams(currentParams);
  };

  return {
    mapLat,
    mapLng,
    status,
    cat_id,
    token,
    mode,
    currentParams,
    setCurrentParams,
  };
};
