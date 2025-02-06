import { useGeolocation } from "../../hooks/useGeolocation";
import AuthNotification from "../../ui/AuthNotification";

const AddProblemBanner = () => {
  const { error } = useGeolocation();

  return (
    <div className="flex flex-col items-center  h-auto space-y-2">
      <div className=" bg-warrning-500/60 px-2 py-2 text-center text-[15px]/[1.25]">
        Kliknite na mapu kako biste odabrali lokaciju problema koji
        prijavljujete ili odaberite Vašu trenutnu lokaciju.
      </div>
      <div className=" bg-danger-500/60 px-2 py-2 text-[15px]/[1.25]">
        Molimo Vas da pre prijave komunalnog problema proverite da li je problem
        već prijavljen. Hvala.
      </div>
      {error && <AuthNotification state="error" message={error} />}
    </div>
  );
};

export default AddProblemBanner;
