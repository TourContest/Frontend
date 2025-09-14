import { Outlet } from "react-router-dom";
import { CommunityProvider } from "src/context/community";

export default function CommunityLayout() {
    return (
        <CommunityProvider>
            <Outlet />
        </CommunityProvider>
    )
}