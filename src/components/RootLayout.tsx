import { Outlet } from "react-router-dom";
import Header from "./Header";
import AuthProvider from "@/contexts/AuthContext";
import ThemeProvider from "@/contexts/ThemeContext";

const RootLayout = () => {
  return (
    <div className="pt-20">
      <AuthProvider>
        <ThemeProvider>
          <Header />
        </ThemeProvider>

        <Outlet />
      </AuthProvider>
    </div>
  );
};

export default RootLayout;
