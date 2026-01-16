import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./src/Components/Header/Header";
import Footer from "./src/Components/Footer/Footer";
import Landing from "./src/pages/Landing/Landing";
import Home from "./src/pages/Home/Home";
import AskQuestion from "./src/pages/AskQuestion/AskQuestion";
import QuestionDetail from "./src/pages/QuestionDetail/QuestionDetail";
import HowItWorks from "./src/pages/HowItWorks/HowItWorks";
import ApiDocs from "./src/pages/ApiDocs/ApiDocs";
import ProtectedRoute from "./src/auth/ProtectedRoute";

export default function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route
            path="/api-docs"
            element={
              <ProtectedRoute>
                <ApiDocs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ask"
            element={
              <ProtectedRoute>
                <AskQuestion />
              </ProtectedRoute>
            }
          />

          <Route
            path="/question/:id"
            element={
              <ProtectedRoute>
                <QuestionDetail />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
