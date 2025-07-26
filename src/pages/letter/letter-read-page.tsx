import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Arrow from "@/assets/icons/chevron-up.svg?react";
import { useNavigate } from "react-router-dom";

const LetterReadPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-[#54566A] flex flex-col items-center justify-between font-suit px-6 py-10">
      {/* 고민 카드 */}
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="w-full px-5 pt-6 pb-3 bg-black-500 rounded-md flex flex-col gap-3 text-white-100">
          {/* 제목 */}
          <div className="text-stone-300 text-sm font-semibold">
            내가 보낸 고민
          </div>

          {/* 내용 (애니메이션 포함) */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden text-sm font-medium leading-snug whitespace-pre-line"
              >
                회사에서 일이 몰려도, 부탁보다는 내가 하는게 마음 편해서 결국 다
                제가 하게 되고, 친구 사이에서도 모임 장소나 분위기 다 맞춰주는
                편이예요.. 누가 부탁 할 때마다 거절을 못하겠어서 도와주면서도
                속으론 ‘왜 나만 이러지’ 싶은 생각이 계속 들어요 ㅠ 이런 성격
                바꾸려면 어떻게 해야 하나요 😥 계속 이렇게 지내왔는데 거절하면
                갑자기 나쁜 사람 될까봐 무서워요
              </motion.div>
            )}
          </AnimatePresence>

          {/* 날짜 */}
          <div className="w-full text-right text-stone-300 text-sm font-semibold leading-3">
            2025년 7월 11일 오후 9시
          </div>

          {/* 화살표 버튼 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-6 h-6 mx-auto flex items-center justify-center transition-transform bg-transparent outline-none border-none ring-0 focus:outline-none focus:ring-0"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-10 h-10"
            >
              <Arrow className="w-10 h-10 rotate-180" />
            </motion.div>
          </button>
        </div>

        {/* 답장 카드 */}
        <div className="w-full px-5 pt-6 pb-5 bg-white-100 rounded-md flex flex-col gap-4 font-suit">
          <div className="text-stone-400 text-sm font-semibold">
            나에게 도착한 편지
          </div>
          <div className="text-gray-main text-sm font-medium leading-snug whitespace-pre-line">
            헉 제가 딱 그랬었어서 너무 공감돼서 답장 보내요.. 저도 예전엔 누가
            부탁하면 거절하기 어려워서 그냥 다 해주고 말았는데 지금은 속으로
            스스로에게 한 번 물어보는 거 같아요 “내가 지금 이 부탁을 들어주려는
            이유가 뭘까? 미안해서? 불편해서? 진짜 돕고 싶어서?” 이런 느낌으로요!
            ...
          </div>
          <div className="text-right text-stone-400 text-sm font-semibold leading-5">
            <div>2025년 7월 14일 오후 9시</div>
            <div>from. 홍익</div>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/letter/response")}
        className="w-1/2 py-3 bg-white-100 text-black-500 rounded-lg hover:bg-main-400 transition-colors"
      >
        반응 남기기
      </button>
    </div>
  );
};

export default LetterReadPage;
