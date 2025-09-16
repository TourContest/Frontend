// src/api/spot.ts
export type SpotDto = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    likeCount: number;
    likedByMe: boolean;
    imageUrls: string[];
    type: 'POST' | 'SPOT' | 'CHALLENGE';
    challengeOngoing: boolean;
    authorNickname: string | null;
    createdAt: string; // ISO8601
    viewCount: number;
};

export type SpotDetailDto = SpotDto & {
    description: string | null;
    commentCount: number;
    bookmarkedByMe: boolean;
    themeId: number | null;
    themeName: string | null;
    tags: string[];
    updatedAt: string | null;
};

export type Page<T> = {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
};

export type ReplyDto = {
    id: number;
    contentId: number;          // spotId
    parentReplyId: number | null;
    depth: 0 | 1;
    text: string;
    nickname: string;
    profileImageUrl?: string | null;
    isDeleted: boolean;
    createdAt: string;          // ISO
    updatedAt?: string | null;
    relativeTime?: string | null;
    replyCount: number;
};

// const API_BASE = (import.meta.env.VITE_API_BASE?.replace(/\/$/, '') || '');
const API_BASE = 'http://localhost:8080';
const BASE = `${API_BASE}/api/spots`;


function authHeaders() {
    const h: Record<string, string> = { accept: '*/*' };
    const token = localStorage.getItem('accessToken'); // 프로젝트 키명에 맞게 조정
    if (token) h.Authorization = `Bearer ${token}`;
    return h;
}

export async function fetchLatestSpots(page = 0, size = 20): Promise<Page<SpotDto>> {
    const qs = new URLSearchParams({
        page: String(page),
        size: String(size),
        sort: 'createdAt,DESC',
    });

    const res = await fetch(`${BASE}/latest?${qs.toString()}`, {
        method: 'GET',
        headers: authHeaders(),
        // 쿠키 세션 쓰면 유지, 토큰만 쓰면 빼도 됨
        credentials: 'include',
    });

    if (!res.ok) {
        let body = '';
        try { body = await res.text(); } catch {}
        throw new Error(`GET /api/spots/latest ${res.status} ${res.statusText} - ${body}`);
    }
    return res.json();
}

export async function fetchMostViewedSpots(page = 0, size = 20): Promise<Page<SpotDto>> {
    const qs = new URLSearchParams({ page: String(page), size: String(size), sort: 'viewCount,DESC' });
    const res = await fetch(`${BASE}/most-viewed?${qs.toString()}`, {
        method: 'GET',
        headers: authHeaders(),
        credentials: 'include',
    });
    if (!res.ok) throw new Error(await res.text().catch(()=>'') || 'most-viewed 실패');
    return res.json();
}

export async function fetchSpotDetail(id: number): Promise<SpotDetailDto> {
    const res = await fetch(`${BASE}/${id}`, {
        method: 'GET',
        headers: authHeaders(),
        credentials: 'include',
    });
    if (!res.ok) {
        let body = ''; try { body = await res.text(); } catch {}
        throw new Error(`GET /api/spots/${id} ${res.status} ${res.statusText} - ${body}`);
    }
    const json = await res.json();
    return json?.data ?? json; // Page가 아닌 단건은 ApiResponse.data에 들어옴
}

// ---------- Comments (최상위) ----------
export async function fetchSpotComments(spotId: number, page = 0, size = 15): Promise<Page<ReplyDto>> {
    const qs = new URLSearchParams({ page: String(page), size: String(size) });
    const res = await fetch(`${BASE}/${spotId}/comments?${qs.toString()}`, {
        method: 'GET',
        headers: authHeaders(),
        credentials: 'include',
    });
    if (!res.ok) throw new Error(await res.text().catch(()=>'') || '댓글 목록 실패');
    return res.json();
}

export async function postSpotComment(spotId: number, text: string): Promise<ReplyDto> {
    const res = await fetch(`${BASE}/${spotId}/comments`, {
        method: 'POST',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error(await res.text().catch(()=>'') || '댓글 등록 실패');
    return res.json();
}

// ---------- Replies (대댓글) ----------
export async function fetchSpotReplies(spotId: number, parentReplyId: number, page = 0, size = 10): Promise<Page<ReplyDto>> {
    const qs = new URLSearchParams({ page: String(page), size: String(size) });
    const res = await fetch(`${BASE}/${spotId}/comments/${parentReplyId}/replies?${qs.toString()}`, {
        method: 'GET',
        headers: authHeaders(),
        credentials: 'include',
    });
    if (!res.ok) throw new Error(await res.text().catch(()=>'') || '대댓글 목록 실패');
    return res.json();
}

export async function postSpotReply(spotId: number, parentReplyId: number, text: string): Promise<ReplyDto> {
    const res = await fetch(`${BASE}/${spotId}/comments/${parentReplyId}/replies`, {
        method: 'POST',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error(await res.text().catch(()=>'') || '대댓글 등록 실패');
    return res.json();
}

// ---------- Edit/Delete (옵션) ----------
export async function putComment(spotId: number, replyId: number, text: string): Promise<ReplyDto> {
    const res = await fetch(`${BASE}/${spotId}/comments/${replyId}`, {
        method: 'PUT',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error(await res.text().catch(()=>'') || '댓글 수정 실패');
    return res.json();
}

export async function deleteComment(spotId: number, replyId: number): Promise<void> {
    const res = await fetch(`${BASE}/${spotId}/comments/${replyId}`, {
        method: 'DELETE',
        headers: authHeaders(),
        credentials: 'include',
    });
    if (!res.ok) throw new Error(await res.text().catch(()=>'') || '댓글 삭제 실패');
}

// ---------- Like Functions ----------
export async function likeSpot(spotId: number): Promise<void> {
    const res = await fetch(`${BASE}/${spotId}/like`, {
        method: 'POST',
        headers: authHeaders(),
        credentials: 'include',
    });
    if (!res.ok) {
        throw new Error(await res.text().catch(()=>'') || '좋아요 실패');
    }
}

export async function unlikeSpot(spotId: number): Promise<void> {
    const res = await fetch(`${BASE}/${spotId}/like`, {
        method: 'DELETE',
        headers: authHeaders(),
        credentials: 'include',
    });
    if (!res.ok) {
        throw new Error(await res.text().catch(()=>'') || '좋아요 취소 실패');
    }
}