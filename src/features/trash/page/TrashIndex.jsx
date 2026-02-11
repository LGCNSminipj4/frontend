import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  // 더미 데이터
  const dummyData = [
    { ingredients_id: 1, ingredients_name: '두부', d_day: 'D+4' },
    { ingredients_id: 2, ingredients_name: '우유', d_day: 'D+1' },
    { ingredients_id: 3, ingredients_name: '잼', d_day: 'D+11' },
  ];

  useEffect(() => {
    const fetchTrashList = async () => {
      try {
        // API 호출 시뮬레이션
        setTimeout(() => {
          setTrashList(dummyData);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        setIsLoading(false);
      }
    };
    fetchTrashList();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  //  복구 핸들러
  const handleRestore = (id, name) => {
    if (window.confirm(`[${name}] 재료를 냉장고로 복구할까요?`)) {
      setTrashList((prev) => prev.filter(item => item.ingredients_id !== id));
    }
  };

  //  개별 삭제 핸들러
  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까? 복구할 수 없습니다.")) {
      setTrashList((prev) => prev.filter(item => item.ingredients_id !== id));
    }
  };

  //  전체 삭제 핸들러
  const handleDeleteAll = () => {
    if (trashList.length === 0) return;
    if (window.confirm("휴지통을 싹 비우시겠습니까?")) {
      setTrashList([]);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <ContentArea style={{ justifyContent: 'center', alignItems: 'center' }}>
          로딩중...
        </ContentArea>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader title="쓰레기통" onBackClick={handleBackClick} />

      <ContentArea>
        <SummaryText>
          이번 달에 총 {trashList.length}가지의 재료가 버려졌습니다 😢
        </SummaryText>

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
                  <DdayText>{item.d_day}</DdayText>
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

      {/* 하단 전체 삭제 버튼 (리스트가 있을 때만 표시) */}
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