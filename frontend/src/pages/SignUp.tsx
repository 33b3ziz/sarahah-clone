const SignUp = () => {
  return (
    <section className="flex justify-center items-center h-[calc(100vh-72px)]">
      <form action="" className="basis-[50%] flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Your Email"
          className="rounded-md border-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Your Password"
          className="rounded-md border-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-green-500 rounded-md h-8 mt-2 text-white"
        >
          Sign up
        </button>
      </form>
    </section>
  );
};

export default SignUp;
