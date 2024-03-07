import { useContext, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { dataContextManager } from "../../App";
import Modal from "../Modal/Modal";

const SignInPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [getUserInfo, setUserInfo, getApiBasicUrl] = useContext(dataContextManager);
    const [isOpen, setIsOpen] = useState(false);
    const [getMsg, setMsg] = useState("");

    const openModal = () => {
        setIsOpen(true);
    };

    const onClose = () => {
        navigate("/")
    }
    const closeModal = () => {
        setIsOpen(false);
    };
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
                    // alert("User login successfully");
                    navigate("/carrom-schedule/table")
                    // handleToggle(); // Switch to sign in mode
                } else {
                    // alert("Incorrect Credentials");
                    setMsg("Incorrect Credentials");
                    openModal();
                }
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });

    }

    return (
        <>
            <div className="bg">
                <div className="container mx-auto">
                    <div className="flex items-start justify-end pt-4">
                    </div>
                    <div>
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                            <div className="bg-white rounded-lg p-8 w-[400px] relative">
                                <button onClick={onClose} className="absolute top-0 right-0 p-2 text-red-500">
                                    <IoIosCloseCircleOutline className="text-2xl" />
                                </button>
                                <h2 className="text-2xl font-bold mb-4">{isSignIn ? 'Sign In' : 'Sign Up'}</h2>

                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div>
                                        <label htmlFor="usernameL" className="block">User Name</label>
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

                                <p className="mt-4 text-center">
                                    {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
                                    <button onClick={()=>navigate('/signup')} className="text-green-500 font-semibold focus:outline-none">
                                        { 'Sign Up' }
                                    </button>
                                </p>
                            </div>
                        </div>
                        <Modal isOpen={isOpen} onClose={closeModal} message={getMsg} />

                    </div>
                </div>
            </div>
        </>
    );
};

export default SignInPage;