import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/main-layout";
import HomePage from "@/pages/home-page";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </MainLayout>
  );
}
