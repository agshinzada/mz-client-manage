import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-3 relative p-5">
          <img
            src={logo}
            className="w-80 absolute opacity-10 -top-20"
            alt="logo"
          />
          <h1 className="font-bold text-4xl z-10">404 - SƏHİFƏ TAPILMADI!</h1>
          <Button className="w-fit" type="primary" onClick={() => navigate(-1)}>
            Geri
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
