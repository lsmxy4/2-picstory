import React from 'react';
import './Landing.scss';
// 이미지 파일 이름이 hero.png라고 가정했습니다.
import heroImg from '../../assets/MainImage.png'; 
import icon from '@/assets/Bookicon.png'

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="landing-container">
        {/* 왼쪽: 오리 캐릭터가 들어있는 책 이미지 영역 */}
        <div className="image-section">
          <img 
          src={heroImg} alt="BookTrace Hero" />
        </div>

        {/* 오른쪽: 로고와 시작하기 버튼 영역 */}
        <div className="content-section">
          <div className="logo-wrapper">
            <div className="logo-title">
              <img src={icon} className="icon"/>
              <h1>BookTrace</h1>
            </div>
            <p className="description">읽은 책의 흔적을 기록하다</p>
          </div>
          
          <button className="start-button" onClick={() => window.location.href='/login'}>
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;