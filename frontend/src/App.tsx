import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/SignUp";
import Layout from "./pages/Layout";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import AddMessage from "./pages/AddMessage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Layout />
              </ProtectedRoutes>
            }
          >
            <Route path="profile" element={<Profile />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<Signin />} />
          </Route>
          <Route path="add-message/:id" element={<AddMessage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </>
  );
}

export default App;
