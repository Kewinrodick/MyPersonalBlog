import { useState, useContext } from "react";
import { AuthContext } from "../context/MainContext";
import { useNavigate ,Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#54342A]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#3d221a] shadow-2xl shadow-[#694337]/50 rounded-2xl p-10 w-[350px] flex flex-col gap-5"
      >
        <h2 className="text-4xl text-[#A57A5F] font-handlee text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded-lg bg-[#54342A] text-[#A57A5F] border border-[#694337] focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          className="px-4 py-2 rounded-lg bg-[#54342A] text-[#A57A5F] border border-[#694337] focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-[#A57A5F] text-[#54342A] font-bold py-2 rounded-lg hover:bg-[#c69b7c] transition-all duration-300"
        >
          Sign In
        </button>

        <p className="text-center text-[#A57A5F]/60 text-sm font-handlee">
          Welcome back ✨
        </p>
        <p className="text-center text-[#A57A5F]/60  font-handlee">donot have an account? <Link to={'/user/signup'} className="text-sm text-[#A57A5F] "><u> Sign up</u></Link></p>
      </form>
    </div>
  );
}
