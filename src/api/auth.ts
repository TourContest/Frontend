import api from "./instance";

export const authApi = {
    login: (data: { email: string, password: string }) =>
        api.post('/v1/users/auth/login', data),
    kakaoLogin: (code: string) => 
        api.post('/v1/users/kakao/login', null, { params: { code } }),

    // register
    checkEmailDuplicate: (email: string) => 
        api.get('/v1/users/register/check/email', { params: { email } }),
    sendEmailCode: (email: string) => 
        api.post('/v1/users/register/email/send', { email }),
    verifyEmailCode: (email: string, code: string) => 
        api.post('/v1/users/register/email/verify', { email, code }),
    registerAppUser: (data: { email: string, password: string }) =>
        api.post('/v1/users/register/app', data),
    checkNicknameDuplicate: (nickname: string) => 
        api.get('/v1/users/register/check/nickname', { params: { nickname }}),
    registerFinal: (gender: 'MALE' | 'FEMALE', formData: FormData) =>
        api.post(`/v1/users/register/final=${gender}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }),
    registerFinalKaKao: (payload: {
        code: string; nickname: string; themes: string[]; gender: 'MALE' | 'FEMALE'; birthYear: string; referralNickname?: string;
    }) => api.post('/v1/users/kakao/final-register', payload),
}