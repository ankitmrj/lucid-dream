import HeaderComponent from "./components/headerComponents/HeaderComponent";
import FooterComponent from "./components/footerComponents/FooterComponent";
import UserAuthComponent from './components/signInComponents/UserAuthComponent';
import LandingComponent from "./components/landingComponents/LandingComponent";
import JournalComponent from "./components/journalComponents/JournalComponent";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from "./context/AuthContext";
import UserProfileComponent from "./components/signInComponents/UserProfileComponent";


function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <HeaderComponent/>
        <Routes>
          <Route path='/' element={<LandingComponent/>} />
          <Route path='signup' element={<UserAuthComponent />}/>
          <Route path='dream-journal' element={<JournalComponent/>}/>
          <Route path='account' element={<UserProfileComponent />}/>
        </Routes>
        <div id='footer'>
          <FooterComponent/>
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
