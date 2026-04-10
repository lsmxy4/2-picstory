import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { signup } from '@/api/auth.api'
import './Auth.scss'

const Signup = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', password: '', passwordConfirm: '', phone: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await signup(form)
      alert('회원가입 완료!')
      navigate('/login')
    } catch (error) {
      setError(error.message || '가입 실패')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='auth'>
      <div className="inner">
        <h2>회원가입</h2>
        <form className='auth-form-vertical' onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div className="form-group" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <Input 
              name="email"   
              value={form.email} 
              onChange={handleChange} 
              placeholder="아이디(이메일)" 
            />
            <Input 
              name="password" 
              type="password"  
              value={form.password} 
              onChange={handleChange} 
              placeholder="비밀번호" 
            />
            <Input 
              name="passwordConfirm" 
              type="password" 
              value={form.passwordConfirm} 
              onChange={handleChange} 
              placeholder="비밀번호확인" 
            />
            <Input 
              name="name"
              value={form.name} 
              onChange={handleChange} 
              placeholder="이름" 
            />
            <Input 
              name="phone" 
              value={form.phone}
              onChange={handleChange} 
              placeholder="전화번호" 
            />
          </div>
          
          <div className="auth-btn-wrap" style={{textAlign: 'center'}}>
            <Button 
              text={isLoading ? "가입 중..." : "가입"} 
              type="submit" 
              className="primary" 
              style={{width: '200px', height: '50px', borderRadius: '25px'}}
            />
          </div>
        </form>

        <div className="auth-now">
            <span>이미 계정이 있으신가요?</span>
            <Link to="/login">로그인하기</Link>
        </div>

        <div className="back-to-home">
            <Button text="이전으로" onClick={() => navigate(-1)} />
        </div>
      </div>
    </section>
  )
}

export default Signup