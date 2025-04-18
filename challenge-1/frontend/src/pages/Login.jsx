import React, { useState } from "react";
import { User, Lock, Loader } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";

const Login = () => {
  const { login, signup, loading } = useAuthStore();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(username, password);
    } else {
      signup(username, password);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border border-gray-300 focus-within:border-indigo-500 rounded-xl px-3 py-2 shadow-sm bg-gray-50">
            <User className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent outline-none"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 focus-within:border-indigo-500 rounded-xl px-3 py-2 shadow-sm bg-gray-50">
            <Lock className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-xl font-semibold transition duration-200 shadow-md flex items-center justify-center"
          >
            {loading ? <Loader className="animte-spin size-5" /> : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-500 hover:underline font-medium"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
