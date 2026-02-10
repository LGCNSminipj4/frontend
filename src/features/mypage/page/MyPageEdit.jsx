import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css'; 

const EditProfile = () => {
  const navigate = useNavigate();

  // 1. 상태 관리 (데이터)
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
    name: '김코딩',
    year: '2000'
  });

  const [selectedCultures, setSelectedCultures] = useState(['한식']);
  const [selectedMethods, setSelectedMethods] = useState(['구이']);
  const [selectedLifeStyles, setSelectedLifeStyles] = useState(['도시락']);
  const [showToast, setShowToast] = useState(false);

  const cultures = ['한식', '일식', '양식', '중식', '아시안'];
  const methods = ['볶음', '국/찌개', '구이', '생식', '조림/찜'];
  const lifeStyles = ['초간단', '한그릇', '술안주', '도시락', '다이어트'];
  const years = Array.from({ length: 100 }, (_, i) => 2026 - i);

  const isPasswordMismatch = formData.newPassword && formData.confirmPassword && (formData.newPassword !== formData.confirmPassword);

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

  // --- 저장 버튼 핸들러 (수정됨) ---
  const handleSave = () => {
    // 유효성 검사
    if (!formData.name) {
      alert("이름은 필수 항목입니다.");
      return;
    }
    if (isPasswordMismatch) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    // [나중에 백엔드 연동할 위치]
    console.log("저장 데이터:", { ...formData, selectedCultures, selectedMethods, selectedLifeStyles });

    setShowToast(true);

    setTimeout(() => {
        navigate('/mypage'); 
    }, 1500);
  };

  // 토스트 메시지 타이머 (메시지 자체를 안 보이게 하는 로직)
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="edit-container">
      {/* 헤더 */}
      <div className="header-area">
        <button className="back-btn" onClick={() => navigate(-1)}>&lt;</button>
        <h1 className="title">마이페이지</h1>
      </div>

      {/* 인사말 */}
      <div className="greeting-area">
        <span className="user-name">{formData.name}</span>
        <span className="user-suffix">님</span>
      </div>

      <div className="form-content">
        
        {/* 새 비밀번호 */}
        <div className="input-group">
          <label>새 비밀번호</label>
          <input 
            type="password" 
            name="newPassword"
            className="main-input" 
            placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)" 
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        {/* 새 비밀번호 확인 */}
        <div className="input-group">
          <label>새 비밀번호 확인</label>
          <input 
            type="password" 
            name="confirmPassword"
            // 에러 시 빨간 테두리 클래스 추가
            className={`main-input ${isPasswordMismatch ? 'input-error' : ''}`} 
            placeholder="비밀번호 재입력" 
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {/* 이름 */}
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

        {/* 출생 연도 */}
        <div className="input-group">
          <label>출생 연도</label>
          <select name="year" className="main-input" value={formData.year} onChange={handleChange}>
            <option value="">년도</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {/* 요리 문화 */}
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

        {/* 조리 방식 */}
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

        {/* 라이프 스타일 */}
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

        {/* 저장 버튼 */}
        <button className="submit-button" onClick={handleSave}>저장</button>
      </div>

      {/* 토스트 팝업 */}
      {showToast && (
        <div className="toast-message">
          정보가 저장되었습니다.
        </div>
      )}
    </div>
  );
};

export default EditProfile;