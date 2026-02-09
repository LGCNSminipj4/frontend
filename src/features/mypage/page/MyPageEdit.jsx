import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    max-width: 375px;
    margin: 0 auto;
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-bottom: 40px;
    position: relative;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    position: relative;
    margin-bottom: 10px;
`;

const BackIcon = styled.div`
    position: absolute;
    left: 16px;
    cursor: pointer;
    font-size: 20px;
    color: #888;
`;

const HeaderTitle = styled.h1`
    font-size: 18px;
    font-weight: normal;
    color: #000;
    margin: 0;
`;

const Content = styled.div`
    padding: 0 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const UserName = styled.h2`
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 30px;
    color: #222;
`;

const InputSection = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    font-size: 14px;
    color: #333;
    margin-bottom: 8px;
`;

const TextInput = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid ${(props) => (props.isError ? "#ff0000" : "#ccc")};
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
    color: #333;

    &::placeholder {
        color: #aaa;
    }
`;

const DateGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const DateSelect = styled.select`
    flex: 1;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: ${(props) => (props.value === "" ? "#aaa" : "#333")};
    font-size: 14px;
`;

const TagSection = styled.div`
    margin-bottom: 24px;
`;

const TagGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const TagButton = styled.button`
    padding: 8px 16px;
    background-color: ${(props) => (props.isActive ? "#333" : "#fff")};
    color: ${(props) => (props.isActive ? "#fff" : "#333")};
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: #333;
    }
`;

const SaveButton = styled.button`
    width: 100%;
    padding: 16px;
    background-color: #f5f5f5;
    border: 1px solid #000;
    border-radius: 6px;
    font-size: 16px;
    color: #000;
    font-weight: 500;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #e0e0e0;
    }
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

const YEARS = Array.from({ length: 101 }, (_, i) => 1926 + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

const MyPageEdit = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [name, setName] = useState("");
    
    const [birthDate, setBirthDate] = useState({
        year: "",
        month: "",
        day: ""
    });

    const [selectedTags, setSelectedTags] = useState({
        culture: [],
        method: [],
        lifestyle: []
    });

    const [showToast, setShowToast] = useState(false);

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
        if (
            !password ||
            !confirmPw ||
            !name ||
            !birthDate.year ||
            !birthDate.month ||
            !birthDate.day ||
            selectedTags.culture.length === 0 ||
            selectedTags.method.length === 0 ||
            selectedTags.lifestyle.length === 0
        ) {
            setShowToast(true);
            return;
        }

        if (isPasswordMismatch) {
            return;
        }

        navigate('/mypage'); 
    };

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setBirthDate(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Wrapper>
            <Header>
                <BackIcon onClick={() => navigate(-1)}>&lt;</BackIcon>
                <HeaderTitle>마이페이지</HeaderTitle>
            </Header>

            <Content>
                <UserName>xx님</UserName>

                <InputSection>
                    <Label>새 비밀번호</Label>
                    <TextInput 
                        type="password" 
                        placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputSection>

                <InputSection>
                    <Label>새 비밀번호 확인</Label>
                    <TextInput 
                        type="password" 
                        placeholder="비밀번호 재입력" 
                        value={confirmPw}
                        onChange={(e) => setConfirmPw(e.target.value)}
                        isError={isPasswordMismatch}
                    />
                </InputSection>

                <InputSection>
                    <Label>이름</Label>
                    <TextInput 
                        type="text" 
                        placeholder="이름을 입력해주세요" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </InputSection>

                <InputSection>
                    <Label>생년월일</Label>
                    <DateGroup>
                        <DateSelect name="year" value={birthDate.year} onChange={handleDateChange}>
                            <option value="" disabled>년도</option>
                            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        </DateSelect>
                        <DateSelect name="month" value={birthDate.month} onChange={handleDateChange}>
                            <option value="" disabled>월</option>
                            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                        </DateSelect>
                        <DateSelect name="day" value={birthDate.day} onChange={handleDateChange}>
                            <option value="" disabled>일</option>
                            {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                        </DateSelect>
                    </DateGroup>
                </InputSection>

                <TagSection>
                    <Label>요리 문화 (중복 선택 가능)</Label>
                    <TagGrid>
                        {["한식", "일식", "양식", "중식", "아시안"].map((tag) => (
                            <TagButton
                                key={tag}
                                isActive={selectedTags.culture.includes(tag)}
                                onClick={() => toggleTag("culture", tag)}
                            >
                                {tag}
                            </TagButton>
                        ))}
                    </TagGrid>
                </TagSection>

                <TagSection>
                    <Label>조리 방식 (중복 선택 가능)</Label>
                    <TagGrid>
                        {["볶음", "국/찌개", "구이", "생식", "조림/찜"].map((tag) => (
                            <TagButton
                                key={tag}
                                isActive={selectedTags.method.includes(tag)}
                                onClick={() => toggleTag("method", tag)}
                            >
                                {tag}
                            </TagButton>
                        ))}
                    </TagGrid>
                </TagSection>

                <TagSection>
                    <Label>라이프 스타일 (중복 선택 가능)</Label>
                    <TagGrid>
                        {["초간단", "한그릇", "술안주", "도시락", "다이어트"].map((tag) => (
                            <TagButton
                                key={tag}
                                isActive={selectedTags.lifestyle.includes(tag)}
                                onClick={() => toggleTag("lifestyle", tag)}
                            >
                                {tag}
                            </TagButton>
                        ))}
                    </TagGrid>
                </TagSection>

                <SaveButton onClick={handleSave}>저장</SaveButton>
            </Content>

            {showToast && <ToastMessage>모두 작성해 주세요</ToastMessage>}
        </Wrapper>
    );
};

export default MyPageEdit;