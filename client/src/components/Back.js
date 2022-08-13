import { useNavigate } from "react-router-dom";

function Back() {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <div
      onClick={handleBack}
      className="bg-gray-200 hover:bg-gray-300 dark:bg-[#363535] hover:dark:bg-[#323030] duration-300 rounded-md h-11 w-full flex justify-center items-center cursor-pointer"
    >
      <h1 className="text-black dark:text-white text-lg font-medium">Batal</h1>
    </div>
  );
}

export default Back;
