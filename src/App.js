import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import RecipeSearch from './features/recipe/page/RecipeSearch';
import SignIn from './features/auth/page/SignIn';
import SignUp from './features/auth/page/SignUp';

import FridgeIndex from './features/fridge/page/FridgeIndex';

import IngredientAdd from './features/ingredient/page/IngredientAdd';
import IngredientEdit from './features/ingredient/page/IngredientEdit';

import TrashIndex from './features/trash/page/TrashIndex';

import RecipeIndex from './features/recipe/page/RecipeIndex';

import MyPageIndex from './features/mypage/page/MyPageIndex';
import MyPageEdit from './features/mypage/page/MyPageEdit';

import ConsumptionIndex from './features/consumption/page/ConsumptionIndex';

// 전체 레이아웃을 잡아주는 Wrapper 
const AppWrapper = styled.div`
    max-width: 375px; /* 모바일 규격 예시 */
    min-height: 100vh;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    position: relative;
`;

const App = () => {
    return (
        <BrowserRouter>
            <AppWrapper>
                

                <Routes>
                    {/* --- Auth --- */}
                    <Route path='/' element={<SignIn />} />
                    <Route path='/signup' element={<SignUp />} />

                    {/* --- Fridge --- */}
                    <Route path='/fridge' element={<FridgeIndex />} />

                    {/* --- Ingredient --- */}
                    <Route path='/ingredient/add' element={<IngredientAdd />} />
                    <Route path='/ingredient/edit' element={<IngredientEdit />} />
                    <Route path='/ingredient/edit/:id' element={<IngredientEdit />} />

                    {/* --- Trash --- */}
                    <Route path='/trash' element={<TrashIndex />} />

                    {/* --- Recipe --- */}
                    <Route path='/recipe' element={<RecipeIndex />} />
                    <Route path='/recipe/search' element={<RecipeSearch />} />

                    {/* --- MyPage --- */}
                    {/* <Route path='/mypage' element={<MyPageIndex />} /> */}
                    <Route path='/mypage/edit' element={<MyPageEdit />} />

                    {/* --- Consumption --- */}
                    <Route path='/consumption' element={<ConsumptionIndex />} />

                </Routes>
            </AppWrapper>
        </BrowserRouter>
    );
}

export default App;