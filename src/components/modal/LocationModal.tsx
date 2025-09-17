import styled from '@emotion/styled';
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useGeolocation } from "src/features/main/useGeolocation";
import { Overlay } from "./style";
import { CgClose } from "react-icons/cg";
import { Head3Wrapper } from "../community/Spot/style";
import Location from '../../assets/Location.svg';
import BlackPig from '../../assets/BlackPig.svg';

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
    const mapRef = useRef<HTMLDivElement>(null); // 지도 참조
    const { lat, lng, loading, error } = useGeolocation(); //현재 위치

    useEffect(() => {
        if (!open || !mapRef.current || lat == null || lng == null) return;

        // 카카오 SDK 로드 후 실행
        const initMap = () => {
            const { kakao } = window as any;
            kakao.maps.load(() => {
                // 내 위치를 기준으로 지도 생성
                const center = new kakao.maps.LatLng(lat, lng);
                const map = new kakao.maps.Map(mapRef.current, { center, level: 3 });

                // 커스텀 마커 이미지
                const markerImg = new kakao.maps.MarkerImage(
                    BlackPig,
                    new kakao.maps.Size(64, 64),
                    { offset: new kakao.maps.Point(32, 64) }
                );

                // 마커 추가 (초기 위치 = 내 위치)
                const marker = new kakao.maps.Marker({ position: center, image: markerImg });
                marker.setMap(map);

                // 좌표 → 주소 변환
                const geocoder = new kakao.maps.services.Geocoder();

                // 지도 클릭 이벤트
                kakao.maps.event.addListener(map, "click", (mouseEvent: any) => {
                    const latlng = mouseEvent.latLng; // 터치한 좌표
                    
                    marker.setPosition(latlng); // 마커 이동

                    // 좌표 → 주소  변환
                    geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result: any, status: any) => {
                        if (status === kakao.maps.services.Status.OK) {
                            // 도로명 주소 우선, 없으면 지번
                            const address = result[0].road_address?.address_name || result[0].address.address_name;
                            onSelect(latlng.getLat(), latlng.getLng(), address); // 부모로 좌표, 주소 전달
                        } else {
                            onSelect(latlng.getLat(), latlng.getLng()); // 주소 전환 실패시, 좌표만
                        }
                        onClose();
                    });
                });
            });
        };

        // SDK 로드되지 않은 경우 동적으로 추가
        if (!(window as any).kakao || !(window as any).kakao.maps) {
            const script = document.createElement("script");
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&autoload=false&libraries=services`;
            script.async = true;
            script.onload = initMap;
            document.head.appendChild(script);
        } else {
            // 있으면 intiMap 실행
            initMap();
        }
    }, [open, lat, lng, onClose, onSelect]);        


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
