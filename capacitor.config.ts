import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.harujeju.app",
  appName: "하루제주",
  webDir: "dist",
  server: {
    androidScheme: "https", // geolocation 등 보안 요구 대응
    cleartext: false, // http 비활성 (가능하면 https만)
  },
};

export default config;
