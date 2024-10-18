import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { encryptStorage } from "../utils/storage";
import { fetchLogin } from "../services/authService";
import MainFooter from "../components/Footer";
import logo from "../assets/logo.svg";
import { Button, Form, Input } from "antd";

function LoginPage() {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  var hash = require("hash.js");
  const navigate = useNavigate();

  const onFinish = async (params) => {
    try {
      setLoading(true);
      const hassPass = hash.sha256().update(params.password).digest("hex");
      const res = await fetchLogin({
        username: params.username,
        password: hassPass,
      });
      if (res) {
        setUser(res);
        encryptStorage.setItem("user", res);
        navigate("/");
      } else {
        console.log("error", res);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen w-full bg-slate-100">
      <div className="bg-white p-16 rounded-md my-auto">
        <div className="flex items-center justify-center gap-2 px-3 py-5 mb-7">
          <img src={logo} alt="logo" className="w-10" />
          <h1 className="text-gray-600 text-xl font-bold">
            Müştəri İdarəetmə Paneli
          </h1>
        </div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto self-center">
        <span className="block w-full text-xl uppercase font-bold mb-4">
          GİRİŞ
        </span>
        {successDiv && (
          <div className="p-2 bg-green-50 border-green-200 text-green-800 border rounded-sm text-sm mb-4">
            Siz daxil oldunuz! Gözləyin
          </div>
        )}
        {warningDiv && (
          <div className="p-2 bg-red-50 border-red-200 text-red-800 border rounded-sm text-sm mb-4">
            {warning}
          </div>
        )}

        <form className="mb-4 flex flex-col" onSubmit={loginHandle}>
          <div className="mb-4 md:w-full">
            <label htmlFor="email" className="block text-xs mb-1">
              İstifadəçi adı
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="text"
              name="email"
              id="email"
              required
              placeholder="username"
              onInvalid={(e) => e.target.setCustomValidity("Xananı doldurun")}
              onInput={(e) => e.target.setCustomValidity("")}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6 md:w-full">
            <label htmlFor="password" className="block text-xs mb-1">
              Şifrə
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              required
              placeholder="password"
              onInvalid={(e) => e.target.setCustomValidity("Xananı doldurun")}
              onInput={(e) => e.target.setCustomValidity("")}
              onChange={(e) =>
                setHashPassword(
                  hash.sha256().update(e.target.value).digest("hex")
                )
              }
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded self-end"
            type="submit"
          >
            login
          </button>
        </form>
      </div> */}
      <MainFooter />
    </div>
  );
}

export default memo(LoginPage);
