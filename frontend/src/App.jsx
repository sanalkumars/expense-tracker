import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage";
import TransactionPage from "./pages/TransactionPage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import Header from "./components/ui/Header.jsx";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query.js";



function App(){

const authUser = true;
const { loading , data , error } = useQuery(GET_AUTHENTICATED_USER);
  return(
    <>
    { data?.authUser && <Header />}
    <Routes>
      <Route path='/' element={ <HomePage />} /> 

      <Route path='/signup' element={ <SignUpPage />} />

      <Route path='/login' element={ <LogInPage />} />

      <Route path='/transaction/:id' element={ <TransactionPage />} />

      <Route path='*' element={ <NotFoundPage />} />

    </Routes>
    </>
  )
}
export default App;