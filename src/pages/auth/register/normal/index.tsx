import { RegisterProvider } from "src/context/AuthContext"
import RegisterFlow from "./RegisterFlow"

const RegisterPage = () => {
    return(
        <RegisterProvider>
            <RegisterFlow />
        </RegisterProvider>
    );
}

export default RegisterPage;