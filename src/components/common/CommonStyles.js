import styled, { css, keyframes } from "styled-components";

// --- 색상 변수 (Color Palette) ---
export const COLORS = {
  primary: "#00C4B4",      // 메인 민트색 (버튼, 활성 탭 등)
  secondary: "#E0E0E0",    // 회색 버튼 (취소, 비활성)
  background: "#FBF9FA",   // 전체 배경색
  white: "#FFFFFF",
  textMain: "#333333",     // 기본 텍스트
  textSub: "#999999",      // 서브 텍스트 (날짜, 플레이스홀더)
  border: "#DDDDDD",       // 입력창 테두리
  error: "#FF6B6B",        // D-day, 경고
  warning: "#F2C94C",      // 별점, 알림 등
};

// --- 레이아웃 (Layout) ---
export const Container = styled.div`
  max-width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: ${COLORS.background};
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  padding: 0 20px; /* 좌우 여백 */
  overflow-x: hidden;
`;

// 컨텐츠가 헤더와 바닥 버튼 사이에 위치할 때 사용 (스크롤 영역)
export const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 80px; /* 하단 버튼 공간 확보 */
  display: flex;
  flex-direction: column;
  
  /* 스크롤바 숨기기 (선택사항) */
  &::-webkit-scrollbar {
    display: none;
  }
`;

// --- 헤더 (Header) ---
export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  position: relative;
  background-color: transparent;
  flex-shrink: 0;
  margin-bottom: 10px;
`;

export const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: ${COLORS.textMain};
  margin: 0;
`;

export const BackButton = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 24px;
  color: ${COLORS.textSub};
  padding: 10px; /* 터치 영역 확보 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MenuButton = styled(BackButton)`
  left: auto;
  right: 0;
`;

// --- 입력 필드 (Inputs) ---
export const InputGroup = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${COLORS.textMain};
`;

// 기본 인풋 스타일
export const StyledInput = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid ${(props) => (props.$isError ? COLORS.error : COLORS.border)};
  border-radius: 4px; /* 살짝 둥근 사각형 */
  font-size: 14px;
  box-sizing: border-box;
  background-color: ${COLORS.white};
  color: ${COLORS.textMain};

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
  }
  
  &::placeholder {
    color: ${COLORS.textSub};
  }
`;

// 셀렉트 박스 (dropdown)
export const StyledSelect = styled.select`
  width: 100%;
  padding: 14px;
  border: 1px solid ${COLORS.border};
  border-radius: 4px;
  font-size: 14px;
  background-color: ${COLORS.white};
  box-sizing: border-box;
  color: ${COLORS.textMain};
  appearance: none; /* 기본 화살표 제거하고 커스텀 가능하지만 심플하게 유지 */
  
  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
  }
`;

// 날짜 입력용 (년/월/일 가로 배치) 래퍼
export const DateInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  
  & > select {
    flex: 1; /* 3등분 */
  }
`;

// --- 버튼 (Buttons) ---
export const BaseButton = styled.button`
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  
  &:active {
    transform: scale(0.98);
  }
`;

// 메인 액션 버튼 (민트색) - 로그인, 등록, 저장 등
export const PrimaryButton = styled(BaseButton)`
  width: 100%;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  
  &:hover {
    opacity: 0.9;
  }
`;

// 서브 액션 버튼 (회색) - 회원가입(링크형), 취소 등
export const SecondaryButton = styled(BaseButton)`
  width: 100%;
  background-color: ${COLORS.secondary};
  color: ${COLORS.textMain};
  margin-top: 10px;
`;

// 작은 버튼 (중복확인 등)
export const SmallButton = styled(BaseButton)`
  padding: 14px 20px;
  font-size: 14px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  white-space: nowrap;
`;

// 하단 버튼 그룹 (삭제/저장 처럼 2개가 나란히 있을 때)
export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto; /* 컨테이너 하단에 붙이기 */
  padding-bottom: 20px;
`;

// 선택형 칩 버튼 (요리 문화, 라이프 스타일 등)
export const ChipButton = styled.button`
  padding: 8px 0;
  width: 100%; /* 그리드 안에서 꽉 차게 */
  border: 1px solid ${(props) => (props.$isActive ? COLORS.primary : COLORS.border)};
  background-color: ${(props) => (props.$isActive ? COLORS.primary : COLORS.white)};
  color: ${(props) => (props.$isActive ? COLORS.white : COLORS.textMain)};
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  font-weight: ${(props) => (props.$isActive ? "700" : "400")};
  
  &:hover {
    border-color: ${COLORS.primary};
  }
`;

// 칩 버튼들을 담을 그리드 레이아웃
export const ChipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 8px;
`;

// --- 탭 메뉴 (Tabs - 냉장/냉동/실온) ---
export const TabContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${COLORS.border};
  margin-bottom: 20px;
`;

export const TabItem = styled.div`
  flex: 1;
  text-align: center;
  padding: 12px 0;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  color: ${(props) => (props.$isActive ? COLORS.textMain : COLORS.textSub)};
  border-bottom: 2px solid ${(props) => (props.$isActive ? COLORS.textMain : "transparent")};
`;

// --- 리스트 아이템 (냉장고 목록) ---
export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
  background-color: transparent;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ItemName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${COLORS.textMain};
`;

export const ItemDday = styled.span`
  font-size: 12px;
  color: ${(props) => (props.$isDanger ? COLORS.error : COLORS.textSub)};
  font-weight: ${(props) => (props.$isDanger ? "700" : "400")};
`;

// --- 모달/팝업 (Modal) ---
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${COLORS.white};
  border-radius: 12px;
  padding: 30px 20px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 30px;
  color: ${COLORS.textMain};
`;

export const ModalButton = styled(BaseButton)`
  width: 45%;
  font-size: 14px;
  padding: 12px;
  border-radius: 8px;
`;

// --- 드로어 메뉴 (Drawer) ---
const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

export const DrawerOverlay = styled.div`
  position: absolute; /* Container 기준 absolute */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  z-index: 900;
`;

export const DrawerMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  height: 100%;
  background: ${COLORS.white};
  z-index: 901;
  padding: 20px;
  box-sizing: border-box;
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DrawerItem = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${COLORS.textMain};
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:hover {
    color: ${COLORS.primary};
  }
`;