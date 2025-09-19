import styled from '@emotion/styled';
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useGeolocation } from "src/features/main/useGeolocation";
import { Overlay } from "./style";
import { CgClose } from "react-icons/cg";
import { Head3Wrapper } from "../community/Spot/style";
import Location from '../../assets/Location.svg';
import BlackPig from '../../assets/BlackPig.svg';
import { useKakaoLoader } from 'src/features/main/useKakaoLoader';

interface LocationMapModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (lat: number, lng: number, address?: string) => void;
}

const MapWrapper = styled.div`
    width: 90%;
    height:50%;
    border-radius: 12px;
    padding: 12px;
    max-width: 480px;
    background: #fff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const MapHeader = styled.div`
    border-bottom: 1px solid #eee;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 12px;
`;

const Map = styled.div`
    flex: 1;
    border-radius: 12px;
`;

export default function LocationMapModal({ open, onClose, onSelect }: LocationMapModalProps) {
      const mapRef = useRef<HTMLDivElement>(null);
  const { lat, lng, loading, error } = useGeolocation();
  const ready = useKakaoLoader(import.meta.env.VITE_KAKAO_API_KEY, ["services"]);

  useEffect(() => {
    if (!open || !mapRef.current || !ready || lat == null || lng == null) return;

    const { kakao } = window as any;

    kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(lat, lng);
        const map = new kakao.maps.Map(mapRef.current, { center, level: 3 });

        const markerImg = new kakao.maps.MarkerImage(
            BlackPig,
            new kakao.maps.Size(64, 64),
            { offset: new kakao.maps.Point(32, 64) }
        );

        const marker = new kakao.maps.Marker({ position: center, image: markerImg });
        marker.setMap(map);

        const geocoder = new kakao.maps.services.Geocoder();

        kakao.maps.event.addListener(map, "click", (mouseEvent: any) => {
            const latlng = mouseEvent.latLng;
            marker.setPosition(latlng);

            geocoder.coord2Address(
            latlng.getLng(),
            latlng.getLat(),
            (result: any, status: any) => {
                if (status === kakao.maps.services.Status.OK) {
                const address =
                    result[0].road_address?.address_name || result[0].address.address_name;
                onSelect(latlng.getLat(), latlng.getLng(), address);
                } else {
                onSelect(latlng.getLat(), latlng.getLng());
                }
                onClose();
            }
            );
        });
        });
    }, [open, ready, lat, lng, onClose, onSelect]);

    if (!open) return null;

    return createPortal(
        <Overlay>
            <MapWrapper>
            
            <MapHeader>
                <Head3Wrapper style={{ marginBottom: 0 }}>
                    <div>
                        <img src={Location} />
                        위치를 알려주세요.
                    </div>
                </Head3Wrapper>
                <CgClose onClick={onClose} size={20} color="#B7B7B7"/>
            </MapHeader>

            {/* 지도 */}
            <Map ref={mapRef} />
            {loading && <p style={{ padding: "8px" }}>현재 위치 불러오는 중…</p>}
            {error && <p style={{ padding: "8px", color: "red" }}>{error}</p>}
            </MapWrapper>
        </Overlay>,
        document.body
    );
}
