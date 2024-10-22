import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./providers/userContext";
import LoginUser from "./pages/user/auth/login";
import AdminLogin from "./pages/admin/auth/login";
import RegisUser from "./pages/user/auth/regis";
import PagesUser from "./pages/user";
import PagesAdmin from "./pages/admin";

export default function App() {
    return (
        <Router>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<LoginUser />} />
                    <Route path="/regis" element={<RegisUser />} />
                    <Route path="/user/*" element={<PagesUser />} />


                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/*" element={<PagesAdmin />} />
                </Routes>
            </UserProvider>
        </Router>
    );
}
