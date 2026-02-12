import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';

import { 
    Container, 
    InputGroup, 
    Label, 
    StyledInput, 
    StyledSelect,
    PrimaryButton
} from '../../../components/common/CommonStyles';
import PageHeader from '../../../components/common/PageHeader';

// --- 스타일 및 애니메이션 ---
const FlexRow = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

const ButtonContainer = styled.div`
    margin-top: 50px;
    padding-bottom: 30px;
`;

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
    const today = new Date();
    
    const [ingredient, setIngredient] = useState({
        name: '',
        amount: '',
        regYear: String(today.getFullYear()),
        regMonth: String(today.getMonth() + 1).padStart(2, '0'),
        regDay: String(today.getDate()).padStart(2, '0'),
        expYear: '', expMonth: '', expDay: '',
        storageType: '냉장'
    });

    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState("");

    // 토스트 띄우기 함수 (재사용을 위해 분리)
    const triggerToast = (text) => {
        setToastText(text);
        setShowToast(true);
    };

    const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
    const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

    const expYears = years.filter(y => y >= Number(ingredient.regYear));

    const expMonths = months.filter(m => {
        if (Number(ingredient.expYear) === Number(ingredient.regYear)) {
            return Number(m) >= Number(ingredient.regMonth);
        }
        return true;
    });

    const expDays = days.filter(d => {
        if (Number(ingredient.expYear) === Number(ingredient.regYear) && 
            Number(ingredient.expMonth) === Number(ingredient.regMonth)) {
            return Number(d) >= Number(ingredient.regDay);
        }
        return true;
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIngredient(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token'); 

        if (!token || token === "undefined") {
            triggerToast("로그인 정보가 만료되었습니다.");
            setTimeout(() => navigate('/'), 1500);
            return;
        }

        // 유효성 검사 (추가)
        if (!ingredient.name || !ingredient.expYear) {
            triggerToast("재료명과 소비기한을 입력해주세요.");
            return;
        }

        const requestData = {
            ingredientsName: ingredient.name,
            amount: Number(ingredient.amount) || 0,
            storageDate: `${ingredient.regYear}-${ingredient.regMonth}-${ingredient.regDay}`,
            expirationDate: `${ingredient.expYear}-${ingredient.expMonth}-${ingredient.expDay}`,
            storageCondition: ingredient.storageType,
            customDate: ""
        };

        try {
            const response = await api.post('/ingredients/insert', requestData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            
            if (response.status === 200 || response.status === 201) {
                // [수정] alert 대신 토스트 띄우고 이동
                triggerToast(`${ingredient.name} 등록 완료!`);
                setTimeout(() => navigate('/fridge'), 1500); 
            }
        } catch (error) {
            console.error("등록 실패 디버깅:", error.response);
            
            if (error.response?.status === 403) {
                triggerToast("권한이 없습니다. 다시 로그인해 주세요.");
                localStorage.removeItem('token');
                setTimeout(() => navigate('/signin'), 1500);
            } else {
                triggerToast("서버 연결 실패. 다시 시도해주세요.");
            }
        }
    };

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    return (
        <Container>
            <PageHeader title="재료 추가" />

            <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* ... (기존 InputGroup 내용들 동일) ... */}
                
                <InputGroup>
                    <Label>재료명</Label>
                    <StyledInput 
                        type="text" name="name" 
                        placeholder="재료명을 입력하세요"
                        value={ingredient.name} 
                        onChange={handleChange} 
                    />
                </InputGroup>

                {/* 용량, 등록일, 소비기한, 보관방식 select 박스들 동일하게 유지 */}
                {/* ... 생략 ... */}

                <InputGroup>
                    <Label>용량</Label>
                    <StyledInput type="number" name="amount" value={ingredient.amount} onChange={handleChange} />
                </InputGroup>

                <InputGroup>
                    <Label>등록일</Label>
                    <FlexRow>
                        <StyledSelect name="regYear" value={ingredient.regYear} onChange={handleChange}>
                            {years.map(y => <option key={y} value={String(y)}>{y}년</option>)}
                        </StyledSelect>
                        <StyledSelect name="regMonth" value={ingredient.regMonth} onChange={handleChange}>
                            {months.map(m => <option key={m} value={m}>{m}월</option>)}
                        </StyledSelect>
                        <StyledSelect name="regDay" value={ingredient.regDay} onChange={handleChange}>
                            {days.map(d => <option key={d} value={d}>{d}일</option>)}
                        </StyledSelect>
                    </FlexRow>
                </InputGroup>

            <InputGroup>
                <Label>소비기한</Label>
                <FlexRow>
                    <StyledSelect name="expYear" value={ingredient.expYear} onChange={handleChange}>
                        <option value="">년도</option>
                        {expYears.map(y => <option key={y} value={String(y)}>{y}년</option>)}
                    </StyledSelect>
                    <StyledSelect 
                        name="expMonth" 
                        value={ingredient.expMonth} 
                        onChange={handleChange}
                        disabled={!ingredient.expYear}
                    >
                        <option value="">월</option>
                        {expMonths.map(m => <option key={m} value={m}>{m}월</option>)}
                    </StyledSelect>
                    <StyledSelect 
                        name="expDay" 
                        value={ingredient.expDay} 
                        onChange={handleChange}
                        disabled={!ingredient.expMonth}
                    >
                        <option value="">일</option>
                        {expDays.map(d => <option key={d} value={d}>{d}일</option>)}
                    </StyledSelect>
                </FlexRow>
            </InputGroup>

                <InputGroup>
                    <Label>보관 방식</Label>
                    <StyledSelect name="storageType" value={ingredient.storageType} onChange={handleChange}>
                        <option value="냉장">냉장</option>
                        <option value="냉동">냉동</option>
                        <option value="실온">실온</option>
                    </StyledSelect>
                </InputGroup>

                <ButtonContainer>
                    <PrimaryButton type="submit">등록</PrimaryButton>
                </ButtonContainer>
            </form>

            {/* 토스트 메시지 렌더링 */}
            {showToast && <ToastMessage>{toastText}</ToastMessage>}
        </Container>
    );
};

export default IngredientAdd;