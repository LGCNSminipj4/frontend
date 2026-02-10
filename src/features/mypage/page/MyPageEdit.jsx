import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import { 
  Container, 
  InputGroup, 
  Label, 
  StyledInput, 
  StyledSelect,
  PrimaryButton,
  ChipButton
} from "../../../components/common/CommonStyles"; 

import PageHeader from "../../../components/common/PageHeader";

// --- 스타일 수정 및 추가 ---

const DateGroup = styled.div`
    display: flex;
    gap: 10px;
`;

// 기본 화살표를 보이게 하는 확장 스타일
const ArrowSelect = styled(StyledSelect)`
    appearance: auto; 
    -webkit-appearance: menulist;
    padding-right: 10px;
`;

const TagGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

// 토스트 애니메이션
const fadeInOut = keyframes`
  0% { opacity: 0; transform: translate(-50%, 20px); }
  10% { opacity: 1; transform: translate(-50%, 0); }
  90% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, 20px); }
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
    z-index: 1000;
    white-space: nowrap;
    animation: ${fadeInOut} 2s ease-in-out forwards;
`;

const YEARS = Array.from({ length: 100 }, (_, i) => 2026 - i);

const MyPageEdit = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [name, setName] = useState("");
    
    const [birthDate, setBirthDate] = useState({
        year: ""
    });

    const [selectedTags, setSelectedTags] = useState({
        culture: [],
        method: [],
        lifestyle: []
    });

    // 토스트 상태 및 메시지 관리
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const isPasswordMismatch = password && confirmPw && password !== confirmPw;

    const toggleTag = (category, tag) => {
        setSelectedTags((prev) => {
            const currentList = prev[category];
            if (currentList.includes(tag)) {
                return { ...prev, [category]: currentList.filter((t) => t !== tag) };
            } else {
                return { ...prev, [category]: [...currentList, tag] };
            }
        });
    };

    const handleSave = () => {
        // 1. 빈 값 체크
        if (
            !password ||
            !confirmPw ||
            !name ||
            !birthDate.year ||
            selectedTags.culture.length === 0 ||
            selectedTags.method.length === 0 ||
            selectedTags.lifestyle.length === 0
        ) {
            setToastMessage("모두 작성해 주세요");
            setShowToast(true);
            return;
        }

        // 2. 비밀번호 불일치 체크
        if (isPasswordMismatch) {
            return;
        }

        // 3. 성공 처리 (토스트 띄우고 이동)
        setToastMessage("회원정보가 수정되었습니다.");
        setShowToast(true);

        setTimeout(() => {
            navigate('/mypage', { replace: true }); 
        }, 1500); // 1.5초 후 이동
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setBirthDate(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    return (
        <Container>
            <PageHeader title="마이페이지" />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: '20px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '30px', color: '#222' }}>
                    xx님
                </h2>

                <InputGroup>
                    <Label>새 비밀번호</Label>
                    <StyledInput 
                        type="password" 
                        placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputGroup>

                <InputGroup>
                    <Label>새 비밀번호 확인</Label>
                    <StyledInput 
                        type="password" 
                        placeholder="비밀번호 재입력" 
                        value={confirmPw}
                        onChange={(e) => setConfirmPw(e.target.value)}
                        $isError={isPasswordMismatch}
                    />
                </InputGroup>

                <InputGroup>
                    <Label>이름</Label>
                    <StyledInput 
                        type="text" 
                        placeholder="이름을 입력해주세요" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </InputGroup>

                <InputGroup>
                    <Label>출생 연도</Label>
                    <DateGroup>
                        <ArrowSelect name="year" value={birthDate.year} onChange={handleDateChange}>
                            <option value="" disabled>년도</option>
                            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        </ArrowSelect>
                    </DateGroup>
                </InputGroup>

                <InputGroup>
                    <Label>요리 문화 (중복 선택 가능)</Label>
                    <TagGrid>
                        {["한식", "일식", "양식", "중식", "아시안"].map((tag) => (
                            <ChipButton
                                key={tag}
                                $isActive={selectedTags.culture.includes(tag)}
                                onClick={() => toggleTag("culture", tag)}
                            >
                                {tag}
                            </ChipButton>
                        ))}
                    </TagGrid>
                </InputGroup>

                <InputGroup>
                    <Label>조리 방식 (중복 선택 가능)</Label>
                    <TagGrid>
                        {["볶음", "국/찌개", "구이", "생식", "조림/찜"].map((tag) => (
                            <ChipButton
                                key={tag}
                                $isActive={selectedTags.method.includes(tag)}
                                onClick={() => toggleTag("method", tag)}
                            >
                                {tag}
                            </ChipButton>
                        ))}
                    </TagGrid>
                </InputGroup>

                <InputGroup>
                    <Label>라이프 스타일 (중복 선택 가능)</Label>
                    <TagGrid>
                        {["초간단", "한그릇", "술안주", "도시락", "다이어트"].map((tag) => (
                            <ChipButton
                                key={tag}
                                $isActive={selectedTags.lifestyle.includes(tag)}
                                onClick={() => toggleTag("lifestyle", tag)}
                            >
                                {tag}
                            </ChipButton>
                        ))}
                    </TagGrid>
                </InputGroup>

                <PrimaryButton onClick={handleSave}>저장</PrimaryButton>
            </div>

            {showToast && <ToastMessage>{toastMessage}</ToastMessage>}
        </Container>
    );
};

export default MyPageEdit;