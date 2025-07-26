import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/main-layout";
import HomePage from "@/pages/home-page";
import QuestionPage from "@/pages/question-page";
import QuestionSubmitPage from "@/pages/question-submit-page";
import ResponsePage from "@/pages/response-page";
import ResponseWritePage from "@/pages/response-write-page";
import ResponseSubmitPage from "@/pages/response-submit-page";
import Register from "@/pages/register-page";
import Nickname from "@/pages/register-nickname-page";
import LogIn from "@/pages/login-page";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/question/submit" element={<QuestionSubmitPage />} />
        <Route path="/response" element={<ResponsePage />} />
        <Route path="/response/write" element={<ResponseWritePage />} />
        <Route path="/response/submit" element={<ResponseSubmitPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register/nickname" element={<Nickname />} />
      </Routes>
    </MainLayout>
  );
}
