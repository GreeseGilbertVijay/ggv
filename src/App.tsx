import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import GlobalRightNav from "./components/GlobalRightNav";
import ScrollToTop from "./components/ScrollToTop";


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter basename="/ggv">
          <Navbar />
          <GlobalRightNav />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
