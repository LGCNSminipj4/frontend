import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import api from '../../../api/axios'; 

import PageHeader from '../../../components/common/PageHeader'; 
import { Container, ContentArea, ItemInfo, ItemName } from '../../../components/common/CommonStyles'; 
import { EmptyMessage, TrashItem, DdayText, ActionButtonGroup, MiniButton, FixedBottomArea, DangerButton, SummaryText } from '../../../components/common/Styles';

const fadeIn = keyframes` from { opacity: 0; } to { opacity: 1; } `;
const slideUp = keyframes` from { transform: translate(-50%, 20px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } `;

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
  flex: 1; padding: 12px; border-radius: 8px; border: none; font-weight: bold;
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

  useEffect(() => {
    const fetchTrashList = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const response = await api.get('/ingredients/trash', {
          headers: { Authorization: `Bearer ${token}` }
        }); 
        setTrashList(response.data);
      } catch (error) { console.error("로드 실패:", error); } 
      finally { setIsLoading(false); }
    };
    fetchTrashList();
  }, []);

  const handleConfirmAction = async () => {
    const { type, item } = popupConfig;
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      closePopup();
      if (type === 'RESTORE') {
        // [명세서 반영] PUT 메서드 및 경로 수정
        await api.put(`/ingredients/trash/restore/${item.ingredientsId}`, {}, config); 
        triggerToast(`[${item.ingredientsName}] 복구되었습니다!`);
        setTrashList((prev) => prev.filter(i => i.ingredientsId !== item.ingredientsId));
        setTimeout(() => navigate('/fridge'), 500);
      } 
      else if (type === 'DELETE_ONE') {
        await api.delete(`/ingredients/trash/${item.ingredientsId}`, config);
        triggerToast("삭제되었습니다.");
        setTrashList((prev) => prev.filter(i => i.ingredientsId !== item.ingredientsId));
      } 
      else if (type === 'DELETE_ALL') {
        await api.delete('/ingredients/trash', config); 
        setTrashList([]); 
      }
    } catch (error) { triggerToast("오류가 발생했습니다."); }
  };

  const openPopup = (type, item = null) => setPopupConfig({ open: true, type, item });
  const closePopup = () => setPopupConfig({ open: false, type: '', item: null });

  if (isLoading) return <Container><ContentArea>로딩중...</ContentArea></Container>;

  return (
    <Container>
      <PageHeader title="쓰레기통" onBackClick={() => navigate(-1)} />
      <ContentArea>
        {trashList.length > 0 && <SummaryText>총 {trashList.length}개의 재료가 있습니다.</SummaryText>}
        {trashList.length === 0 ? <EmptyMessage>쓰레기통이 비었습니다.</EmptyMessage> : (
          <div>
            {trashList.map((item) => (
              <TrashItem key={item.ingredientsId}>
                <ItemInfo>
                  <ItemName>{item.ingredientsName}</ItemName>
                  <DdayText>{item.ingredientsDate}</DdayText>
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
        <FixedBottomArea><DangerButton onClick={() => openPopup('DELETE_ALL')}>전체 삭제</DangerButton></FixedBottomArea>
      )}
      {popupConfig.open && (
        <PopupOverlay onClick={closePopup}>
          <CustomPopup onClick={(e) => e.stopPropagation()}>
            <h3>{popupConfig.type === 'RESTORE' ? "복구하시겠습니까?" : "삭제하시겠습니까?"}</h3>
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