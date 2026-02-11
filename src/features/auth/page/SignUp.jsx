import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import api from '../../../api/axios';
import './SignUp.css';

const slideUp = keyframes`
  from { transform: translate(-50%, 20px); opacity: 0; }
  to { transform: translate(-50%, 0); opacity: 1; }
`;

const ToastMessage = styled.div`
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.85);
    color: white;
    padding: 12px 24px;
    border-radius: 20px;
    font-size: 14px;
    z-index: 9999;
    white-space: nowrap;
    animation: ${slideUp} 0.3s ease-out;
`;

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    name: '',
    birthYear: ''
  });

  const [selectedTagIds, setSelectedTagIds] = useState([]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const openToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const tagCategories = [
    {
      label: '요리 문화',
      tags: [
        { id: 1, name: '한식' }, { id: 2, name: '일식' }, { id: 3, name: '양식' },
        { id: 4, name: '중식' }, { id: 5, name: '아시안' }
      ]
    },
    {
      label: '조리 방식',
      tags: [
        { id: 6, name: '볶음' }, { id: 7, name: '국/찌개' }, { id: 8, name: '구이' },
        { id: 9, name: '생식' }, { id: 10, name: '조림/찜' }
      ]
    },
    {
      label: '라이프 스타일',
      tags: [
        { id: 11, name: '초간단' }, { id: 12, name: '한그릇' }, { id: 13, name: '술안주' },
        { id: 14, name: '도시락' }, { id: 15, name: '다이어트' }
      ]
    }
  ];

  const years = Array.from({ length: 100 }, (_, i) => 2026 - i);
  const isPasswordMismatch = formData.password && formData.confirmPassword && (formData.password !== formData.confirmPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleTag = (id) => {
    setSelectedTagIds(prev => 
      prev.includes(id) ? prev.filter(tagId => tagId !== id) : [...prev, id]
    );
  };

  const handleCheckId = async () => {
    if (!formData.userId.trim()) return openToast("아이디를 입력해주세요");

    try {
      const response = await api.get(`/auth/check-id`, {
        params: { userId: formData.userId }
      });
      if (response.data.isDuplicate) {
        openToast("이미 사용중인 아이디입니다");
      } else {
        openToast("사용 가능한 아이디입니다");
      }
    } catch (error) {
      openToast("중복 확인 중 오류가 발생했습니다.");
    }
  };

  const handleSignUp = async () => {
    const { userId, password, confirmPassword, name, birthYear } = formData;

    if (!userId || !password || !name || !birthYear || selectedTagIds.length === 0) {
      return openToast("모든 항목을 작성하고 태그를 선택해주세요");
    }

    if (isPasswordMismatch) {
      return openToast("비밀번호가 일치하지 않습니다");
    }

    try {
      const signupData = {
        userId: userId,
        password: password,
        name: name,
        birthYear: Number(birthYear),
        tagIds: selectedTagIds
      };

      await api.post('/auth/signup', signupData);
      openToast("회원가입이 완료되었습니다!");
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
      openToast(errorMsg);
    }
  };

  return (
    <div className="signup-container">
      <div className="header-area">
        <button className="back-btn" onClick={() => navigate(-1)}>&lt;</button>
        <h1 className="title">회원가입</h1>
      </div>

      <div className="form-content">
        <div className="input-group">
          <label>아이디</label>
          <div className="input-row">
            <input 
              type="text" name="userId" className="main-input" 
              placeholder="아이디 입력" value={formData.userId} onChange={handleChange}
            />
            <button type="button" className="check-btn" onClick={handleCheckId}>중복확인</button>
          </div>
        </div>

        <div className="input-group">
          <label>비밀번호</label>
          <input 
            type="password" name="password" className="main-input" 
            placeholder="비밀번호 입력" value={formData.password} onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>비밀번호 확인</label>
          <input 
            type="password" name="confirmPassword"
            className={`main-input ${isPasswordMismatch ? 'input-error' : ''}`} 
            placeholder="비밀번호 재입력" value={formData.confirmPassword} onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>이름</label>
          <input 
            type="text" name="name" className="main-input" 
            placeholder="이름을 입력해주세요" value={formData.name} onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>출생 연도</label>
          <select name="birthYear" className="main-input" value={formData.birthYear} onChange={handleChange}>
            <option value="">년도</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {tagCategories.map(category => (
          <div className="input-group" key={category.label}>
            <label>{category.label}</label>
            <div className="chip-container">
              {category.tags.map(tag => (
                <button
                  key={tag.id} type="button"
                  className={`chip-button ${selectedTagIds.includes(tag.id) ? 'selected' : ''}`}
                  onClick={() => toggleTag(tag.id)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button type="button" className="submit-button" onClick={handleSignUp}>회원가입</button>
      </div>

      {showToast && <ToastMessage>{toastMessage}</ToastMessage>}
    </div>
  );
};

export default SignUp;