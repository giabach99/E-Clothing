import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import {Routes, Route, useNavigate} from "react-router-dom";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { checkUserSession } from "./store/user/user.action";


import { useSelector } from "react-redux";
import { selectCurrentUser } from "./store/user/user.selector";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

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

    useEffect(() => {
      if (user){
         return navigate("/");
      }
      else {
        return navigate("/auth");
      }
   },[user]);


  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path="shop/*" element={<Shop/>}/>
        {/* <Route path='auth' render={() => ( !user ? <Authentication /> : <Navigate to='/' /> )}/> */}
        <Route path='auth' element={<Authentication/>}/>
        <Route path='checkout' element={<Checkout/>}/>
      </Route>
    </Routes>    
  )
}

export default App;
