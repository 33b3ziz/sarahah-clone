import { useState } from "react";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          className="bg-green-500 rounded-md h-8 mt-2 text-white"
        >
          Sign in
        </button>
      </form>
    </section>
  );
};

export default Signin;
