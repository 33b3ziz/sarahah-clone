import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  type FormData = {
    name: string;
    email: string;
    password: string;
    age: number;
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = async (values: FormData) => {
    // console.log(values);
    const res = await fetch("http://localhost:3000/users/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    console.log(data);
    if (data) {
      setSuccess(true);
      setMessage(data.message);
    }
  };

  return (
    <section className="flex justify-center items-center h-[calc(100vh-72px)]">
      {success ? (
        <div className="basis-[50%] flex flex-col gap-2">
          <p>{message}</p>
          <button
            type="button"
            className="bg-green-500 rounded-md h-8 mt-2 text-white"
            onClick={() => navigate("/sign-in")}
          >
            Sign in
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="basis-[50%] flex flex-col gap-2"
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            id="name"
            required
            placeholder="Your Name"
            className="rounded-md border-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            id="email"
            required
            placeholder="Your Email"
            className="rounded-md border-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              validate: (value) =>
                Boolean(
                  value.match(
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                  )
                ) ||
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
            })}
            placeholder="Your Password"
            className="rounded-md border-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
          <label htmlFor="age">Age</label>
          <input
            type="number"
            {...register("age", {
              required: "Age is required",
              validate: (value) => {
                if (value < 18) {
                  return "You must be 18 years or older";
                }
                if (value > 60) {
                  return "You must be 60 years or younger";
                }
                return true;
              },
            })}
            id="age"
            required
            placeholder="Your Age"
            className="rounded-md border-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
          />
          {errors.age && (
            <span className="text-red-500 text-sm">{errors.age.message}</span>
          )}
          <button
            type="submit"
            className="bg-green-500 rounded-md h-8 mt-2 text-white"
          >
            Sign up
          </button>
        </form>
      )}
    </section>
  );
};

export default SignUp;
