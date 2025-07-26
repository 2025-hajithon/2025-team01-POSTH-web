import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/main-layout";
import HomePage from "@/pages/home-page";
import QuestionPage from "@/pages/question-page";
import QuestionSubmitPage from "@/pages/question-submit-page";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/question/submit" element={<QuestionSubmitPage />} />
      </Routes>
    </MainLayout>
  );
}
