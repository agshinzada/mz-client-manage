import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-100 min-h-screen flex items-center relative">
      <div
        className="absolute top-5 left-5 flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(window.history.back())}
      >
        <img src="left.svg" alt="back-icon" className="w-14 " />
        <span className="text-md font-semibold">Geri</span>
      </div>

      <div className="w-fit p-16 bg-white mx-auto rounded-md">
        <h1 className="text-4xl font-bold">NOT FOUND</h1>
      </div>
    </div>
  );
}

export default PageNotFound;
