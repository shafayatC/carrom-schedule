import { useContext, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { dataContextManager } from "../../App";

const SignUpPage = ({ onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);

  const [getUserInfo, setUserInfo, getApiBasicUrl] = useContext(dataContextManager);

  const navigate = useNavigate();
  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const username = e.target["usernameL"].value;
    const password = e.target["passwordL"].value;

    const userData = {
      username: username,
      password: password,
    }

    fetch(`${getApiBasicUrl}/carrom-user-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(res => res.json())
      .then(data => {
        // Handle the result
        console.log(data);

        if (data.status_code == 201) {
          setUserInfo(data);
          alert("User login successfully");
          navigate("/carrom-schedule")
          // handleToggle(); // Switch to sign in mode
        }else{
          alert("Username and password is not correct");
        }
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });

  }
  const handleSignUp = (e) => {
    e.preventDefault();

    const name = e.target["name"].value;
    const username = e.target["username"].value;
    const password = e.target["password"].value;
    const confirmPassword = e.target["confirmPassword"].value;
    const secrete_word = e.target["secrete_word"].value;

    const userData = {
      name: name,
      username: username,
      password: password,
      secrete_word: secrete_word
    }

    console.log(userData); 

    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {

      fetch(`${getApiBasicUrl}/carrom-user-reg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(res => res.json())
        .then(data => {
          // Handle the result
          console.log(data);

          if (data.status_code == 201) {

            alert("User created successfully")
            handleToggle(); // Switch to sign in mode
          }else{
            alert(data.message)
          }
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
        });

    }
  }

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white rounded-lg p-8 w-[400px] relative">
          <button onClick={onClose} className="absolute top-0 right-0 p-2 text-red-500">
            <IoIosCloseCircleOutline className="text-2xl" />
          </button>
          <h2 className="text-2xl font-bold mb-4">{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
          {isSignIn ? (
            <>
              <form onSubmit={handleLogin} className="space-y-4">

                <div>
                  <label htmlFor="usernameL" className="block">Username</label>
                  <input required type="text" name="usernameL" id="usernameL" className="border outline-none border-gray-300 px-3 py-2 rounded-md w-full" />
                </div>
                <div>
                  <label htmlFor="password" className="block">Password</label>
                  <input required name="passwordL" type="password" id="password" className="border outline-none border-gray-300 px-3 py-2 rounded-md w-full" />
                </div>
                <button type="submit" className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md w-full">
                  {'Sign In'}
                </button>
              </form>

            </>
          ) : (
            <>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block">Full Name</label>
                  <input required type="text" name="name" id="name" className="border outline-none border-gray-300 px-3 py-2 rounded-md w-full" />
                </div>
                <div>
                  <label htmlFor="username" className="block">Username</label>
                  <input required type="text" name="username" id="username" className="border outline-none border-gray-300 px-3 py-2 rounded-md w-full" />
                </div>
                <div>
                  <label htmlFor="password" className="block">Password</label>
                  <input required type="password" name="password" id="password" className="border outline-none border-gray-300 px-3 py-2 rounded-md w-full" />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block">Confirm password</label>
                  <input required type="password" name="confirmPassword" id="confirmPassword" className="border outline-none border-gray-300 px-3 py-2 rounded-md w-full" />
                </div>
                <div>
                  <label htmlFor="secretword" className="block">Secret word</label>
                  <p className="text-xs text-rose-900">You need this word to recover your password</p>
                  <input required type="text" name="secrete_word" id="secretword" className="border outline-none border-gray-300 px-3 py-2 rounded-md w-full" />
                </div>
                <button type="submit" className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md w-full">
                  {'Sign Up'}
                </button>
              </form>

            </>
          )}

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