import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(email, password);
    const res = await fetch("http://localhost:3000/users/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data) {
      localStorage.setItem("token", data.token);
      navigate("/profile");
    }
  }

  return (
    <section className="flex justify-center items-center h-[calc(100vh-72px)]">
      <form onSubmit={handleSubmit} className="basis-[50%] flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Your Email"
          className="rounded-md border-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Your Password"
          className="rounded-md border-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 transition rounded-md h-8 mt-2 text-white"
        >
          Sign in
        </button>
        <div className="flex gap-4 justify-end items-center">
          <span>Create Account</span>
          <Link
            to="/sign-up"
            className="bg-green-500 hover:bg-green-600 transition text-white rounded-md px-2 py-1"
          >
            sign up
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Signin;
