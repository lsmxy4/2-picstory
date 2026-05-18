const BASE_URL = import.meta.env.VITE_API_URL ?? ""

const buildApiUrl = (path) => {
    const normalizedBaseUrl = BASE_URL.replace(/\/$/, '')
    return `${normalizedBaseUrl}${path}`
}

export const signup = async (signupData) => {

    const response = await fetch(`${BASE_URL}/members`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(signupData)
    })

    const data = await response.json().catch(() => null)


    if (!response.ok) {
        throw new Error(data?.message || '회원가입 실패')
    }

    return data
}
export const login = async (loginData) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(loginData)
    })

    const data = await response.json().catch(() => null)


    if (!response.ok) {
        throw new Error(data?.message || '로그인 실패')
    }

    return data

}
export const getMe = async () => {
    const response = await fetch(`${BASE_URL}/auth/me`, {
        method: 'GET',

        credentials: 'include'

    })

    const data = await response.json().catch(() => null)


    if (!response.ok) {
        throw new Error(data?.message || '회원 정보 가져오기 실패')
    }

    return data
}
export const updateMe = async (payload) => {
    const response = await fetch(`${BASE_URL}/auth/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)

    })

    const data = await response.json().catch(() => null)


    if (!response.ok) {
        throw new Error(data?.message || '회원 정보 수정하기 실패')
    }

    return data
}

export const logout = async () => {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'

    })

    const data = await response.json().catch(() => null)


    if (!response.ok) {
        throw new Error(data?.message || '로그아웃 실패')
    }

    return data
}

const KAKAO_LOGIN_PATH = '/api/auth/kakao'

const hasEmptyKakaoOAuthParams = (url) => {
    try {
        const parsedUrl = new URL(url, window.location.origin)

        if (parsedUrl.hostname !== 'kauth.kakao.com') {
            return false
        }

        return !parsedUrl.searchParams.get('client_id') || !parsedUrl.searchParams.get('redirect_uri')
    } catch {
        return false
    }
}

export const getKakaoLoginUrl = () => {
    const configuredLoginUrl = import.meta.env.VITE_KAKAO_LOGIN_URL?.trim()

    if (configuredLoginUrl && !hasEmptyKakaoOAuthParams(configuredLoginUrl)) {
        return configuredLoginUrl
    }

    return buildApiUrl(KAKAO_LOGIN_PATH)
}

export const redirectToKakaoLogin = () => {
    window.location.href = getKakaoLoginUrl()
}