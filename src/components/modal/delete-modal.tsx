export const DeleteModal: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}> = ({ onConfirm, onCancel, isDeleting }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-[#3a3b49] rounded-lg p-6 w-[300px] text-center">
      <h2 className="text-white text-[16px] font-bold mb-2">
        주고받은 편지를 삭제하시겠어요?
      </h2>
      <p className="text-[13px] text-gray-300 mb-6">
        영구적으로 삭제되며, 복구가 불가능합니다
      </p>
      <div className="flex justify-between gap-3">
        <button
          onClick={onCancel}
          className="flex-1 bg-[#54566a] text-white rounded-lg py-2 hover:bg-[#5f6175]"
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
