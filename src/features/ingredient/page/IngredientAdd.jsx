import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
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

// ================= [가짜 데이터 시작] =================
const mockDatabase = {
    "우유": { storageType: "냉장", defaultExpiryDays: 10 },
    "계란": { storageType: "냉장", defaultExpiryDays: 30 },
    "삼겹살": { storageType: "냉동", defaultExpiryDays: 180 },
    "사과": { storageType: "냉장", defaultExpiryDays: 14 },
    "감자": { storageType: "실온", defaultExpiryDays: 20 }
};
// ================= [가짜 데이터 끝] =================

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

    const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
    const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

    // --- 날짜 계산 로직 ---
    const updateExpiryDate = (currentData) => {
        const name = currentData.name.trim();
        if (mockDatabase[name] && currentData.regYear && currentData.regMonth && currentData.regDay) {
            const regDate = new Date(
                Number(currentData.regYear),
                Number(currentData.regMonth) - 1,
                Number(currentData.regDay)
            );
            
            regDate.setDate(regDate.getDate() + mockDatabase[name].defaultExpiryDays);
            
            return {
                expYear: String(regDate.getFullYear()),
                expMonth: String(regDate.getMonth() + 1).padStart(2, '0'),
                expDay: String(regDate.getDate()).padStart(2, '0')
            };
        }
        return null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setIngredient(prev => {
            const next = { ...prev, [name]: value };
            
            if (['regYear', 'regMonth', 'regDay'].includes(name)) {
                const autoDate = updateExpiryDate(next);
                if (autoDate) {
                    next.expYear = autoDate.expYear;
                    next.expMonth = autoDate.expMonth;
                    next.expDay = autoDate.expDay;
                }
            }
            return next;
        });
    };

    const handleAutoFill = () => {
        const name = ingredient.name.trim();
        if (!name) return;

        if (mockDatabase[name]) {
            const info = mockDatabase[name];
            const autoDate = updateExpiryDate({ ...ingredient, name });

            setIngredient(prev => ({
                ...prev,
                storageType: info.storageType,
                ...(autoDate && {
                    expYear: autoDate.expYear,
                    expMonth: autoDate.expMonth,
                    expDay: autoDate.expDay
                })
            }));
            setToastText(`'${name}' 정보를 불러왔습니다.`);
            setShowToast(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ingredient.name) {
            setToastText("재료명을 입력해주세요");
            setShowToast(true);
            return;
        }

        alert(`${ingredient.name} 등록 완료!`);
        navigate('/fridge'); 
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
                <InputGroup>
                    <Label>재료명</Label>
                    <StyledInput 
                        type="text" name="name" 
                        placeholder="재료명을 입력하세요"
                        value={ingredient.name} 
                        onChange={handleChange} 
                        onBlur={handleAutoFill} 
                    />
                </InputGroup>

                <InputGroup>
                    <Label>용량</Label>
                    <StyledInput 
                        type="number" 
                        name="amount" 
                        placeholder="용량을 입력하세요(숫자)" 
                        value={ingredient.amount} 
                        onChange={handleChange} 
                    />
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
                    <Label>소비기한 (자동계산)</Label>
                    <FlexRow>
                        <StyledSelect name="expYear" value={ingredient.expYear} onChange={handleChange}>
                            <option value="">년도</option>
                            {years.map(y => <option key={y} value={String(y)}>{y}년</option>)}
                        </StyledSelect>
                        <StyledSelect name="expMonth" value={ingredient.expMonth} onChange={handleChange}>
                            <option value="">월</option>
                            {months.map(m => <option key={m} value={m}>{m}월</option>)}
                        </StyledSelect>
                        <StyledSelect name="expDay" value={ingredient.expDay} onChange={handleChange}>
                            <option value="">일</option>
                            {days.map(d => <option key={d} value={d}>{d}일</option>)}
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

            {showToast && <ToastMessage>{toastText}</ToastMessage>}
        </Container>
    );
};

export default IngredientAdd;