import { Footer } from "antd/es/layout/layout";

function MainFooter() {
  return (
    <Footer
      style={{
        textAlign: "center",
        padding: "1rem",
        alignSelf: "end",
      }}
    >
      Mazarina Trade Company ©{new Date().getFullYear()} Powered by{" "}
      <a href="https://agshin.dev/" style={{ fontWeight: 700 }}>
        agshin
        <span style={{ color: "#6E06F2", fontSize: "17px" }}>.dev</span>
      </a>
    </Footer>
  );
}

export default MainFooter;
