import { IoIosCloseCircleOutline } from "react-icons/io";

const Modal = ({ isOpen, onClose , message }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 transition-opacity" onClick={onClose}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative bg-white rounded-lg p-8 ">
              <div className="flex justify-center items-center mb-4">
              {/* <h2 className="text-lg font-semibold pt-4">Daily Limit Reached : Retry Tomorrow</h2> */}
              <h2 className="text-lg font-semibold pt-4">{message}</h2>
                <button onClick={onClose} className="absolute top-0 right-0 p-2 text-red-500">
            <IoIosCloseCircleOutline className="text-2xl" />
          </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
