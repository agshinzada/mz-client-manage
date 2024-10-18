import { Footer } from "antd/es/layout/layout";

function MainFooter(props) {
  return (
    <Footer
      style={{
        textAlign: "center",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      {...props}
    >
      <p className="text-[13px]">
        Mazarina Trade Company ©{new Date().getFullYear()} v2.0.0
      </p>
      <a href="https://agshin.dev/">
        <img src="/powered.svg" alt="logo" style={{ width: "80px" }} />
      </a>
    </Footer>
  );
}

export default MainFooter;
