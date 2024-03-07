import { useState } from "react";
import SignUpPage from "../SignUpPage/SignUpPage";
const HomePage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="bg"
    >
      <div className="container mx-auto">
        <div className="flex items-start justify-end pt-4">
          <button
            onClick={togglePopup}
            className="bg-green-500  text-white px-6 font-semibold py-1 rounded-2xl"
          >
            Sign In
          </button>
        </div>
        {isPopupOpen && <SignUpPage onClose={togglePopup} />}
      </div>

     <div className="absolute bottom-3 left-3">
      <h1 className="text-red-600 font-bold text-xs bg-white p-2 rounded-xl">Powerd by Shafayat</h1>
     </div>
    </div>
  );
};

export default HomePage;
