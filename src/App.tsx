import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/main-layout";
import HomePage from "@/pages/home-page";
import QuestionPage from "@/pages/question/question-page";
import QuestionSubmitPage from "@/pages/question/question-submit-page";
import ResponsePage from "@/pages/response/response-page";
import ResponseWritePage from "@/pages/response/response-write-page";
import ResponseSubmitPage from "@/pages/response/response-submit-page";
import LetterStorePage from "@/pages/letter/letter-store-page";
import LetterReadPage from "@/pages/letter/letter-read-page";
import LetterResponsePage from "@/pages/letter/letter-response-page";
import LoginPage from "@/pages/login-page";
import RegisterPage from "@/pages/register-page";
import RegisterNicknamePage from "@/pages/register-nickname-page";
import ResponseSelectPage from "@/pages/response/response-select";
import LetterPage from "@/pages/letter/letter-page";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/nickname" element={<RegisterNicknamePage />} />

        <Route path="/letter" element={<LetterPage />} />

        <Route path="/question" element={<QuestionPage />} />
        <Route path="/question/submit" element={<QuestionSubmitPage />} />
        <Route path="/response" element={<ResponsePage />} />
        <Route path="/response/select" element={<ResponseSelectPage />} />
        <Route path="/response/write" element={<ResponseWritePage />} />
        <Route path="/response/submit" element={<ResponseSubmitPage />} />
        <Route path="/letter/store" element={<LetterStorePage />} />
        <Route path="/letter/read" element={<LetterReadPage />} />
        <Route path="/letter/response" element={<LetterResponsePage />} />
      </Routes>
    </MainLayout>
  );
}
