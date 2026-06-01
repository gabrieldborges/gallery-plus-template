import { Outlet } from "react-router";
import HeaderMain from "../components/component-sections/header-main";
import MainContent from "../components/component-sections/main-content";

export default function LayoutMain() {
  return (
    <>
      <HeaderMain />
      <MainContent>
        <Outlet />
      </MainContent>
    </>
  );
}
