import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";

import {Routes, Route, useNavigate} from "react-router-dom";
import { checkUserSession } from "./store/user/user.action";
import Spinner from "./components/spinner/spinner.component";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "./store/user/user.selector";
import { GlobalStyle } from "./global.styles";

const Home = lazy(() => import("./routes/home/home.component"));
const Navigation = lazy(() => import("./routes/navigation/navigation.component"));
const Authentication = lazy(() => import("./routes/authentication/authentication.component"));
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {    
    if (user){
      return navigate("/");
    }
  }, [user]);

  useEffect(() => {
        dispatch(checkUserSession());
        // const unsubscribe = onAuthStateChangedListener((user) => {
        //     if (user) {
        //         createUserDocumentFromAuth(user);
        //     }
        //     dispatch(setCurrentUser(user));
        // })

        // return unsubscribe;
  }, [])

  return (
    <Suspense fallback={<Spinner/>}>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<Home/>}/>
          <Route path="shop/*" element={<Shop/>}/>
          {/* <Route path='auth' render={() => ( !user ? <Authentication /> : <Navigate to='/' /> )}/> */}
          <Route path='auth' element={<Authentication/>}/>
          <Route path='checkout' element={<Checkout/>}/>
        </Route>
      </Routes>
    </Suspense> 
  )
}

export default App;
