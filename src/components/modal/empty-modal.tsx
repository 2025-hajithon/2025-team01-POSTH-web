import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EmptyModal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setIsModalOpen(false);
      navigate("/response/select");
    }, 3000);
  }, []);
  return (
    <div
      className="w-full h-full bg-black-500 bg-opacity-50 fixed top-0 left-0 z-50 flex items-center justify-center"
      onClick={() => setIsModalOpen(false)}
    >
      <div className="w-72 px-5 py-6 bg-black-400 rounded-md inline-flex flex-col">
        <div className="text-center justify-center text-white-100 text-s font-semibold ">
          카테고리와 관련한
          <br />
          질문이 없습니다
          <br />
          다른 카테고리의 질문을 선택해주세요
        </div>
      </div>
    </div>
  );
};

export default EmptyModal;
