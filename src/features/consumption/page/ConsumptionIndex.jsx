import React from 'react';
import styled from 'styled-components';
import PageHeader from '../../../components/common/PageHeader'; 
import {
  Container,
  ContentArea,
  ListItem,
  ItemInfo,
  ItemName,
  COLORS
} from '../../../components/common/CommonStyles'; 

const SummaryText = styled.div`
  text-align: center;
  padding: 40px 0 20px 0;
  font-size: 14px;
  color: ${COLORS.textMain};
`;

const ConsumedDate = styled.div`
  font-size: 14px;
  color: ${COLORS.error}; 
  margin-top: 6px;
  font-weight: 500;
`;

const ConsumptionIndex = () => {
  /* 더미 데이터 - 주석 처리
     DB 컬럼: ingredients_id, ingredients_name, expiration_date (또는 소비일)
  const consumedList = [
    { ingredients_id: 1, ingredients_name: '두부', expiration_date: '2026.02.11' },
    { ingredients_id: 2, ingredients_name: '우유', expiration_date: '2026.02.09' },
    { ingredients_id: 3, ingredients_name: '잼', expiration_date: '2026.02.09' },
  ];
  */
  
  const consumedList = []; 

  const totalCount = consumedList.length;

  return (
    <Container>
      <PageHeader title="소비 완료" />

      <ContentArea>
        <SummaryText>
          이번 달에 총 {totalCount}가지의 재료를 소비하였습니다
        </SummaryText>

        <div style={{ padding: '0 10px' }}>
          {consumedList.map((item) => (
            <ListItem key={item.ingredients_id}>
              <ItemInfo>
                <ItemName>{item.ingredients_name}</ItemName>
                {/* 날짜 필드는 백엔드 응답 키에 따라 조정 (여기선 expiration_date로 가정) */}
                <ConsumedDate>{item.expiration_date}</ConsumedDate>
              </ItemInfo>
            </ListItem>
          ))}
        </div>
      </ContentArea>
    </Container>
  );
};

export default ConsumptionIndex;