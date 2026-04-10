import React, { useState } from 'react'
import Button from '../../components/ui/Button'
import Input from '@/components/ui/Input'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginApi } from '@/api/auth.api'
import { useAuth } from '../../store/auth.store'
import './Auth.scss'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const data = await loginApi({ email: form.email.trim(), password: form.password })
      login(data)
      navigate('/app')
    } catch (error) {
      setError(error.message || '로그인을 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='auth'>
      <div className="inner">
        <h2>로그인</h2>
        <form className='auth-form' onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="아이디(이메일)"
            />
            <Input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="비밀번호"
            />
          </div>
          <div className="auth-btn-wrap">
            <Button 
              text={isLoading ? "..." : "로그인"} 
              type="submit" 
              className="primary" 
            />
          </div>
        </form>
        {error && <p className='error-text' style={{color: 'red', textAlign: 'center'}}>{error}</p>}
        
        <div className="auth-now">
            <Link to="/signup">회원가입</Link>
        </div>

        <div className="back-to-home">
            <Button text="메인으로 돌아가기" onClick={() => navigate('/')} />
        </div>
      </div>
    </section>
  )
}

export default Login