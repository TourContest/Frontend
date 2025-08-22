import { useNavigate } from "react-router-dom";
import PermissionCard from "src/components/splash/PermissionCard";

const PermissionPage = () => {
    const navigate = useNavigate();

    const handlePermissionGranted = async () => {
        try {
            // 알림 권한
            const notificationPermission = await Notification.requestPermission(); 

            // 카메라 권한 (브라우저 + 이후 앱 추가)
            let cameraPermission = false;
            try {
                await navigator.mediaDevices.getUserMedia({ video: true });
                cameraPermission = true;
            } catch(err) {
                console.log("카메라 권한 거부", err);
            }

            // 위치 권한
            navigator.geolocation.getCurrentPosition(
                (pos) => console.log('위치 허용', pos.coords),
                (err) => console.log('위치 거부', err)
            );

            navigate('/splash/register-choice');
        } catch(error) {
            console.error('권한 요청 중 오류', error);
        }
    };

    return <PermissionCard onAllow={handlePermissionGranted} />
    
};

export default PermissionPage;