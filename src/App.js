import HeaderComponent from "./components/headerComponents/HeaderComponent";
import LandingComponent from "./components/landingComponents/LandingComponent";
import SignInComponent from "./components/signInComponents/SignInComponent";
import SignUpComponent from "./components/signInComponents/SignUpComponent";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <HeaderComponent/>
      <Routes>
        <Route path='/' element={<LandingComponent/>} />
        <Route path='sign-in' element={<SignInComponent />} />
        <Route path='sign-up' element={<SignUpComponent/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
