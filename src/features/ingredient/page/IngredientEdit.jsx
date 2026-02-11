import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import logoImg from '../../../components/images/Logo.png';
import api from '../../../api/axios';
import { FiUser, FiLock } from 'react-icons/fi';

const slideUp = keyframes`
  from { transform: translate(-50%, 20px); opacity: 0; }
  to { transform: translate(-50%, 0); opacity: 1; }
`;

const ToastMessage = styled.div`
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 24px;
    border-radius: 20px;
    font-size: 14px;
    z-index: 3000;
    white-space: nowrap;
    animation: ${slideUp} 0.3s ease-out;
`;

const SignIn = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");

  const triggerToast = (text) => {
    setToastText(text);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    if (!userId || !password) {
      return triggerToast("아이디와 비밀번호를 모두 입력해주세요.");
    }

    try {
      const response = await api.post('/auth/login', {
        userId: userId, 
        password: password
      });

      if (response.status === 200) {
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        localStorage.setItem('userName', response.data.name || userId);
        
        triggerToast(`${response.data.name || userId}님, 환영합니다!`);
        setTimeout(() => navigate('/fridge'), 1000); 
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      const message = error.response?.data?.message || "아이디 또는 비밀번호를 확인하세요.";
      triggerToast(message);
    }
  };

  return (
    <div className="signin-container">
      <div className="logo-section">
        <img src={logoImg} alt="로고" className="main-logo" />
      </div>

      <form onSubmit={handleLogin} className="auth-form">
        <div className="input-field-group">
          <FiUser className="icon" size={20} />
          <input 
            type="text" 
            placeholder="아이디" 
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        
        <div className="input-field-group">
          <FiLock className="icon" size={20} />
          <input 
            type="password" 
            placeholder="비밀번호" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="btn-group">
          <button type="submit" className="btn-login">로그인</button>
          <button type="button" className="btn-signup" onClick={() => navigate('/signup')}>
            회원가입
          </button>
        </div>
      </form>

      {showToast && <ToastMessage>{toastText}</ToastMessage>}
    </div>
  );
};

export default SignIn;