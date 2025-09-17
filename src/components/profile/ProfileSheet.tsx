import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as S from "./sytle"; // 파일명이 style이면 수정
import { userApi } from "src/api/users";

type Props = {
  open: boolean;
  onClose: () => void;
  user: {
    name: string;
    rankLabel: string;
    avatarUrl: string;
  };
  todaySteps: number;
  hanlabong: number;
  onChargeClick?: () => void;
  // onEditName?: () => void; // (더 이상 필요X) 외부 핸들러 넘기지 말 것
};

export default function ProfileSheet({
  open,
  onClose,
  user,
  todaySteps,
  hanlabong,
  onChargeClick,
}: Props) {
  const navigate = useNavigate();

  // 인라인 편집 상태
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user.name);
  const [nickInput, setNickInput] = useState(user.name);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // 시트 열릴 때 값 동기화
  useEffect(() => {
    if (!open) return;
    setDisplayName(user.name);
    setNickInput(user.name);
    setIsEditing(false);
    setErr(null);
  }, [open, user.name]);

  // 스크롤 막기
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const startEdit = () => {
    setIsEditing(true);
    setErr(null);
    setNickInput(displayName);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setNickInput(displayName);
    setErr(null);
  };

  const validate = (v: string) => {
    const t = v.trim();
    if (!t) return "닉네임을 입력해주세요.";
    if (t.length < 2) return "닉네임은 2자 이상이어야 해요.";
    if (t.length > 20) return "닉네임은 20자 이하여야 해요.";
    return null;
  };

  const submit = async () => {
    const v = nickInput.trim();
    const vErr = validate(v);
    if (vErr) {
      setErr(vErr);
      return;
    }
    if (v === displayName) {
      setIsEditing(false);
      return;
    }

    setSaving(true);
    setErr(null);
    try {
      // ✅ POST /v1/users/account/nickname?nickname=...
      const res = await userApi.changeNickname(v);
      if (res.data?.success === false) {
        throw new Error(res.data?.data || "닉네임 변경 실패");
      }
      setDisplayName(v); // 낙관적 UI 업데이트
      setIsEditing(false);
      window.dispatchEvent(new CustomEvent("me:refresh")); // 전역 프로필 갱신
    } catch (e: any) {
      const msg =
        e?.response?.data?.data ||
        e?.response?.data?.message ||
        e?.message ||
        "닉네임 변경에 실패했어요.";
      setErr(String(msg));
    } finally {
      setSaving(false);
    }
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Sheet
        onClick={(e: any) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="프로필 상세"
      >
        {/* 헤더 */}
        <S.HeaderGrad>
          <S.BackBtn onClick={onClose} aria-label="뒤로가기">
            <S.BackIcon viewBox="0 0 24 24" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </S.BackIcon>
          </S.BackBtn>

          <S.AppTitle>내 캐릭터</S.AppTitle>

          <S.Capsule>
            <S.CapsuleLeft>
              내 한라봉 <S.Emoji />
              <S.Mono>{hanlabong.toString().padStart(3, "0")}</S.Mono>
            </S.CapsuleLeft>
            <S.CapsuleDivider />
            <S.CapsuleRight
              onClick={onChargeClick}
              role="button"
              aria-label="한라봉 채우기"
            >
              한라봉 채우기
              <S.ChevronSmall viewBox="0 0 24 24" aria-hidden>
                <path d="M9 6l6 6-6 6" />
              </S.ChevronSmall>
            </S.CapsuleRight>
          </S.Capsule>

          <S.Hero>
            <S.Avatar src={user.avatarUrl} alt="" />
            <S.FootShadow />
          </S.Hero>
        </S.HeaderGrad>

        {/* 닉네임 + 편집 */}
        <S.NameRow>
          {!isEditing ? (
            <>
              <S.Name>{displayName}</S.Name>
              <S.EditBtn
                type="button"
                onClick={startEdit}
                aria-label="닉네임 편집"
              />
            </>
          ) : (
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                aria-label="닉네임 입력"
                value={nickInput}
                onChange={(e) => setNickInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submit();
                  if (e.key === "Escape") cancelEdit();
                }}
                maxLength={20}
                autoFocus
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,.15)",
                  fontSize: 16,
                }}
              />
              <button
                type="button"
                onClick={submit}
                disabled={saving}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "none",
                  background: "#ff8b4c",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: saving ? "default" : "pointer",
                }}
              >
                {saving ? "저장중…" : "저장"}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                disabled={saving}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,.15)",
                  background: "#fff",
                  fontWeight: 700,
                  cursor: saving ? "default" : "pointer",
                }}
              >
                취소
              </button>
            </div>
          )}
        </S.NameRow>

        {err && (
          <div
            role="alert"
            style={{
              marginTop: 6,
              color: "#d93025",
              fontSize: 12,
              paddingLeft: 2,
            }}
          >
            {err}
          </div>
        )}

        {/* 2칸 카드 */}
        <S.TwoCol>
          <S.StatCard>
            <S.StatLabel>오늘의 걸음</S.StatLabel>
            <S.StatValue>
              <S.Emph>{todaySteps.toLocaleString()}</S.Emph>{" "}
              <S.Walk>걸음</S.Walk>
            </S.StatValue>
          </S.StatCard>
          <S.StatCard>
            <S.StatLabel>등급</S.StatLabel>
            <S.RankText>{user.rankLabel}</S.RankText>
          </S.StatCard>
        </S.TwoCol>

        {/* 리스트 */}
        <S.List>
          <S.ListItem
            role="button"
            onClick={() => {
              navigate("/challenge?tab=doing");
              onClose?.();
            }}
          >
            <S.TrophyIcon />
            <S.ListText>진행 중인 챌린지</S.ListText>
            <S.ChevronRight viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6" />
            </S.ChevronRight>
          </S.ListItem>

          <S.ListItem role="button">
            <S.StoreIcon />
            <S.ListText>상점 바로가기</S.ListText>
            <S.ChevronRight viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6" />
            </S.ChevronRight>
          </S.ListItem>
        </S.List>
      </S.Sheet>
    </S.Overlay>
  );
}
