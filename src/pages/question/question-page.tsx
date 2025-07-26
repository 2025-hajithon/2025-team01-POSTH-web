import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import { categories } from "@/types/question";

const QuestionPage = () => {
  const [category, setCategory] = useState<number>(-1);
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(category);
    console.log(value);
  }, [category, value]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/question", {
        category: categories[category - 1].encodedName,
        content: value,
      });
      console.log(response);
      navigate("/question/submit");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full bg-gray-50 flex flex-col items-center font-suit p-5 justify-between overflow-hidden flex-1"
    >
      <div className="w-full flex flex-col items-center justify-center gap-5">
        {/* 고민 박스 */}
        <div className="grid grid-cols-5 gap-y-4 gap-x-2 place-items-center bg-white p-4 rounded-lg w-full">
          {categories.map((item) => (
            <div
              onClick={() => setCategory(item.id)}
              key={item.id}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              {category === item.id ? (
                <item.colorIcon className={`w-10 h-10`} />
              ) : (
                <item.icon
                  className={`w-10 h-10 ${
                    category === item.id ? "text-main-100" : "text-gray-500"
                  }`}
                />
              )}
              <span
                className={`text-sm ${
                  category === item.id
                    ? "text-black-500 text-xs font-bold"
                    : "text-gray-500 text-xs font-medium"
                }`}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
        <div className="bg-[#FFFEFB] rounded-lg p-[20px] w-full">
          {/* 노트 타이틀 */}
          <div className="text-black-500 text-sm font-semibold mb-4">
            지금 나의 고민은 무엇인가요?{" "}
            <span className="font-medium">(200자 미만)</span>
          </div>

          {/* 노트 느낌 textarea */}
          <div className="relative">
            <textarea
              rows={9}
              maxLength={200}
              className="font-medium w-full resize-none bg-transparent text-sm text-black-500 outline-none leading-9 tracking-wide z-10 relative "
              placeholder=""
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            {/* 밑줄 배경 */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-0">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-full border-b border-blue-200 py-4" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 전송 버튼 */}
      <button
        className=" w-full py-3 bg-main-100 rounded-lg text-sm font-semibold disabled:bg-gray-200 text-black-500 disabled:text-white-100"
        disabled={category === -1 || value.length === 0}
      >
        고민 편지 보내기
      </button>
    </form>
  );
};

export default QuestionPage;
