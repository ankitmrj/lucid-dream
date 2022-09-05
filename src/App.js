import HeaderComponent from "./components/headerComponents/HeaderComponent";
import FooterComponent from "./components/footerComponents/FooterComponent";
import UserContainerComponent from "./components/signInComponents/UserContainerComponent";
import LandingComponent from "./components/landingComponents/LandingComponent";
import JournalComponent from "./components/journalComponents/JournalComponent";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <HeaderComponent/>
      <Routes>
        <Route path='/' element={<LandingComponent/>} />
        <Route path='profile' element={<UserContainerComponent />}/>
        <Route path='dream-journal' element={<JournalComponent/>}/>
      </Routes>
      <div id='footer'>
        <FooterComponent/>
      </div>
    </BrowserRouter>
  );
}

export default App;
