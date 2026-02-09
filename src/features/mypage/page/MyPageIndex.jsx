import styled from "styled-components";
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
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    position: relative;
    margin-bottom: 20px;
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
    font-weight: bold;
    color: #000;
    margin: 0;
`;

const Container = styled.div`
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 40px;
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
        <Wrapper>
            <Header>
                <BackIcon onClick={() => navigate(-1)}>&lt;</BackIcon>
                <HeaderTitle>마이페이지</HeaderTitle>
            </Header>

            <Container>
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
            </Container>
        </Wrapper>
    );
};

export default MyPageIndex;