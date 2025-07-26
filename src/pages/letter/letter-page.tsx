import { motion } from "framer-motion";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import Letter from "@/assets/letter/letters.svg?react";
import { useNavigate } from "react-router-dom";
import { categories } from "@/types/question";

export interface List {
  replyId: number;
  replyAt: string;
  questionCategory: string;
}
// 📨 편지 컴포넌트 (부모의 상태를 받아 애니메이션만 담당)
const LetterComponent = ({
  item,
  onClick,
}: {
  item: List;
  onClick: () => void;
}) => {
  const getIcon = (category: string) => {
    const categoryObj = categories.find(
      (item) => item.encodedName === category
    );
    return categoryObj?.colorIcon;
  };
  return (
    // overflow-hidden을 추가하여 편지지가 봉투 밖으로 나가는 부분을 숨깁니다.
    <div className="relative w-[300px] h-[300px] overflow-hidden">
      {/* 편지 봉투 (배경) */}
      <Letter className="absolute top-0 left-0 w-full h-full z-0" />
      {(() => {
        const Icon = getIcon(item.questionCategory);
        return Icon ? (
          <Icon
            className="w-8 h-8 absolute top-[68px] left-[65px] rotate-12"
            onClick={onClick}
          />
        ) : null;
      })()}
      <div className="absolute top-[85px] right-[65px] z-10 transform rotate-[4.5deg] text-xs">
        {(() => {
          const date = new Date(item.replyAt);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}년 ${month}월 ${day}일`;
        })()}
      </div>

      {/* 편지지 (Framer Motion으로 제어) */}
    </div>
  );
};

const LetterPage = () => {
  const [index, setIndex] = useState(0);
  const [list, setList] = useState<List[]>([]);
  const navigate = useNavigate();

  // 📩 질문 개수 불러오기
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/reply/list");
        setList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestions();
  }, []);

  const paginate = (dir: number) => {
    setIndex((prev) => {
      const next = prev + dir;
      if (next < 0 || next >= list.length) return prev;
      return next;
    });
  };

  const onDragEnd = (_: unknown, { offset }: { offset: { x: number } }) => {
    const threshold = 50;
    if (offset.x > threshold) paginate(-1);
    else if (offset.x < -threshold) paginate(1);
  };
  const handleClick = (item: List) => {
    localStorage.setItem("replyInfo", JSON.stringify(item));
    navigate("/letter/read");
  };

  return (
    <div className="w-full h-full overflow-hidden bg-[#45455A] flex flex-col items-center justify-center font-suit px-6 py-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white-100 mb-2">
          <span className="text-main-200">답장 편지</span>가 {list.length}통
          도착했어요!{" "}
        </h2>
        <p className="text-gray-300">클릭해서 편지를 열어보세요</p>
      </div>

      <div className="relative w-full h-80 flex items-center justify-center overflow-hidden mb-20 mt-12">
        <motion.div
          className="absolute w-full h-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={onDragEnd}
        >
          {list.map((item, i) => {
            const offset = i - index;
            const x = offset * 120;
            const scale = offset === 0 ? 1 : 0.7;
            const opacity = offset === 0 ? 1 : 0.3;
            const zIndex = 10 - Math.abs(offset);

            return (
              <motion.div
                key={i}
                className="absolute w-full h-full flex flex-col items-center justify-center cursor-grab"
                animate={{ x, scale, opacity, zIndex }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => {
                  if (offset === -1) paginate(-1);
                  else if (offset === 1) paginate(1);
                }}
              >
                <div className="w-[360px] h-full flex flex-col items-center justify-center">
                  <LetterComponent
                    item={item}
                    onClick={() => handleClick(item)}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default LetterPage;
