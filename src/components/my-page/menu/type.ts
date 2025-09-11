export type SettingMode = 'navigate' | 'positive' 

export type MyPageListProps = {
    notiEnabled: boolean;
    toggleNoti?: (enabled: boolean) => void;
    onNavigate?: (path: string) => void;
    // onSaveSettings?: (data: SettingFormState) => void;
    settingMode?: SettingMode;
    routes?: Partial<{
        community: string;
        challenge: string;
        settings: string;
    }>;
};