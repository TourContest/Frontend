import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PermissionCard from "src/components/splash/PermissionCard";
import ErrorToast from "src/components/commons/Toast";

import { PushNotifications } from '@capacitor/push-notifications';
import { Camera } from "@capacitor/camera";
import { Geolocation } from "@capacitor/geolocation";


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
            // 알림 권한
            const notifPermStatus = await PushNotifications.requestPermissions();
            if (notifPermStatus.receive !== "granted") {
                return showErrorToast("알림 권한을 허용해주세요");
            };
            // const notificationPermission = await Notification.requestPermission(); 

            // 카메라 권한 (브라우저 + 이후 앱 추가)
            const camPermStatus = await Camera.requestPermissions();
            if (camPermStatus.camera !== "granted") {
                return showErrorToast("카메라 권한을 허용해주세요");
            };
            // try {
            //     await navigator.mediaDevices.getUserMedia({ video: true });
            //     cameraPermission = true;
            // } catch(err) {
            //     console.log("카메라 권한 거부", err);
            // }

            // 위치 권한
            try {
                await Geolocation.getCurrentPosition();
            } catch {
                return showErrorToast("위치 권한을 허용해주세요");
            };
            // navigator.geolocation.getCurrentPosition(
            //     (pos) => console.log('위치 허용', pos.coords),
            //     (err) => console.log('위치 거부', err)
            // );

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