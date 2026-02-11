import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../../api/axios'; 

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
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  // 1. 상태 관리
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
    name: '',       
    birth_year: ''  
  });

  const [selectedCultures, setSelectedCultures] = useState([]);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [selectedLifeStyles, setSelectedLifeStyles] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const cultures = ['한식', '일식', '양식', '중식', '아시안'];
  const methods = ['볶음', '국/찌개', '구이', '생식', '조림/찜'];
  const lifeStyles = ['초간단', '한그릇', '술안주', '도시락', '다이어트'];
  const years = Array.from({ length: 100 }, (_, i) => 2026 - i);

  // 2. [API 연동] 페이지 로드 시 내 정보 불러오기 (GET)
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            // [GET 요청] 백엔드 주소가 '/users/info'라고 가정
            const response = await api.get('/users/info');
            const data = response.data;

            console.log("불러온 내 정보:", data);

            // 받아온 데이터로 화면 채우기
            setFormData({
                name: data.name || '',
                birth_year: data.birth_year || '',
                newPassword: '', // 비밀번호는 보안상 보통 비워둠
                confirmPassword: ''
            });

            // 태그 정보가 있다면 채우기 (백엔드 구조에 따라 수정 필요)
            if (data.preferences) {
                setSelectedCultures(data.preferences.culture || []);
                setSelectedMethods(data.preferences.method || []);
                setSelectedLifeStyles(data.preferences.lifestyle || []);
            }

        } catch (err) {
            console.error("내 정보 불러오기 실패:", err);
            // 에러 시 처리 (로그인 안 된 경우 등)
            // alert("정보를 불러오지 못했습니다.");
        } finally {
            setIsLoading(false);
        }
    };
    fetchUserData();
  }, []);

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

  // 3. [API 연동] 저장 버튼 핸들러 (PUT or POST)
  const handleSave = async () => {
    // 유효성 검사
    if (!formData.name) {
      alert("이름은 필수 항목입니다.");
      return;
    }
    if (isPasswordMismatch) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    // 전송할 데이터 준비
    const payload = {
        name: formData.name,
        // 비밀번호가 입력되었을 때만 전송 (비어있으면 변경 안 함)
        password: formData.newPassword || undefined, 
        birth_year: formData.birth_year,
        // 태그 정보 묶어서 보내기
        preferences: {
            culture: selectedCultures,
            method: selectedMethods,
            lifestyle: selectedLifeStyles
        }
    };
    
    console.log("서버로 보낼 수정 데이터:", payload);

    try {
        // [PUT 요청] 정보 수정은 보통 PUT 사용 (백엔드에 확인 필요)
        await api.put('/users/info', payload); 

        // 저장 성공 처리
        setShowToast(true);
        setTimeout(() => {
            // 수정 후 마이페이지나 메인으로 이동
            navigate('/mypage'); 
        }, 1500);

    } catch (error) {
        console.error("정보 수정 실패:", error);
        alert("정보 저장에 실패했습니다.");
    }
  };

  // 토스트 메시지 타이머
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (isLoading) {
      return <Container><ContentArea>정보를 불러오는 중...</ContentArea></Container>;
  }

  return (
    <Container>
      <PageHeader title="회원정보 수정" />

      <UserGreetingArea>
        <GreetingTitle>
            {formData.name || '회원'}<span>님</span>
        </GreetingTitle>
      </UserGreetingArea>

      <ContentArea>
        <InputGroup>
          <Label>새 비밀번호</Label>
          <StyledInput 
            type="password" 
            name="newPassword"
            placeholder="변경할 경우에만 입력하세요" 
            value={formData.newPassword}
            onChange={handleChange}
          />
        </InputGroup>

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

        <InputGroup>
          <Label>출생 연도</Label>
          <StyledSelect 
            name="birth_year" 
            value={formData.birth_year} 
            onChange={handleChange}
          >
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

        <div style={{ marginTop: '30px' }}>
            <PrimaryButton onClick={handleSave}>저장</PrimaryButton>
        </div>
      </ContentArea>

      {showToast && (
        <ToastMessage>
          정보가 저장되었습니다.
        </ToastMessage>
      )}
    </Container>
  );
};

export default EditProfile;