import { useEffect, useState } from "react";

export function useKakaoLoader(appKey: string, libraries: string[] = []) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    {
      const exist = document.getElementById(
        "kakao-map-sdk"
      ) as HTMLScriptElement | null;
      const src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false${libraries.length ? "&libraries=" + libraries.join(",") : ""}`;

      if (exist) {
        if (window.kakao?.maps) window.kakao.maps.load(() => setReady(true));
        return;
      }

      const script = document.createElement("script");
      script.id = "kakao-sdk";
      script.src = src;
      script.async = true;
      script.onload = () => {
        window.kakao?.maps.load(() => setReady(true));
      };
      script.onerror = () => setReady(false);
      document.head.appendChild(script);
    }
  }, [appKey, libraries.join(",")]);

  return ready;
}
