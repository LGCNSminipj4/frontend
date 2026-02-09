import React from 'react';
import './SignIn.css';
import { FiUser, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  return (
    <div className="signin-container">
      <div className="logo-section">
        <div className="logo-text">(로고)</div>
        <h1 className="service-name">냉장고를 부탁해</h1>
      </div>

      <div className="auth-form">
        <div className="input-field-group">
          <FiUser className="icon" size={20} />
          <input type="text" placeholder="아이디" />
        </div>
        
        <div className="input-field-group">
          <FiLock className="icon" size={20} />
          <input type="password" placeholder="비밀번호" />
        </div>
      </div>

      <div className="btn-group">
        <button className="btn-login">로그인</button>
        <button className="btn-signup" onClick={() => navigate('/signup')}>회원가입</button>
      </div>
    </div>
  );
};

export default SignIn;
