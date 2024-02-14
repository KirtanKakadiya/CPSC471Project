import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

export default function Layout(){
    return(
        <div style={{ display: "flex" }}>
            <NavBar />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
        </div>

    );
}