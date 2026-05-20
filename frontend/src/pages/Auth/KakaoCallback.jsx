import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMe } from '@/api/auth.api'
import { useAuth } from '@/store/auth.store'

const KakaoCallback = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    useEffect(() => {
        const handleCallback = async () => {
            const params = new URLSearchParams(window.location.search)
            const token = params.get('token')

            if (token !== 'session') {
                navigate('/login', { replace: true })
                return
            }

            try {
                const me = await getMe()
                login(me)
                navigate('/app', { replace: true })
            } catch (error) {
                navigate('/login', { replace: true })
            }
        }

        handleCallback()
    }, [login, navigate])

    return null
}

export default KakaoCallback