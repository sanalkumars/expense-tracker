import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage";
import TransactionPage from "./pages/TransactionPage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import Header from "./components/ui/Header.jsx";



function App(){

const authUser = true;
  return(
    <>
    { authUser && <Header />}
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