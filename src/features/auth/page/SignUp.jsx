import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();

  // 입력값 상태 관리
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    year: '',
    month: '',
    day: ''
  });

  const [selectedCultures, setSelectedCultures] = useState([]);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [selectedLifeStyles, setSelectedLifeStyles] = useState([]);
  
  // 토스트 팝업 상태
  const [showToast, setShowToast] = useState(false);

  const cultures = ['한식', '일식', '양식', '중식', '아시안'];
  const methods = ['볶음', '국/찌개', '구이', '생식', '조림/찜'];
  const lifeStyles = ['초간단', '한그릇', '술안주', '도시락', '다이어트'];

  // 생년월일 데이터 생성
  const years = Array.from({ length: 100 }, (_, i) => 2024 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // 비밀번호 불일치 여부 확인 (둘 다 입력되었을 때만 체크)
  const isPasswordMismatch = formData.password && formData.confirmPassword && (formData.password !== formData.confirmPassword);

  // 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 칩 선택 핸들러
  const toggleSelection = (item, selectedList, setList) => {
    if (selectedList.includes(item)) {
      setList(selectedList.filter((i) => i !== item));
    } else {
      setList([...selectedList, item]);
    }
  };

  // 회원가입 제출 핸들러
  const handleSignUp = () => {
    // 1. 빈 값 체크
    if (
      !formData.id ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.name ||
      !formData.year ||
      !formData.month ||
      !formData.day ||
      selectedCultures.length === 0 ||
      selectedMethods.length === 0 ||
      selectedLifeStyles.length === 0
    ) {
      setShowToast(true);
      return;
    }

    // 2. 비밀번호 불일치 체크 (저장 막기)
    if (isPasswordMismatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 성공 시 로직 (예: 서버 전송)
    alert("회원가입이 완료되었습니다!");
    navigate('/auth/signin');
  };

  // 토스트 메시지가 2초 뒤에 사라지게 설정
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

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
            <button className="check-btn">중복확인</button>
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
            // 조건부 클래스 적용: 불일치 시 input-error 클래스 추가
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
          <label>생년월일</label>
          <div className="birth-row">
            <select name="year" className="main-input" value={formData.year} onChange={handleChange}>
              <option value="">년도</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <select name="month" className="main-input" value={formData.month} onChange={handleChange}>
              <option value="">월</option>
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select name="day" className="main-input" value={formData.day} onChange={handleChange}>
              <option value="">일</option>
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>요리 문화</label>
          <div className="chip-container">
            {cultures.map((item) => (
              <button
                key={item}
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
                className={`chip-button ${selectedLifeStyles.includes(item) ? 'selected' : ''}`}
                onClick={() => toggleSelection(item, selectedLifeStyles, setSelectedLifeStyles)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <button className="submit-button" onClick={handleSignUp}>회원가입</button>
      </div>

      {/* 토스트 팝업 메시지 */}
      {showToast && (
        <div className="toast-message">
          모든 항목을 작성해주세요
        </div>
      )}
    </div>
  );
};

export default SignUp;