import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const SignUpPage = ({onClose}) => {
    const [isSignIn, setIsSignIn] = useState(true);

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };
    return (
        <div>
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-[400px] relative">
        <button onClick={onClose} className="absolute top-0 right-0 p-2 text-red-500">
          <IoIosCloseCircleOutline className="text-2xl" />
        </button>
        <h2 className="text-2xl font-bold mb-4">{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
        <form className="space-y-4">
          {isSignIn ? (
            <>
              <div>
                <label htmlFor="email" className="block">Email</label>
                <input type="email" id="email" className="border outline-none border-gray-300 px-3 py-2 rounded-md w-full" />
              </div>
              <div>
                <label htmlFor="password" className="block">Password</label>
                <input type="password" id="password" className="border outline-none border-gray-300 px-3 py-2 rounded-md w-full" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="name" className="block">Name</label>
                <input type="text" id="name" className="border outline-none border-gray-300 px-3 py-2 rounded-md w-full" />
              </div>
              <div>
                <label htmlFor="email" className="block">Email</label>
                <input type="email" id="email" className="border outline-none border-gray-300 px-3 py-2 rounded-md w-full" />
              </div>
              <div>
                <label htmlFor="password" className="block">Password</label>
                <input type="password" id="password" className="border outline-none border-gray-300 px-3 py-2 rounded-md w-full" />
              </div>
            </>
          )}
          <button type="submit" className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md w-full">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
          <button onClick={handleToggle} className="text-green-500 font-semibold focus:outline-none">
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
        </div>
    );
};

export default SignUpPage;