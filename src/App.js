import HeaderComponent from "./components/headerComponents/HeaderComponent";
import FooterComponent from "./components/footerComponents/FooterComponent";
import SignUpComponent from './components/signInComponents/SignUpComponent';
import SignInComponent from "./components/signInComponents/SignInComponent";
import LandingComponent from "./components/landingComponents/LandingComponent";
import JournalComponent from "./components/journalComponents/JournalComponent";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from "./context/AuthContext";
import UserProfileComponent from "./components/signInComponents/UserProfileComponent";
import ProtectedRoute from "./components/signInComponents/ProtectedRoute";


function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <HeaderComponent/>
        <Routes>
          <Route path='/' element={<LandingComponent/>} />
          <Route path='dream-journal' element={<ProtectedRoute><JournalComponent/></ProtectedRoute>}/>
          <Route path='account' element={<ProtectedRoute><UserProfileComponent /></ProtectedRoute>}/>
          <Route path='signup' element={<SignUpComponent/>}/>
          <Route path='signin' element={<SignInComponent/>}/>
        </Routes>
        <FooterComponent/>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
