import { Outlet } from "react-router"
import HeaderMain from "../components/component-sections/header-main"


export default function LayoutMain(){
    return <>
    <HeaderMain/>
    <Outlet/>
    </>
}