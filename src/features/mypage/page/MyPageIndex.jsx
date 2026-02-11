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
    
    // 로딩 및 데이터 상태 관리
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({
        name: '',
        favorites: [],
        notifications: []
    });

    // 데이터 가져오기 (API 연동 시뮬레이션)
    useEffect(() => {
        const fetchMyPageData = async () => {
            try {
                // Mock Data 로딩
                setTimeout(() => {
                    setUserInfo({
                        name: '김코딩',
                        favorites: [
                            { id: 1, title: '매콤달콤 떡볶이' },
                            { id: 2, title: '초간단 계란말이' }
                        ],
                        notifications: [
                            { id: 1, message: '유통기한 임박 재료가 2개 있어요!', isNew: true },
                            { id: 2, message: '새로운 레시피가 등록되었습니다.', isNew: false }
                        ]
                    });
                    setIsLoading(false);
                }, 300); 
            } catch (error) {
                console.error("마이페이지 데이터 로드 실패", error);
                setIsLoading(false);
            }
        };

        fetchMyPageData();
    }, []);

    // 로그아웃 핸들러
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
        <Container>
            {/* 상단 헤더 (PageHeader 내부에 Wrapper 포함됨) */}
            <PageHeader title="마이페이지" />

            {/* 사용자 이름 영역 */}
            <UserGreetingArea>
                <GreetingTitle>
                    {userInfo.name}<span>님</span>
                </GreetingTitle>
            </UserGreetingArea>

            {/* 회원정보 수정 버튼 */}
            <FullWidthButton onClick={() => navigate('/mypage/edit')}>
                회원정보 수정
            </FullWidthButton>

            {/* 즐겨찾기 섹션 */}
            <Section>
                <SectionHeader>&lt; 레시피 즐겨찾기 &gt;</SectionHeader>
                <MintBox>
                    {userInfo.favorites.length > 0 ? (
                        userInfo.favorites.map(item => (
                            <TranslucentItem 
                                key={item.id} 
                                onClick={() => console.log('레시피 이동')}
                            >
                                {item.title} <span>&gt;</span>
                            </TranslucentItem>
                        ))
                    ) : (
                        <EmptyMessage $marginTop="auto" $isCenter>
                            즐겨찾기한 레시피가 없습니다.
                        </EmptyMessage>
                    )}
                </MintBox>
            </Section>

            {/* 알림 섹션 */}
            <Section>
                <SectionHeader>&lt; 알림 &gt;</SectionHeader>
                <MintBox>
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

            {/* 로그아웃 버튼 */}
            <LogoutArea>
                <FullWidthButton onClick={handleLogout}>
                    로그아웃
                </FullWidthButton>
            </LogoutArea>
        </Container>
    );
};

export default MyPageIndex;