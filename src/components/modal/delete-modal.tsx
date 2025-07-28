export const DeleteModal: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}> = ({ onConfirm, onCancel, isDeleting }) => (
  <div
    className="w-full h-full bg-black-500 bg-opacity-50 fixed top-0 left-0 z-50 flex items-center justify-center"
    onClick={onCancel}
  >
    <div className="bg-[#54566a] rounded-lg p-6 w-[300px] text-center">
      <h2 className="text-white-100 text-[16px] font-bold mb-2">
        편지를 삭제하시겠어요?
      </h2>
      <p className="text-[13px] text-gray-300 mb-6">
        영구적으로 삭제되며, 복구가 불가능합니다
      </p>
      <div className="flex justify-between gap-3">
        <button
          onClick={onCancel}
          className="flex-1 bg-white-100 text-black-400 rounded-lg py-2 hover:bg-[#5f6175]"
        >
          취소
        </button>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="flex-1 bg-[#8dc5ff] text-[#3a3b49] font-semibold rounded-lg py-2 hover:bg-[#7ab8f0] disabled:opacity-50"
        >
          {isDeleting ? "삭제 중..." : "네"}
        </button>
      </div>
    </div>
  </div>
);
