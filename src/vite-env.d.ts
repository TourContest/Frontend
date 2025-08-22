/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_KAKAO_CLIENT_ID: string;
    readonly VITE_KAKAP_REDIRECT_URI: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}