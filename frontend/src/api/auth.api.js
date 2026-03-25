const BASE_URL = import.meta.env.VITE_API_URL

export const signup =async(signupData)=>{

    const response = await fetch(`${BASE_URL}/members`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials : 'include',
        body:JSON.stringify(signupData)
    })

    const data = await response.json().catch(() => null)

    if(!response.ok){
        throw new Error(data?.meassage || '회원가입 실패')
    }

    return data
}
export const login =async(loginData)=>{
     const response = await fetch(`${BASE_URL}/members`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials : 'include',
        body:JSON.stringify(signupData)
    })

    const data = await response.json().catch(() => null)

    if(!response.ok){
        throw new Error(data?.meassage || '로그인 실패')
    }

    return data
}
export const getMe =async()=>{
    const response = await fetch(`${BASE_URL}/auth/me`,{
        method: 'GET',
        credentials : 'include'
    })

    const data = await response.json().catch(() => null)

    if(!response.ok){
        throw new Error(data?.meassage || '회원정보 불러오기 실패')
    }

    return data
}
export const logout =async()=>{

    const response = await fetch(`${BASE_URL}/auth/logout`,{
        method: 'POST',
        credentials : 'include'
    })

    const data = await response.json().catch(() => null)

    if(!response.ok){
        throw new Error(data?.meassage || '로그아웃 실패')
    }

    return data

}