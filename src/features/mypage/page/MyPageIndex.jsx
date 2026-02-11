// @@@@@@@@@@@@@@@@@@@@ 사용안함 @@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@ 사용안함 @@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@ 사용안함 @@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@ 사용안함 @@@@@@@@@@@@@@@@@@@@@@@@@

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../../components/common/PageHeader";

import { Container } from "../../../components/common/CommonStyles";
import {
    UserGreetingArea,
    GreetingTitle,
    FullWidthButton,
    Section,         
    SectionHeader,
    MintBox,
    TranslucentItem,
    EmptyMessage,
    LogoutArea,       
    NewBadge          
} from "../../../components/common/Styles";

const MyPageIndex = () => {
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({
        name: '',
        favorites: [],
        notifications: []
    });

    useEffect(() => {
        const fetchMyPageData = async () => {
            try {
                // [API 호출: 회원정보조회]
                /*
                const res = await axios.get('/api/users/mypage');
                setUserInfo({
                    name: res.data.name,
                    favorites: res.data.favorites, // RECIPE_ID, RECIPE_NM_KO 포함
                    notifications: res.data.notifications
                });
                */
               
                // 더미 데이터 주석 처리
                /*
                setTimeout(() => {
                    setUserInfo({
                        name: '김코딩',
                        favorites: [
                            { RECIPE_ID: 1, RECIPE_NM_KO: '매콤달콤 떡볶이' }, // title -> RECIPE_NM_KO
                            { RECIPE_ID: 2, RECIPE_NM_KO: '초간단 계란말이' }
                        ],
                        notifications: [
                            { id: 1, message: '유통기한 임박 재료가 2개 있어요!', isNew: true },
                            { id: 2, message: '새로운 레시피가 등록되었습니다.', isNew: false }
                        ]
                    });
                    setIsLoading(false);
                }, 300); 
                */
                setIsLoading(false); 

            } catch (error) {
                console.error("마이페이지 데이터 로드 실패", error);
                setIsLoading(false);
            }
        };

        fetchMyPageData();
    }, []);

    const handleLogout = () => {
        if(window.confirm("로그아웃 하시겠습니까?")) {
            console.log("로그아웃 처리됨");
            navigate('/'); 
        }
    };

    if (isLoading) {
        return (
            <Container>
                <EmptyMessage $isCenter>로딩중...</EmptyMessage>
            </Container>
        );
    }

    return (
        // [수정] 전체 화면을 꽉 채우고 위아래로 배치하기 위해 flex 스타일 적용
        <Container style={{ display: 'flex', flexDirection: 'column', height: '100vh', boxSizing: 'border-box' }}>
            <PageHeader title="마이페이지" />

            <UserGreetingArea>
                <GreetingTitle>
                    {userInfo.name}<span>님</span>
                </GreetingTitle>
            </UserGreetingArea>

            <FullWidthButton onClick={() => navigate('/mypage/edit')}>
                회원정보 수정
            </FullWidthButton>

            {/* [수정 1] 즐겨찾기 섹션 주석 처리 (삭제 대신 주석) */}
            {/* <Section>
                <SectionHeader>&lt; 레시피 즐겨찾기 &gt;</SectionHeader>
                <MintBox>
                    {userInfo.favorites.length > 0 ? (
                        userInfo.favorites.map(item => (
                            <TranslucentItem 
                                key={item.RECIPE_ID} 
                                onClick={() => console.log('레시피 이동')}
                            >
                                {item.RECIPE_NM_KO} <span>&gt;</span>
                            </TranslucentItem>
                        ))
                    ) : (
                        <EmptyMessage $marginTop="auto" $isCenter>
                            즐겨찾기한 레시피가 없습니다.
                        </EmptyMessage>
                    )}
                </MintBox>
            </Section> 
            */}

            {/* [수정 2] 알림 섹션이 남은 공간을 모두 차지하도록 flex: 1 적용 */}
            <Section style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, marginBottom: '20px' }}>
                <SectionHeader>&lt; 알림 &gt;</SectionHeader>
                {/* MintBox도 꽉 차게 flex: 1 및 스크롤 처리 */}
                <MintBox style={{ flex: 1, overflowY: 'auto' }}>
                    {userInfo.notifications.length > 0 ? (
                        userInfo.notifications.map(noti => (
                            <TranslucentItem key={noti.id}>
                                <span>
                                    {noti.message}
                                    {noti.isNew && <NewBadge>N</NewBadge>}
                                </span>
                            </TranslucentItem>
                        ))
                    ) : (
                        <EmptyMessage $marginTop="auto" $isCenter>
                            새로운 알림이 없습니다.
                        </EmptyMessage>
                    )}
                </MintBox>
            </Section>

            <LogoutArea>
                <FullWidthButton onClick={handleLogout}>
                    로그아웃
                </FullWidthButton>
            </LogoutArea>
        </Container>
    );
};

export default MyPageIndex;