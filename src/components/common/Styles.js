import styled, { keyframes } from "styled-components";
import { COLORS } from "./CommonStyles";

const EXTRA_COLORS = {
  star: "#F2C94C",         // 별점 노란색
  mintBg: "#E0F7F5",       // 연한 민트 배경 (MyPage, EditProfile)
  delete: "#FF6B6B",       // 삭제 버튼 (Trash)
  borderLight: "#F5F5F5",  // 연한 테두리 (리스트 구분선)
};

// --- 애니메이션 정의 (ToastMessage용) ---
const fadeInOut = keyframes`
  0% { opacity: 0; transform: translate(-50%, 20px); }
  10% { opacity: 1; transform: translate(-50%, 0); }
  90% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, 20px); }
`;

// --- 페이지 레이아웃 (Layouts) ---
export const FullPageWrapper = styled.div`
  max-width: 375px;
  margin: 0 auto;
  background-color: ${COLORS.white};
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
`;

export const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  &::-webkit-scrollbar { display: none; }
`;

export const PaddingBox = styled.div`
  padding: 0 20px;
`;

export const FixedBottomArea = styled.div`
  padding: 16px 20px 40px 20px;
  background-color: ${(props) => props.$bgColor || COLORS.background};
  border-top: 1px solid ${EXTRA_COLORS.borderLight};
  flex-shrink: 0;
`;

// --- 텍스트 & 타이틀 ---
export const UserGreetingArea = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const GreetingTitle = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: ${COLORS.textMain};
  margin: 0;
  & > span { font-weight: 400; }
`;

export const SectionHeader = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${COLORS.textMain};
  margin: 0 0 10px 0;
`;

// --- 리스트 & 박스 스타일 ---
export const MintBox = styled.div`
  width: 100%;
  min-height: 120px;
  background-color: ${EXTRA_COLORS.mintBg};
  border-radius: 8px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TranslucentItem = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  padding: 12px;
  border-radius: 4px;
  font-size: 14px;
  color: ${COLORS.textMain};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover { background-color: ${COLORS.white}; }
`;

export const RecipeCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${EXTRA_COLORS.borderLight};
  cursor: pointer;
  &:last-child { margin-bottom: 0; border-bottom: none; }
`;

export const CardLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

export const ThumbnailBox = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #aaa;
  flex-shrink: 0;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CardTitle = styled.div`
  font-size: 15px;
  color: ${COLORS.textMain};
  font-weight: 500;
`;

export const CardDesc = styled.div`
  font-size: 13px;
  color: ${COLORS.textSub};
`;

export const StarIcon = styled.div`
  font-size: 24px;
  padding: 8px;
  cursor: pointer;
  color: ${(props) => (props.$active ? EXTRA_COLORS.star : "#ddd")};
  transition: color 0.2s;
`;

export const TrashItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${EXTRA_COLORS.borderLight};
`;

export const DdayText = styled.span`
  font-size: 12px;
  color: ${EXTRA_COLORS.delete};
  font-weight: 700;
  margin-top: 4px;
  display: block;
`;

// --- 버튼 ---
export const FullWidthButton = styled.button`
  width: 100%;
  padding: 16px 0;
  font-size: 16px;
  font-weight: 700;
  border: none;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  cursor: pointer;
  border-radius: 6px;
  transition: opacity 0.2s;
  display: block;
  &:hover { opacity: 0.9; }
  &:active { transform: scale(0.98); }
`;

export const ActionButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const MiniButton = styled.button`
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  font-size: 14px;
  color: ${COLORS.white};
  font-weight: 500;
  transition: opacity 0.2s;
  background-color: ${(props) => 
    props.$type === 'delete' ? EXTRA_COLORS.delete : COLORS.primary};
  &:hover { opacity: 0.9; }
  &:active { transform: scale(0.98); }
`;

export const DangerButton = styled(FullWidthButton)`
  background-color: ${EXTRA_COLORS.delete};
  margin: 0;
  border-radius: 8px;
`;

// --- 기타 ---
export const EmptyMessage = styled.div`
  text-align: center;
  color: #aaa;
  font-size: 14px;
  margin-top: ${(props) => props.$marginTop || "100px"};
  margin: ${(props) => props.$isCenter ? "auto" : ""};
`;

export const SummaryText = styled.div`
  text-align: center;
  padding: 30px 0;
  font-size: 15px;
  color: ${COLORS.textMain};
`;

export const Section = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LogoutArea = styled.div`
  margin-top: 50px;
  padding-bottom: 20px;
`;

export const NewBadge = styled.span`
  color: ${EXTRA_COLORS.delete};
  font-size: 10px;
  font-weight: 700;
  margin-left: 4px;
`;

export const ToastMessage = styled.div`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(51, 51, 51, 0.9);
  color: ${COLORS.white};
  padding: 12px 24px;
  border-radius: 20px;
  font-size: 14px;
  z-index: 1000;
  white-space: nowrap;
  animation: ${fadeInOut} 2s ease-in-out forwards;
  pointer-events: none;
`;