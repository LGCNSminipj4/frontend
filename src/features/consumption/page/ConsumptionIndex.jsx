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

// 소비 날짜 (빨간색 텍스트)
const ConsumedDate = styled.div`
  font-size: 14px;
  color: ${COLORS.error}; /* #FF6B6B */
  margin-top: 6px;
  font-weight: 500;
`;

const ConsumptionIndex = () => {
  // 백엔드 연동 전 임시 데이터 (이 재료가 '소비 완료' 처리된 날짜)
  const consumedList = [
    { id: 1, name: '두부', date: '2026.02.11' },
    { id: 2, name: '우유', date: '2026.02.09' },
    { id: 3, name: '잼', date: '2026.02.09' },
  ];

  // 이번 달 소비 개수 계산 (현재는 전체 길이로 예시)
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
            <ListItem key={item.id}>
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ConsumedDate>{item.date}</ConsumedDate>
              </ItemInfo>
            </ListItem>
          ))}
        </div>
      </ContentArea>
    </Container>
  );
};

export default ConsumptionIndex;