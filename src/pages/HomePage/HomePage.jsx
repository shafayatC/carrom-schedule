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

     
    </div>
  );
};

export default HomePage;
