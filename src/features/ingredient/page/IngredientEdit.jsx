import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { 
    Container, 
    InputGroup, 
    Label, 
    StyledInput, 
    StyledSelect 
} from '../../../components/common/CommonStyles';
import PageHeader from '../../../components/common/PageHeader';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translate(-50%, 20px); opacity: 0; }
  to { transform: translate(-50%, 0); opacity: 1; }
`;

// --- 스타일 컴포넌트 ---
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
    z-index: 3000;
    white-space: nowrap;
    animation: ${slideUp} 0.3s ease-out;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    animation: ${fadeIn} 0.2s ease-out;
`;

const ModalContent = styled.div`
    background: white;
    padding: 24px;
    border-radius: 16px;
    width: 80%;
    max-width: 300px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
`;

const ModalTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
`;

const ModalButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const ModalButton = styled.button`
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    background: ${props => props.$primary ? '#333' : '#eee'};
    color: ${props => props.$primary ? 'white' : '#666'};
    transition: background 0.2s;

    &:active {
        background: ${props => props.$primary ? '#000' : '#ddd'};
    }
`;

const FlexRow = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

const EditButtonGroup = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column; // 세로 정렬로 변경하여 밑에 추가하기 용이하게 함
    align-items: center;
    gap: 15px;
    padding-bottom: 30px;
`;

const MainButtons = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    width: 100%;
`;

const ActionButton = styled.button`
    border: none;
    padding: 15px 0;
    width: 140px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    background-color: #00C4B4;
    color: #FFFFFF;
    transition: background 0.2s;

    &:hover { background-color: #00a89a; }

    ${(props) => props.$isDelete && `
        background-color: #00C4B4;
        color: #FFFFFF;
        &:hover {
            background-color: #f28d8d;
            color: #FFFFFF;
        }
    `}

    ${(props) => props.$isFullWidth && `
        width: 295px;
        background-color: #00C4B4;
        color: #FFFFFF;
        &:hover { background-color: #00a89a; }
    `}
`;

const IngredientEdit = () => {
    const navigate = useNavigate();

    const [ingredient, setIngredient] = useState({
        name: '',
        amount: '',
        regYear: '', regMonth: '', regDay: '',
        expYear: '', expMonth: '', expDay: '',
        storageType: ''
    });
    
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const triggerToast = (text) => {
        setToastText(text);
        setShowToast(true);
    };

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIngredient(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        
        if (!ingredient.name.trim()) return triggerToast('재료명을 입력해주세요.');
        if (!ingredient.amount || ingredient.amount <= 0) return triggerToast('용량을 입력해주세요.');
        if (!ingredient.regYear || !ingredient.regMonth || !ingredient.regDay) return triggerToast('등록일을 모두 선택해주세요.');
        if (!ingredient.expYear || !ingredient.expMonth || !ingredient.expDay) return triggerToast('소비기한을 모두 선택해주세요.');
        if (!ingredient.storageType) return triggerToast('보관 방식을 선택해주세요.');

        triggerToast('성공적으로 저장되었습니다.');
        setTimeout(() => navigate('/fridge'), 1500);
    };

    const handleConsumption = () => {
        // 실제 연동 시: await api.moveToConsumption(ingredient.id);
        triggerToast(`${ingredient.name || '재료'}가 모두 소비 되었습니다.`);
        
        setTimeout(() => {
            navigate('/fridge');
        }, 1500);
    };

    const confirmDelete = () => {
        setShowDeleteModal(false);
        triggerToast('재료가 삭제되었습니다.');
        setTimeout(() => navigate('/fridge'), 1500);
    };

    const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
    const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

    return (
        <Container>
            <PageHeader title="재료 수정" />

            <form onSubmit={handleSave} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <InputGroup>
                    <Label>재료명</Label>
                    <StyledInput 
                        type="text" name="name" 
                        placeholder="재료명을 입력하세요" 
                        value={ingredient.name} onChange={handleChange} 
                    />
                </InputGroup>

                <InputGroup>
                    <Label>용량</Label>
                    <StyledInput 
                        type="number" name="amount" 
                        placeholder="용량을 입력하세요 (숫자)" 
                        value={ingredient.amount} 
                        onChange={handleChange} 
                    />
                </InputGroup>

                <InputGroup>
                    <Label>등록일</Label>
                    <FlexRow>
                        <StyledSelect name="regYear" value={ingredient.regYear} onChange={handleChange}>
                            <option value="">년도</option>
                            {years.map(y => <option key={y} value={String(y)}>{y}년</option>)}
                        </StyledSelect>
                        <StyledSelect name="regMonth" value={ingredient.regMonth} onChange={handleChange}>
                            <option value="">월</option>
                            {months.map(m => <option key={m} value={m}>{m}월</option>)}
                        </StyledSelect>
                        <StyledSelect name="regDay" value={ingredient.regDay} onChange={handleChange}>
                            <option value="">일</option>
                            {days.map(d => <option key={d} value={d}>{d}일</option>)}
                        </StyledSelect>
                    </FlexRow>
                </InputGroup>

                <InputGroup>
                    <Label>소비기한</Label>
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
                        <option value="">선택</option>
                        <option value="냉장">냉장</option>
                        <option value="냉동">냉동</option>
                        <option value="실온">실온</option>
                    </StyledSelect>
                </InputGroup>

                <EditButtonGroup>
                    <MainButtons>
                        <ActionButton type="button" $isDelete onClick={() => setShowDeleteModal(true)}>재료 삭제</ActionButton>
                        <ActionButton type="submit">저장</ActionButton>
                    </MainButtons>
                    <ActionButton type="button" $isFullWidth onClick={handleConsumption}>
                        소비 완료
                    </ActionButton>
                </EditButtonGroup>
            </form>

            {showDeleteModal && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalTitle>정말 삭제하시겠습니까?</ModalTitle>
                        <ModalButtonGroup>
                            <ModalButton onClick={() => setShowDeleteModal(false)}>취소</ModalButton>
                            <ModalButton $primary onClick={confirmDelete}>삭제</ModalButton>
                        </ModalButtonGroup>
                    </ModalContent>
                </ModalOverlay>
            )}

            {showToast && <ToastMessage>{toastText}</ToastMessage>}
        </Container>
    );
};

export default IngredientEdit;