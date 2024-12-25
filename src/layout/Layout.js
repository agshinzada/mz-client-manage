import { Link, Outlet, useNavigate } from "react-router-dom";
import { encryptStorage } from "../utils/storage";
import { Button, Layout, Menu } from "antd";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.svg";
import { Content, Header } from "antd/es/layout/layout";
import MainFooter from "../components/Footer";
import {
  EditOutlined,
  LogoutOutlined,
  SolutionOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useGlobal } from "../context/GlobalContext";

const menuItems = [
  {
    key: 1,
    label: "Müştəri kodu",
    icon: <UserAddOutlined />,
  },
  {
    key: 2,
    label: "Stiker kodu",
    icon: <UsergroupAddOutlined />,
  },
  {
    key: 3,
    label: "Düzəliş (VÖEN və ya Ad)",
    icon: <EditOutlined />,
  },
  {
    key: 4,
    label: "VÖEN (müştəri kodu)",
    icon: <EditOutlined />,
  },
  {
    key: 5,
    label: "Rutlar",
    icon: <SolutionOutlined />,
  },
  {
    key: 6,
    label: "KODLAR",
    icon: <UnorderedListOutlined />,
  },
];

function MainLayout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { menuItemId, setMenuItemId } = useGlobal();

  function handleMenu(params) {
    switch (parseInt(params.key)) {
      case 1:
        localStorage.setItem(
          "menuItem",
          JSON.stringify({ id: params.key, target: "/" })
        );
        setMenuItemId(params.key);
        navigate("/");
        break;
      case 2:
        localStorage.setItem(
          "menuItem",
          JSON.stringify({
            id: params.key,
            target: "/sticker",
          })
        );
        setMenuItemId(params.key);
        navigate("sticker");
        break;
      case 3:
        localStorage.setItem(
          "menuItem",
          JSON.stringify({
            id: params.key,
            target: "/clients/edit",
          })
        );
        setMenuItemId(params.key);
        navigate("clients/edit");
        break;
      case 4:
        localStorage.setItem(
          "menuItem",
          JSON.stringify({
            id: params.key,
            target: "/clients/tax/edit",
          })
        );
        setMenuItemId(params.key);
        navigate("clients/tax/edit");
        break;
      case 5:
        localStorage.setItem(
          "menuItem",
          JSON.stringify({ id: params.key, target: "/routes" })
        );
        setMenuItemId(params.key);
        navigate("routes");
        break;
      case 6:
        localStorage.setItem(
          "menuItem",
          JSON.stringify({
            id: params.key,
            target: "/inserted",
          })
        );
        setMenuItemId(params.key);
        navigate("inserted");
        break;

      default:
        break;
    }
  }

  function logoutHandle() {
    try {
      Swal.fire({
        title: "Çıxış edilsin?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Bəli",
        cancelButtonText: "Imtina",
      }).then(async (result) => {
        if (result.isConfirmed) {
          encryptStorage.clear();
          navigate("auth/login");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link to={"/"} className="flex items-center gap-2 mr-6">
          <img src={logo} alt="logo" className="w-6" />
          <p className="text-[14px] font-semibold text-white">
            MÜŞTƏRİ İDARƏETMƏ PANELİ
          </p>
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[menuItemId.toString() || "1"]}
          selectedKeys={[menuItemId.toString()]}
          items={menuItems}
          style={{
            flex: 1,
            minWidth: 0,
          }}
          onClick={handleMenu}
        />
        <div className="flex gap-4 items-center">
          <span className="text-white font-bold text-[15px]">
            {user.USERNAME}
          </span>
          <Button icon={<LogoutOutlined />} onClick={logoutHandle}>
            Çıxış
          </Button>
        </div>
      </Header>
      <Content
        style={{
          padding: "0 25px",
        }}
      >
        <div className="bg-white min-h-screen mt-6 px-6 py-6 max-w-[1400px] mx-auto">
          <Outlet />
        </div>
      </Content>
      <MainFooter />
    </Layout>
    // <div className="bg-slate-100 overflow-y-auto flex items-center py-5 min-h-screen justify-center relative">
    //   <div>
    //     <div className="flex items-center justify-between mb-4">
    //       <div className="flex gap-4 bg-gray-500 rounded-lg p-1.5">
    //         <NavLink
    //           to={"/"}
    //           className="text-md text-slate-200 w-fit px-8 py-1.5 rounded-lg navBtn"
    //         >
    //           Müştəri
    //         </NavLink>
    //         <NavLink
    //           to={"/sticker"}
    //           className="text-md text-slate-200 w-fit px-8 py-1.5 rounded-lg navBtn"
    //         >
    //           Stiker
    //         </NavLink>
    //       </div>

    //       <div className="flex items-center gap-3">
    //         <span className="font-bold">{user.USERNAME}</span>
    //         {/* <Button
    //           onClick={() => setTaxesModalIsOpen(true)}
    //           icon={<SearchOutlined />}
    //         >
    //           Axtar
    //         </Button> */}
    //         <EditDropdown />
    //         <MenuDropdown />

    //         <Button type="primary" onClick={logoutHandle}>
    //           Çıxış
    //         </Button>
    //       </div>
    //     </div>

    //     <div className="w-full h-fit bg-white dark:bg-gray-700 rounded-xl shadow-md px-8 py-10">
    //       <Outlet />
    //     </div>
    //     <MainFooter />
    //   </div>

    //   <Toaster
    //     position="top-center"
    //     reverseOrder={false}
    //     gutter={8}
    //     containerClassName=""
    //     containerStyle={{}}
    //     toastOptions={{
    //       // Define default options
    //       className: "",
    //       duration: 5000,
    //       style: {
    //         background: "#363636",
    //         color: "#fff",
    //       },

    //       // Default options for specific types
    //       success: {
    //         duration: 3000,
    //         theme: {
    //           primary: "green",
    //           secondary: "black",
    //         },
    //       },
    //     }}
    //   />
    // </div>
  );
}

export default MainLayout;
