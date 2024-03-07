import { useState } from "react";
import SignUpPage from "../SignUpPage/SignUpPage";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const navigate = useNavigate();
  return (
    <div className="bg"
    >
      <div className="container mx-auto">
        <div className="flex items-start justify-end pt-4">
          <button
            onClick={()=>navigate("/signin")}
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
