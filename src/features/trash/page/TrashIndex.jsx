import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../../api/axios'; 

import PageHeader from '../../../components/common/PageHeader'; 
import { 
  Container, 
  ContentArea, 
  ItemInfo, 
  ItemName 
} from '../../../components/common/CommonStyles'; 
import { 
  EmptyMessage, 
  TrashItem, 
  DdayText, 
  ActionButtonGroup, 
  MiniButton, 
  FixedBottomArea, 
  DangerButton,
  SummaryText 
} from '../../../components/common/Styles';

const TrashIndex = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true); 
  const [trashList, setTrashList] = useState([]);

  // 1. 화면 켜지자마자 쓰레기통 목록 불러오기 (GET)
  useEffect(() => {
    const fetchTrashList = async () => {
      try {
        setIsLoading(true);
        // [API 호출] 백엔드 주소가 '/ingredients/trash'라고 가정
        const response = await api.get('/ingredients/trash'); 
        
        console.log("쓰레기통 목록:", response.data); // 데이터 확인용 로그
        setTrashList(response.data); // 받아온 데이터로 목록 채우기
      
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        // 에러 나도 빈 배열로 처리하거나, 에러 메시지 띄우기
        // alert("목록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false); // 성공하든 실패하든 로딩 끝
      }
    };
    
    fetchTrashList();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  // 2. 복구하기 (POST 또는 PUT)
  const handleRestore = async (id, name) => {
    if (!window.confirm(`[${name}] 재료를 냉장고로 복구할까요?`)) return;

    try {
      // [API 호출] 해당 ID를 복구해달라고 요청
      // 주소 예시: /ingredients/restore/1
      await api.post(`/ingredients/restore/${id}`); 
      
      alert("복구되었습니다!");
      // 화면에서도 즉시 지워줌 (새로고침 안 해도 되게)
      setTrashList((prev) => prev.filter(item => item.ingredients_id !== id));

    } catch (error) {
      console.error("복구 실패:", error);
      alert("복구 중 오류가 발생했습니다.");
    }
  };

  // 3. 완전 삭제하기 (DELETE)
  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까? 복구할 수 없습니다.")) return;

    try {
      // [API 호출] 해당 ID를 영구 삭제
      await api.delete(`/ingredients/trash/${id}`);
      
      alert("삭제되었습니다.");
      // 화면 갱신
      setTrashList((prev) => prev.filter(item => item.ingredients_id !== id));

    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // 4. 전체 비우기 (DELETE)
  const handleDeleteAll = async () => {
    if (trashList.length === 0) return;
    if (!window.confirm("휴지통을 싹 비우시겠습니까?")) return;

    try {
      // [API 호출] 전체 삭제 요청
      await api.delete('/ingredients/trash'); 
      
      alert("휴지통을 비웠습니다.");
      setTrashList([]); // 목록 싹 비우기

    } catch (error) {
      console.error("전체 삭제 실패:", error);
      alert("전체 삭제 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return (
      <Container>
        <ContentArea style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div>로딩중...</div>
        </ContentArea>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader title="쓰레기통" onBackClick={handleBackClick} />

      <ContentArea>
        {/* 목록이 있을 때만 개수 표시 */}
        {trashList.length > 0 && (
          <SummaryText>
            이번 달에 총 {trashList.length}가지의 재료가 버려졌습니다 😢
          </SummaryText>
        )}

        {trashList.length === 0 ? (
          <EmptyMessage>
            쓰레기통이 비었습니다.
          </EmptyMessage>
        ) : (
          <div>
            {trashList.map((item) => (
              <TrashItem key={item.ingredients_id}>
                <ItemInfo>
                  <ItemName>{item.ingredients_name}</ItemName>
                  {/* 날짜 필드명이 expiration_date 맞는지 확인 필요 */}
                  <DdayText>{item.expiration_date}</DdayText>
                </ItemInfo>

                <ActionButtonGroup>
                  <MiniButton 
                    onClick={() => handleRestore(item.ingredients_id, item.ingredients_name)}
                  >
                    복구
                  </MiniButton>
                  <MiniButton 
                    $type="delete" 
                    onClick={() => handleDelete(item.ingredients_id)}
                  >
                    삭제
                  </MiniButton>
                </ActionButtonGroup>
              </TrashItem>
            ))}
          </div>
        )}
      </ContentArea>

      {trashList.length > 0 && (
        <FixedBottomArea>
          <DangerButton onClick={handleDeleteAll}>
            전체 삭제
          </DangerButton>
        </FixedBottomArea>
      )}
    </Container>
  );
};

export default TrashIndex;