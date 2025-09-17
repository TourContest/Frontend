import styled from "@emotion/styled";
import type { SpotDto } from "src/api/spot";
import {useNavigate} from "react-router-dom";
import {useMemo} from "react";

const Card = styled.article`
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    overflow: hidden;
    cursor: pointer;
`;

const Thumb = styled.div<{src?: string}>`
    width: 100%;
    height: 180px;
    background: ${({src}) => src ? `center / cover no-repeat url("${src}")` : '#f3f4f6'};
`;

const Body = styled.div`
    padding: 12px 14px 14px;
`;

const Title = styled.h3`
    font-size: 16px;
    font-weight: 700;
    margin: 6px 0 8px;
    color: #111827;
`;

const MetaTop = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #6b7280;
    font-size: 12px;
`;

const Dot = styled.span`
  width: 3px; height: 3px; border-radius: 50%; background: #d1d5db; display: inline-block;
`;

const MetaBottom = styled.div`
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #6b7280;
  font-size: 12px;
`;

const Chip = styled.span`
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  border: 1px solid #e5e7eb;
  color: #374151;
  background: #f9fafb;
`;

type Props = { spot: SpotDto };

function formatDate(iso?: string | null) {
    if (!iso) return '';
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
}

const SpotCard: React.FC<Props> = ({ spot }) => {
    const navigate = useNavigate();
    const cover = useMemo(() => spot.imageUrls?.[0], [spot.imageUrls]);
    const dateLabel = useMemo(() => formatDate(spot.createdAt), [spot.createdAt]);

    const handleClick = () => {
        // 기존 라우트 규칙 유지: /post/:id 로 이동
        navigate(`/post/${spot.id}`, { state: { fromList: true } });
    };

    return (
        <Card onClick={handleClick} aria-label={`${spot.name} 상세 보기`}>
            <Thumb src={cover} />
            <Body>
                <MetaTop>
                    <span>{spot.authorNickname ?? '익명'}</span>
                    <Dot />
                    <span>{dateLabel}</span>
                </MetaTop>
                <Title>{spot.name}</Title>
                <MetaBottom>
                    <span>❤ {spot.likeCount}</span>
                    <Dot />
                    <span>👁 {spot.viewCount}</span>
                    <Chip>{spot.type}</Chip>
                </MetaBottom>
            </Body>
        </Card>
    );
};

export default SpotCard;