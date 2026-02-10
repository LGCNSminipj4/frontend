import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { 
    Container, 
    InputGroup, 
    Label, 
    StyledInput, 
    StyledSelect 
} from '../../../components/common/CommonStyles';
import PageHeader from '../../../components/common/PageHeader';

// --- 페이지 전용 스타일 ---

const FlexRow = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

const EditButtonGroup = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: center;
    gap: 15px;
    padding-bottom: 30px;
`;

const ActionButton = styled.button`
    border: none;
    padding: 15px 0;
    width: 140px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    background-color: #d9d9d9;
    color: #333;
    transition: background 0.2s;

    &:hover {
        background-color: #ccc;
    }

    /* 삭제 버튼일 경우 빨간색 스타일 적용 (옵션) */
    ${(props) => props.$isDelete && `
        &:hover {
            background-color: #f28d8d;
            color: white;
        }
    `}
`;

const IngredientEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const item = location.state || {}; // 실제 데이터 연동 시 사용

    const [ingredient, setIngredient] = useState({
        name: '',
        amount: '',
        unit: 'ml',
        regYear: '', regMonth: '', regDay: '',
        expYear: '', expMonth: '', expDay: '',
        category: ''
    });

    const years = Array.from({ length: 11 }, (_, i) => 2026 - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIngredient({ ...ingredient, [name]: value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!ingredient.name) return alert('재료명을 입력해주세요.');
        alert('저장되었습니다!');
        navigate('/fridge'); // 저장 후 뒤로가기
    };

    const handleDelete = () => {
        if (window.confirm('정말 이 재료를 삭제하시겠습니까?')) {
            alert('재료가 리스트에서 삭제되었습니다.');
            navigate('/fridge');
        }
    };

    return (
        <Container>
            <PageHeader title="재료 수정" />

            <form onSubmit={handleSave} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                    <Label>보관 방식</Label>
                    <StyledSelect name="storageType" value={ingredient.storageType} onChange={handleChange}>
                        <option value="냉장">냉장</option>
                        <option value="냉동">냉동</option>
                        <option value="실온">실온</option>
                    </StyledSelect>
                </InputGroup>

                <EditButtonGroup>
                    <ActionButton type="button" $isDelete onClick={handleDelete}>
                        재료 삭제
                    </ActionButton>
                    <ActionButton type="submit">
                        저장
                    </ActionButton>
                </EditButtonGroup>
            </form>
        </Container>
    );
};

export default IngredientEdit;