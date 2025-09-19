import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PermissionCard from "src/components/splash/PermissionCard";
import ErrorToast from "src/components/commons/Toast";

// import { PushNotifications } from '@capacitor/push-notifications';
// import { Camera } from "@capacitor/camera";
// import { Geolocation } from "@capacitor/geolocation";


const PermissionPage = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [toastVisible, setToastVisible] = useState(false);

    const showErrorToast = (msg: string) => {
        setErrorMessage(msg);
        setToastVisible(true);
    };

    const handlePermissionGranted = async () => {
        try {
            // 알림 권한 (브라우저)
            const notifPermStatus = await Notification.requestPermission();
             if (notifPermStatus !== "granted") {
                return showErrorToast("알림 권한을 허용해주세요");
            }
            // 알림권한 (capacitor)
            // const notifPermStatus = await PushNotifications.requestPermissions();
            // if (notifPermStatus.receive !== "granted") {
            //     return showErrorToast("알림 권한을 허용해주세요");
            // };

            // 카메라 권한 (브라우저)
            try {
                await navigator.mediaDevices.getUserMedia({ video: true });
            } catch (err) {
                console.error("카메라 권한 거부", err);
                return showErrorToast("카메라 권한을 허용해주세요");
            }
            // 카메라 권한 (capacitor)
            // const camPermStatus = await Camera.requestPermissions();
            // if (camPermStatus.camera !== "granted") {
            //     return showErrorToast("카메라 권한을 허용해주세요");
            // };

            // 위치 권한
            navigator.geolocation.getCurrentPosition(
                () => {
                // 성공 시 다음 페이지 이동
                    navigate("/splash/register-choice");
                },
                (err) => {
                console.error("위치 권한 거부", err);
                return showErrorToast("위치 권한을 허용해주세요");
                }
            );
            // 위치 권한 (capacitor)
            // try {
            //     await Geolocation.getCurrentPosition();
            // } catch {
            //     return showErrorToast("위치 권한을 허용해주세요");
            // };

            // 다음페이지
            navigate('/splash/register-choice');
        } catch(error) {
            console.error('권한 요청 중 오류', error);
            showErrorToast("권한 요청 중 오류가 발생했습니다");
        }
    };

    return (
        <>
            <PermissionCard onAllow={handlePermissionGranted} />
            <ErrorToast
                message={errorMessage}
                visible={toastVisible}
                onClose={() => setToastVisible(false)}
            />
        </>
    );
    
};

export default PermissionPage;