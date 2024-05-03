import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_user,
  signin,
  signout,
  signup,
} from "../redux/reducers/user_slice";
import { error, success } from "../redux/reducers/notification_slice";
import { fetch_messages } from "../redux/reducers/message_slice";

export default function Home() {
  const { action } = useParams();
  const dispatch = useDispatch();
  const [isSignin, setIsSignin] = useState(true);
  const {
    user,
    loading_user,
    loading_signin,
    loading_signout,
    loading_signup,
  } = useSelector((state) => state.user);

  const { messages, loading_messages, loading_create } = useSelector(
    (state) => state.message
  );

  useEffect(() => {
    dispatch(fetch_user()).then((res) => {
      if (!res.error) {
        dispatch(fetch_messages({ channel: "6634640acfe51d5ec7e147c6" }));
      }
    });
  }, [action]);

  const GlobalChannel = () => {
    const [focus, setFocus] = useState(false);

    const getRows = () => {
      if (focus) return 6;
      return 2;
    };

    return (
      <div className="h-full w-full flex flex-col justify-between sm:w-3/4 md:w-1/2 lg:w-1/4 bg-black bg-opacity-50 rounded-xl p-[1rem]">
        <ul className="flex h-[85%] overflow-auto flex-col-reverse gap-1 mb-[1rem]">
          {messages.map((message, index) => {
            return (
              <li key={index}>
                <Message message={message} />
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col sm:flex-row items-end gap-2">
          <textarea
            rows={getRows()}
            className="w-full ms:w-[85%] rounded-lg p-2 focus:outline-none "
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
          <div className="w-full sm:w-[15%]">
            <button className="bg-black rounded-lg p-2 text-white flex justify-center items-center w-full">
              <img src="/icons/send.svg" width={25} alt="" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const New = () => {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center sm:w-3/4 md:w-1/2 lg:w-1/4 bg-black bg-opacity-50 rounded-xl p-[1rem]">
        <h1 className="text-white">This feature is still in development!</h1>
      </div>
    );
  };

  const Authentication = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState(1);

    return (
      <div className="h-full w-full flex flex-col justify-center sm:w-3/4 md:w-1/2 lg:w-1/4 bg-black bg-opacity-50 rounded-xl p-[1rem]">
        {user ? (
          <button
            className="bg-black p-2 text-white font-bold rounded-lg"
            onClick={() => {
              dispatch(signout()).then((res) => {
                if (res.error) {
                  dispatch(error(res.error.message));
                } else {
                  dispatch(success("Signed Out Successfully!"));
                }
              });
            }}
          >
            {loading_signout ? "Please wait" : "LOGOUT"}
          </button>
        ) : (
          <>
            {isSignin ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="username"
                  className="focus:outline-none bg-white rounded-lg w-full p-2"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="username"
                  className="focus:outline-none bg-white rounded-lg w-full p-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="bg-black p-2 text-white font-bold rounded-lg"
                  disabled={loading_signin}
                  onClick={() => {
                    dispatch(signin({ username, password })).then((res) => {
                      if (res.error) {
                        dispatch(error(res.error.message));
                      } else {
                        dispatch(success("Signed In Successfully!"));
                        dispatch(fetch_user());
                      }
                    });
                  }}
                >
                  {loading_signin ? "Please wait" : "SIGNIN"}
                </button>
                <button
                  className="underline text-white"
                  onClick={() => setIsSignin(false)}
                >
                  i don't have an account
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="focus:outline-none bg-white rounded-lg w-full p-2"
                />
                <input
                  type="text"
                  placeholder="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className="focus:outline-none bg-white rounded-lg w-full p-2"
                />
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="password"
                  className="focus:outline-none bg-white rounded-lg w-full p-2"
                />
                <input
                  type="text"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  placeholder="You identify as a ... ?"
                  className="focus:outline-none bg-white rounded-lg w-full p-2"
                />
                <h1 className="text-white">SELECT YOUR AVATAR:</h1>
                <ul className="flex flex-wrap gap-2 justify-center items-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((avat, index) => {
                    return (
                      <li
                        key={index}
                        className={` cursor-pointer list ${
                          avatar == avat
                            ? "border border-white rounded-lg scale-[125%]"
                            : "hover:scale-[125%]"
                        }`}
                        onClick={() => setAvatar(avat)}
                      >
                        <img
                          src={`/icons/profile/${avat}.svg`}
                          width={35}
                          className="rounded-lg"
                          alt=""
                        />
                      </li>
                    );
                  })}
                </ul>
                <button
                  className="bg-black p-2 text-white font-bold rounded-lg"
                  disabled={loading_signup}
                  onClick={() => {
                    dispatch(
                      signup({ name, username, password, gender, avatar })
                    ).then((res) => {
                      if (res.error) {
                        dispatch(error(res.error.message));
                      } else {
                        dispatch(success("Signed Up Successfully!"));
                      }
                    });
                  }}
                >
                  {loading_signup ? "Please wait" : "SIGNUP"}
                </button>
                <button
                  className="underline text-white"
                  onClick={() => setIsSignin(true)}
                >
                  already have an account
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const Loading = () => {
    return (
      <div className="h-full w-full flex flex-col justify-center sm:w-3/4 md:w-1/2 lg:w-1/4 bg-black bg-opacity-50 rounded-xl p-[1rem]">
        <h1 className="text-white">Loading</h1>
      </div>
    );
  };

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center p-[1rem] gap-[1rem]">
      <div className="w-full h-3/4 flex justify-center items-center">
        {loading_user ? (
          <Loading />
        ) : (
          <>
            {action === "signin-signup" ? (
              <Authentication />
            ) : action === "new" ? (
              <New />
            ) : (
              <GlobalChannel />
            )}
          </>
        )}
      </div>
      <Navigation />
    </section>
  );
}
