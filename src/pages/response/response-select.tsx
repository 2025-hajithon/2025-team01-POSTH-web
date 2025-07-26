import { motion } from "framer-motion";
import colorIcons from "@/components/common/icons/color-icons";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EmptyModal from "@/components/modal/empty-modal";

interface QuestionContent {
  questionId: number;
  category: string;
  content: string;
  authorNickname: string;
}

const categories = [
  { id: 1, name: "공부", encodedName: "STUDY", colorIcon: colorIcons.Pencil },
  {
    id: 2,
    name: "취업",
    encodedName: "EMPLOYMENT",
    colorIcon: colorIcons.Picture,
  },
  {
    id: 3,
    name: "직장",
    encodedName: "WORKPLACE",
    colorIcon: colorIcons.Briefcase,
  },
  { id: 4, name: "진로", encodedName: "CAREER", colorIcon: colorIcons.Watch },
  { id: 5, name: "연애", encodedName: "ROMANCE", colorIcon: colorIcons.Heart },
  {
    id: 6,
    name: "결혼",
    encodedName: "MARRIAGE",
    colorIcon: colorIcons.Hearts,
  },
  { id: 7, name: "가족", encodedName: "FAMILY", colorIcon: colorIcons.House },
  {
    id: 8,
    name: "인간관계",
    encodedName: "RELATIONSHIP",
    colorIcon: colorIcons.Users,
  },
  {
    id: 9,
    name: "자기자신",
    encodedName: "SELF",
    colorIcon: colorIcons.Profile,
  },
  { id: 10, name: "기타", encodedName: "ETC", colorIcon: colorIcons.More },
];

const FramerCategorySwiper = () => {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const paginate = (dir: number) => {
    setIndex((prev) => {
      const next = prev + dir;
      if (next < 0 || next >= categories.length) return prev; // 범위 초과 방지
      return next;
    });
  };

  const onDragEnd = (_: unknown, { offset }: { offset: { x: number } }) => {
    const threshold = 50;
    if (offset.x > threshold) paginate(-1);
    else if (offset.x < -threshold) paginate(1);
  };

  const handleSelect = async () => {
    console.log(categories[index].name);
    localStorage.removeItem("questionContent");
    localStorage.removeItem("category");

    localStorage.setItem("category", categories[index].encodedName);

    try {
      const response = await axios.get("/question", {
        params: {
          category: categories[index].encodedName,
        },
      });
      console.log(response);
      const questionContent: QuestionContent = response.data;
      if (
        response.data.message === "해당 카테고리에 답변 가능한 질문이 없습니다."
      ) {
        setIsModalOpen(true);
        return;
      }
      localStorage.setItem("questionContent", JSON.stringify(questionContent));
      navigate("/response");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full overflow-hidden bg-[#45455A] flex flex-col items-center justify-between p-5">
      <div className="w-full">
        <div className="text-center my-20">
          <h2 className="text-3xl font-bold text-white-100 py-3 ">
            카테고리를 선택해보세요!
          </h2>
          <p className="text-gray-300">
            한 카테고리 당 하나의 고민이 들어있어요
          </p>
        </div>

        <div className="relative w-full h-80 flex items-center justify-center overflow-hidden">
          <motion.div
            className="absolute w-full h-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
          >
            {categories.map((cat, i) => {
              const Icon = cat.colorIcon;

              const offset = i - index;

              const x = offset * 120;
              const scale = offset === 0 ? 1 : 0.7;
              const opacity = offset === 0 ? 1 : 0.3;
              const zIndex = 10 - Math.abs(offset);

              return (
                <motion.div
                  key={cat.id}
                  className="absolute w-full h-full flex flex-col items-center justify-center cursor-grab"
                  animate={{ x, scale, opacity, zIndex }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => {
                    if (offset === -1) paginate(-1);
                    else if (offset === 1) paginate(1);
                  }}
                >
                  <span className="text-white-100 text-xl mt-2 font-bold">
                    {cat.name}
                  </span>
                  <div
                    className={`relative flex flex-col items-center justify-center p-4 rounded-full transition-colors
                    ${offset === 0 ? "rotate-6" : ""}`}
                  >
                    <Icon className="w-28 h-28" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <button
        onClick={handleSelect}
        className="w-full py-3 bg-[#54566A] text-white-100 rounded-lg hover:bg-main-300 hover:text-black-500 transition-colors"
      >
        선택하기
      </button>
      {isModalOpen && <EmptyModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default FramerCategorySwiper;
