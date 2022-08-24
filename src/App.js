import HeaderComponent from "./components/headerComponents/HeaderComponent";
import FooterComponent from "./components/footerComponents/FooterComponent";
import LandingComponent from "./components/landingComponents/LandingComponent";
import ProfileComponent from "./components/signInComponents/ProfileComponent";
import JournalComponent from "./components/journalComponents/JournalComponent";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <HeaderComponent/>
      <Routes>
        <Route path='/' element={<LandingComponent/>} />
        <Route path='profile' element={<ProfileComponent/>}/>
        <Route path='dream-journal' element={<JournalComponent/>}/>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
