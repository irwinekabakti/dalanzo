import { FC } from "react";

interface CustomModalProps {
  title: string;
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const CustomModal: FC<CustomModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  onClose,
  title,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg mb-4 text-[#000]">{title}</h2>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="mr-2 py-2 px-4 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="py-2 px-4 bg-red-500 text-white rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
