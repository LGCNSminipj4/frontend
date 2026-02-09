import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Container } from "../../../components/common/CommonStyles";
import PageHeader from "../../../components/common/PageHeader";

// --- 페이지 전용 스타일 ---

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    /* Container에 이미 padding이 있으므로 여기선 생략하거나 조정 가능 */
    flex: 1;
`;

const UserName = styled.h2`
    font-size: 24px;
    font-weight: 500;
    color: #333; 
    margin-bottom: 24px;
`;

const ActionButton = styled.button`
    width: 100%;
    padding: 12px 0;
    font-size: 16px;
    border: 1px solid #000;
    background-color: ${(props) => (props.gray ? "#f5f5f5" : "#fff")};
    cursor: pointer;
    margin-bottom: 30px;
    border-radius: 4px; /* 약간의 둥글기 추가 (선택사항) */
    
    &:hover {
        opacity: 0.8;
    }
`;

const Section = styled.div`
    margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 10px;
    color: #000;
`;

const GrayBox = styled.div`
    width: 100%;
    height: 150px;
    background-color: #eee;
    border-radius: 4px;
`;

const MyPageIndex = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <PageHeader title="마이페이지" />

            <ContentWrapper>
                <UserName>xx님</UserName>

                <ActionButton onClick={() => navigate('/mypage/edit')}>
                    회원정보 수정
                </ActionButton>

                <Section>
                    <SectionTitle>&lt; 레시피 즐겨찾기 &gt;</SectionTitle>
                    <GrayBox />
                </Section>

                <Section>
                    <SectionTitle>&lt; 알림 &gt;</SectionTitle>
                    <GrayBox />
                </Section>

                <ActionButton gray onClick={() => console.log("로그아웃")}>
                    로그아웃
                </ActionButton>
            </ContentWrapper>
        </Container>
    );
};

export default MyPageIndex;