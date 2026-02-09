import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components'; // keyframes 추가
import { useNavigate } from 'react-router-dom';

import { 
    Container, 
    InputGroup, 
    Label, 
    StyledInput, 
    StyledSelect,
    PrimaryButton
} from '../../../components/common/CommonStyles';
import PageHeader from '../../../components/common/PageHeader';

// --- 페이지 전용 스타일 ---

const FlexRow = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

const ButtonContainer = styled.div`
    margin-top: 50px;
    padding-bottom: 30px;
`;

// --- 토스트 팝업 스타일 (추가됨) ---
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

const IngredientAdd = () => {
    const navigate = useNavigate();

    const [ingredient, setIngredient] = useState({
        name: '',
        amount: '',
        unit: 'ml',
        regYear: '', regMonth: '', regDay: '',
        expYear: '', expMonth: '', expDay: '',
        category: ''
    });

    // 토스트 상태 관리
    const [showToast, setShowToast] = useState(false);

    const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIngredient({ ...ingredient, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 유효성 검사: 재료명이 없으면 토스트 띄우기
        if (!ingredient.name) {
            setShowToast(true);
            return;
        }
        
        console.log("새로 등록할 데이터:", ingredient);
        alert('새로운 재료가 등록되었습니다!');
        navigate('/fridge'); 
    };

    // 토스트 타이머 (2초 후 사라짐)
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
            <PageHeader title="재료 추가" />

            <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <InputGroup>
                    <Label>재료명</Label>
                    <StyledInput 
                        type="text" 
                        name="name" 
                        placeholder="재료 이름을 입력하세요"
                        value={ingredient.name} 
                        onChange={handleChange} 
                    />
                </InputGroup>

                <InputGroup>
                    <Label>용량</Label>
                    <FlexRow>
                        <StyledInput 
                            type="number" 
                            name="amount" 
                            placeholder="0"
                            value={ingredient.amount} 
                            onChange={handleChange}
                            style={{ flex: 1 }}
                        />
                        <StyledSelect 
                            name="unit" 
                            value={ingredient.unit} 
                            onChange={handleChange}
                            style={{ flex: 1 }}
                        >
                            <option value="ml">ml</option>
                            <option value="g">g</option>
                            <option value="개">개</option>
                        </StyledSelect>
                    </FlexRow>
                </InputGroup>

                <InputGroup>
                    <Label>등록일</Label>
                    <FlexRow>
                        <StyledSelect name="regYear" value={ingredient.regYear} onChange={handleChange}>
                            <option value="">년도</option>
                            {years.map(y => <option key={y} value={y}>{y}년</option>)}
                        </StyledSelect>
                        <StyledSelect name="regMonth" value={ingredient.regMonth} onChange={handleChange}>
                            <option value="">월</option>
                            {months.map(m => <option key={m} value={m < 10 ? `0${m}` : m}>{m}월</option>)}
                        </StyledSelect>
                        <StyledSelect name="regDay" value={ingredient.regDay} onChange={handleChange}>
                            <option value="">일</option>
                            {days.map(d => <option key={d} value={d < 10 ? `0${d}` : d}>{d}일</option>)}
                        </StyledSelect>
                    </FlexRow>
                </InputGroup>

                <InputGroup>
                    <Label>소비기한</Label>
                    <FlexRow>
                        <StyledSelect name="expYear" value={ingredient.expYear} onChange={handleChange}>
                            <option value="">년도</option>
                            {years.map(y => <option key={y} value={y}>{y}년</option>)}
                        </StyledSelect>
                        <StyledSelect name="expMonth" value={ingredient.expMonth} onChange={handleChange}>
                            <option value="">월</option>
                            {months.map(m => <option key={m} value={m < 10 ? `0${m}` : m}>{m}월</option>)}
                        </StyledSelect>
                        <StyledSelect name="expDay" value={ingredient.expDay} onChange={handleChange}>
                            <option value="">일</option>
                            {days.map(d => <option key={d} value={d < 10 ? `0${d}` : d}>{d}일</option>)}
                        </StyledSelect>
                    </FlexRow>
                </InputGroup>

                <InputGroup>
                    <Label>카테고리</Label>
                    <StyledSelect name="category" value={ingredient.category} onChange={handleChange}>
                        <option value="">카테고리 선택</option>
                        <option value="유제품">유제품</option>
                        <option value="고기">고기</option>
                        <option value="채소">채소</option>
                        <option value="과일">과일</option>
                        <option value="기타">기타</option>
                    </StyledSelect>
                </InputGroup>

                <ButtonContainer>
                    <PrimaryButton type="submit">등록</PrimaryButton>
                </ButtonContainer>
            </form>

            {/* 토스트 메시지 렌더링 */}
            {showToast && <ToastMessage>재료명을 입력해주세요</ToastMessage>}
        </Container>
    );
};

export default IngredientAdd;