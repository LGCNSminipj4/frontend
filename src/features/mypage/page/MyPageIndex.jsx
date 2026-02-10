import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/common/PageHeader";
import "./MyPageIndex.css"; // CSS 파일 임포트

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

    return (
        <div className="mypage-container">
            {/* 상단 헤더 */}
            <div className="header-wrapper">
                <PageHeader title="마이페이지" />
            </div>

            {/* 사용자 이름 영역 */}
            <div className="user-name-area">
                <h2 className="user-name-title">
                    {userInfo.name}<span className="user-name-suffix">님</span>
                </h2>
            </div>

            {/* 회원정보 수정 버튼 (민트색 꽉 찬 버튼) */}
            <button 
                className="action-btn" 
                onClick={() => navigate('/mypage/edit')}
            >
                회원정보 수정
            </button>

            {/* 즐겨찾기 섹션 */}
            <div className="section">
                <h3 className="section-title">&lt; 레시피 즐겨찾기 &gt;</h3>
                <div className="list-box">
                    {userInfo.favorites.length > 0 ? (
                        userInfo.favorites.map(item => (
                            <div key={item.id} className="list-item" onClick={() => console.log('레시피 이동')}>
                                {item.title} <span>&gt;</span>
                            </div>
                        ))
                    ) : (
                        <div className="empty-message">즐겨찾기한 레시피가 없습니다.</div>
                    )}
                </div>
            </div>

            {/* 알림 섹션 */}
            <div className="section">
                <h3 className="section-title">&lt; 알림 &gt;</h3>
                <div className="list-box">
                    {userInfo.notifications.length > 0 ? (
                        userInfo.notifications.map(noti => (
                            <div key={noti.id} className="list-item">
                                <span>
                                    {noti.message}
                                    {noti.isNew && <span style={{color: '#FF6B6B', fontSize: '10px', marginLeft:'4px'}}>N</span>}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="empty-message">새로운 알림이 없습니다.</div>
                    )}
                </div>
            </div>

            {/* 로그아웃 버튼 (하단, 민트색) */}
            <div className="logout-btn-area">
                <button className="action-btn" onClick={handleLogout}>
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default MyPageIndex;