import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "@components/Header";
import Home from "@pages/Home";
import Movie from "@pages/Movie";
import Login from "@pages/Login";
import ThemeProvider from "./contexts/ThemeContext";
import AuthProvider from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Header />
        </ThemeProvider>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
