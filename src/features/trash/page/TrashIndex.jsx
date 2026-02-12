import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// 공통 컴포넌트 임포트 (기존 경로 유지)
import PageHeader from '../../../components/common/PageHeader'; 
import { Container, ContentArea, ItemInfo, ItemName } from '../../../components/common/CommonStyles'; 
import { EmptyMessage, TrashItem, DdayText, ActionButtonGroup, MiniButton, FixedBottomArea, DangerButton, SummaryText } from '../../../components/common/Styles';

// --- 애니메이션 ---
const fadeIn = keyframes` from { opacity: 0; } to { opacity: 1; } `;
const slideUp = keyframes` from { transform: translate(-50%, 20px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } `;

// --- 스타일 컴포넌트 ---
const ToastMessage = styled.div`
  position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8); color: white; padding: 12px 24px;
  border-radius: 20px; font-size: 14px; z-index: 4000; animation: ${slideUp} 0.3s ease-out;
`;

const PopupOverlay = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center;
  z-index: 3000; animation: ${fadeIn} 0.2s ease-out;
`;

const CustomPopup = styled.div`
  background: white; padding: 24px; border-radius: 16px; width: 80%; max-width: 300px; text-align: center;
  h3 { margin: 0 0 20px 0; font-size: 16px; color: #333; line-height: 1.4; }
`;

const PopupBtnGroup = styled.div` display: flex; gap: 10px; `;
const PopupBtn = styled.button`
  flex: 1; padding: 12px; border-radius: 8px; border: none; font-weight: bold; cursor: pointer;
  background: ${props => props.$primary ? '#00C4B4' : '#f5f5f5'};
  color: ${props => props.$primary ? 'white' : '#666'};
`;

const TrashIndex = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  const [trashList, setTrashList] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [popupConfig, setPopupConfig] = useState({ open: false, type: '', item: null });

  const triggerToast = (text) => { setToastText(text); setShowToast(true); };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // --- D-Day 계산 함수 ---
  const getDDay = (targetDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 비교를 위해 시간 초기화
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - target.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "D-Day";
    return diffDays > 0 ? `D+${diffDays}` : `D${diffDays}`;
  };

  // --- 핵심 로직: 소비기한 체크 및 필터링 ---
  const loadExpiredItems = useCallback(() => {
    setIsLoading(true);
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // 가상의 전체 데이터
    const mockAllIngredients = [
      { ingredientsId: 1, ingredientsName: "우유", ingredientsDate: "2026-02-03", status: "NORMAL" },
      { ingredientsId: 3, ingredientsName: "두부", ingredientsDate: "2026-12-31", status: "NORMAL" },
      { ingredientsId: 4, ingredientsName: "닭가슴살", ingredientsDate: "2026-01-31", status: "DISCARDED" }
    ];

    const filtered = mockAllIngredients.filter(item => {
      const isExpired = item.ingredientsDate < todayStr;
      const isDiscarded = item.status === "DISCARDED";
      return isExpired || isDiscarded;
    });

    setTrashList(filtered);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadExpiredItems();
  }, [loadExpiredItems]);

  const handleConfirmAction = () => {
    const { type, item } = popupConfig;

    if (type === 'RESTORE') {
      setTrashList(prev => prev.filter(i => i.ingredientsId !== item.ingredientsId));
      triggerToast(`[${item.ingredientsName}]이(가) 냉장고로 복구되었습니다.`);
      setTimeout(() => navigate('/fridge'), 1000);
    } 
    else if (type === 'DELETE_ONE') {
      setTrashList(prev => prev.filter(i => i.ingredientsId !== item.ingredientsId));
      triggerToast("영구 삭제되었습니다.");
    } 
    else if (type === 'DELETE_ALL') {
      setTrashList([]);
      triggerToast("쓰레기통을 모두 비웠습니다.");
    }
    closePopup();
  };

  const openPopup = (type, item = null) => setPopupConfig({ open: true, type, item });
  const closePopup = () => setPopupConfig({ open: false, type: '', item: null });

  if (isLoading) return <Container><ContentArea>로딩중...</ContentArea></Container>;

  return (
    <Container>
      <PageHeader title="쓰레기통" onBackClick={() => navigate(-1)} />
      <ContentArea>
        {trashList.length > 0 && <SummaryText>지난 30일간 총 {trashList.length}개의 재료가 버려졌습니다😢</SummaryText>}
        
        {trashList.length === 0 ? (
          <EmptyMessage>쓰레기통이 비었습니다.</EmptyMessage>
        ) : (
          <div>
            {trashList.map((item) => (
              <TrashItem key={item.ingredientsId}>
                <ItemInfo>
                  <ItemName>{item.ingredientsName}</ItemName>
                  {/* 날짜 대신 D+일수로 표시 */}
                  <DdayText style={{ color: '#ff4d4f' }}>
                    {getDDay(item.ingredientsDate)}
                  </DdayText>
                </ItemInfo>
                <ActionButtonGroup>
                  <MiniButton onClick={() => openPopup('RESTORE', item)}>복구</MiniButton>
                  <MiniButton $type="delete" onClick={() => openPopup('DELETE_ONE', item)}>삭제</MiniButton>
                </ActionButtonGroup>
              </TrashItem>
            ))}
          </div>
        )}
      </ContentArea>

      {trashList.length > 0 && (
        <FixedBottomArea>
          <DangerButton onClick={() => openPopup('DELETE_ALL')}>전체 삭제</DangerButton>
        </FixedBottomArea>
      )}

      {popupConfig.open && (
        <PopupOverlay onClick={closePopup}>
          <CustomPopup onClick={(e) => e.stopPropagation()}>
            <h3>
              {popupConfig.type === 'RESTORE' ? "복구하시겠습니까?" : 
               popupConfig.type === 'DELETE_ALL' ? "전체 삭제하시겠습니까?" : "영구 삭제하시겠습니까?"}
            </h3>
            <PopupBtnGroup>
              <PopupBtn onClick={closePopup}>취소</PopupBtn>
              <PopupBtn $primary onClick={handleConfirmAction}>확인</PopupBtn>
            </PopupBtnGroup>
          </CustomPopup>
        </PopupOverlay>
      )}

      {showToast && <ToastMessage>{toastText}</ToastMessage>}
    </Container>
  );
};

export default TrashIndex;