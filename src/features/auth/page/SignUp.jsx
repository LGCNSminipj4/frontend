import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    year: ''
  });

  const [selectedCultures, setSelectedCultures] = useState([]);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [selectedLifeStyles, setSelectedLifeStyles] = useState([]);

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

  const cultures = ['한식', '일식', '양식', '중식', '아시안'];
  const methods = ['볶음', '국/찌개', '구이', '생식', '조림/찜'];
  const lifeStyles = ['초간단', '한그릇', '술안주', '도시락', '다이어트'];
  const years = Array.from({ length: 100 }, (_, i) => 2026 - i);

  const isPasswordMismatch = formData.password && formData.confirmPassword && (formData.password !== formData.confirmPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleSelection = (item, selectedList, setList) => {
    if (selectedList.includes(item)) {
      setList(selectedList.filter((i) => i !== item));
    } else {
      setList([...selectedList, item]);
    }
  };

  // 아이디 중복 확인 (토스트 적용)
  const handleCheckId = async () => {
    const userId = formData.id.trim();

    if (!userId) {
      openToast("아이디를 입력해주세요");
      return;
    }

    /* [백엔드 연결 시 주석 해제]
    try {
      const response = await fetch(`/api/auth/check-id?id=${userId}`);
      const data = await response.json();
      if (data.isDuplicate) {
        openToast("이미 사용중인 아이디입니다");
      } else {
        openToast("사용 가능한 아이디입니다");
      }
    } catch (error) {
      openToast("서버 통신 실패");
    }
    */

    // [테스트용 가짜 로직]
    const mockExistingIds = ['admin', 'user123', 'testid'];
    if (mockExistingIds.includes(userId)) {
      openToast("이미 사용중인 아이디입니다");
    } else {
      openToast("사용 가능한 아이디입니다");
    }
  };

  // 회원가입 제출 (토스트 적용)
  const handleSignUp = async () => {
    const { id, password, confirmPassword, name, year } = formData;

    if (!id || !password || !confirmPassword || !name || !year || 
        selectedCultures.length === 0 || selectedMethods.length === 0 || selectedLifeStyles.length === 0) {
      openToast("모든 항목을 작성해주세요");
      return;
    }

    if (isPasswordMismatch) {
      openToast("비밀번호가 일치하지 않습니다");
      return;
    }

    /* [백엔드 연결 시 주석 해제]
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, selectedCultures, selectedMethods, selectedLifeStyles })
      });
      if (response.ok) {
        openToast("회원가입이 완료되었습니다!");
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (error) {
      openToast("회원가입 중 오류 발생");
    }
    */

    // [테스트용]
    openToast("회원가입이 완료되었습니다!");
    setTimeout(() => navigate('/'), 1500);
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
              type="text" 
              name="id"
              className="main-input" 
              placeholder="아이디 입력(6~20자)" 
              value={formData.id}
              onChange={handleChange}
            />
            <button type="button" className="check-btn" onClick={handleCheckId}>중복확인</button>
          </div>
        </div>

        <div className="input-group">
          <label>비밀번호</label>
          <input 
            type="password" 
            name="password"
            className="main-input" 
            placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 6~20자)" 
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>비밀번호 확인</label>
          <input 
            type="password" 
            name="confirmPassword"
            className={`main-input ${isPasswordMismatch ? 'input-error' : ''}`} 
            placeholder="비밀번호 재입력" 
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>이름</label>
          <input 
            type="text" 
            name="name"
            className="main-input" 
            placeholder="이름을 입력해주세요" 
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>출생 연도</label>
          <div className="birth-row">
            <select name="year" className="main-input" value={formData.year} onChange={handleChange}>
              <option value="">년도</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>요리 문화</label>
          <div className="chip-container">
            {cultures.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip-button ${selectedCultures.includes(item) ? 'selected' : ''}`}
                onClick={() => toggleSelection(item, selectedCultures, setSelectedCultures)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>조리 방식</label>
          <div className="chip-container">
            {methods.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip-button ${selectedMethods.includes(item) ? 'selected' : ''}`}
                onClick={() => toggleSelection(item, selectedMethods, setSelectedMethods)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>라이프 스타일</label>
          <div className="chip-container">
            {lifeStyles.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip-button ${selectedLifeStyles.includes(item) ? 'selected' : ''}`}
                onClick={() => toggleSelection(item, selectedLifeStyles, setSelectedLifeStyles)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <button type="button" className="submit-button" onClick={handleSignUp}>회원가입</button>
      </div>

      {/* 공통 토스트 팝업 */}
      {showToast && (
        <div className="toast-message">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default SignUp;