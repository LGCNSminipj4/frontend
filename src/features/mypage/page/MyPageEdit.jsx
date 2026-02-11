import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../../../components/common/PageHeader';

import { 
  Container, 
  ContentArea, 
  InputGroup, 
  Label, 
  StyledInput, 
  StyledSelect, 
  ChipGrid, 
  ChipButton, 
  PrimaryButton 
} from '../../../components/common/CommonStyles';

import { 
  UserGreetingArea, 
  GreetingTitle, 
  ToastMessage 
} from '../../../components/common/Styles';

const EditProfile = () => {
  const navigate = useNavigate();

  // 1. 상태 관리 (데이터)
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
    name: '김코딩',
    birth_year: '2000'
  });

  const [selectedCultures, setSelectedCultures] = useState(['한식']);
  const [selectedMethods, setSelectedMethods] = useState(['구이']);
  const [selectedLifeStyles, setSelectedLifeStyles] = useState(['도시락']);
  const [showToast, setShowToast] = useState(false);

  const cultures = ['한식', '일식', '양식', '중식', '아시안'];
  const methods = ['볶음', '국/찌개', '구이', '생식', '조림/찜'];
  const lifeStyles = ['초간단', '한그릇', '술안주', '도시락', '다이어트'];
  const years = Array.from({ length: 100 }, (_, i) => 2026 - i);

  // 비밀번호 불일치 여부 확인
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

  // --- 저장 버튼 핸들러 ---
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

  // 토스트 메시지 타이머
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <Container>
      <PageHeader title="회원정보 수정" />

      <UserGreetingArea>
        <GreetingTitle>
            {formData.name}<span>님</span>
        </GreetingTitle>
      </UserGreetingArea>

      <ContentArea>
        <InputGroup>
          <Label>새 비밀번호</Label>
          <StyledInput 
            type="password" 
            name="newPassword"
            placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)" 
            value={formData.newPassword}
            onChange={handleChange}
          />
        </InputGroup>

        {/* 새 비밀번호 확인 */}
        <InputGroup>
          <Label>새 비밀번호 확인</Label>
          <StyledInput 
            type="password" 
            name="confirmPassword"
            $isError={isPasswordMismatch} 
            placeholder="비밀번호 재입력" 
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </InputGroup>

        {/* 이름 */}
        <InputGroup>
          <Label>이름</Label>
          <StyledInput 
            type="text" 
            name="name"
            placeholder="이름을 입력해주세요" 
            value={formData.name}
            onChange={handleChange}
          />
        </InputGroup>

        {/* 출생 연도 */}
        <InputGroup>
          <Label>출생 연도</Label>
          <StyledSelect name="year" value={formData.year} onChange={handleChange}>
            <option value="">년도</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </StyledSelect>
        </InputGroup>

        {/* 요리 문화 */}
        <InputGroup>
          <Label>요리 문화</Label>
          <ChipGrid>
            {cultures.map((item) => (
              <ChipButton
                key={item}
                $isActive={selectedCultures.includes(item)}
                onClick={() => toggleSelection(item, selectedCultures, setSelectedCultures)}
              >
                {item}
              </ChipButton>
            ))}
          </ChipGrid>
        </InputGroup>

        {/* 조리 방식 */}
        <InputGroup>
          <Label>조리 방식</Label>
          <ChipGrid>
            {methods.map((item) => (
              <ChipButton
                key={item}
                $isActive={selectedMethods.includes(item)}
                onClick={() => toggleSelection(item, selectedMethods, setSelectedMethods)}
              >
                {item}
              </ChipButton>
            ))}
          </ChipGrid>
        </InputGroup>

        {/* 라이프 스타일 */}
        <InputGroup>
          <Label>라이프 스타일</Label>
          <ChipGrid>
            {lifeStyles.map((item) => (
              <ChipButton
                key={item}
                $isActive={selectedLifeStyles.includes(item)}
                onClick={() => toggleSelection(item, selectedLifeStyles, setSelectedLifeStyles)}
              >
                {item}
              </ChipButton>
            ))}
          </ChipGrid>
        </InputGroup>

        {/* 저장 버튼 (상단 여백 추가) */}
        <div style={{ marginTop: '30px' }}>
            <PrimaryButton onClick={handleSave}>저장</PrimaryButton>
        </div>
      </ContentArea>

      {/* 토스트 팝업 */}
      {showToast && (
        <ToastMessage>
          정보가 저장되었습니다.
        </ToastMessage>
      )}
    </Container>
  );
};

export default EditProfile;