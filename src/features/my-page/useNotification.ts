import { useEffect, useState } from "react";
import { notificationApi } from "src/api/notification";

export function useNotification() {
    const [notiEnabled, setNotiEnabled] = useState(false);

    // 최초조회
    useEffect(() => {
        let mounted = true;
        (async() => {
            try{
                const res = await notificationApi.getSettings();
                if(mounted) setNotiEnabled(res.data.data);
            } catch(err){
                console.error('알림설정 조회 실패', err);
                if(mounted) setNotiEnabled(false);
            }
        })();
    }, []);
    
    // 토글
    const toggleNoti = async (enabled: boolean) => {
        // 로딩 중에는  토글 막기
        if(notiEnabled === null) return;

        setNotiEnabled(enabled);

        try {
            await notificationApi.updateSettings(enabled);
        } catch (err) {
            console.error('알림 설정 변경 실패', err);
            setNotiEnabled((prev) => !prev);
        }
    };

    return { notiEnabled, toggleNoti };
};