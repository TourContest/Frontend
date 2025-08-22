import { RegisterProvider } from "src/context/AuthContext";
import KaKaoRedirectPage from "./KaKaoRedirectPage";

const KaKaoRegisterPage = () => {
    return (
        <RegisterProvider>
            <KaKaoRedirectPage />
        </RegisterProvider>
    )
}

export default KaKaoRegisterPage;
