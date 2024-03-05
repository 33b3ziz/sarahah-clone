import { useState } from "react";
import { useJwt } from "react-jwt";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const AddMessage = () => {
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  // console.log(token);

  const { decodedToken } = useJwt(token!);

  const { id: userId } = useParams();
  // console.log(userId, (decodedToken as { id: string })?.id);

  if (userId !== (decodedToken as { id: string })?.id) {
    return (
      <h1 className="font-bold flex justify-center items-center text-7xl">
        Unauthorized
      </h1>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log(decodedToken);
    // console.log(message, (decodedToken as { id: string }).id);
    const res = await fetch(`http://localhost:3000/messages/addMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: (decodedToken as { id: string }).id,
        content: message,
      }),
    });
    if (res.ok) {
      toast.success("Message Sent");
    }
    setMessage("");
  }

  return (
    <>
      <Navbar />
      <section className="flex justify-center items-center h-[calc(100vh-72px)]">
        <form
          onSubmit={handleSubmit}
          className="basis-[50%] flex flex-col gap-2"
        >
          <label htmlFor="message">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Your Message"
            className="rounded-md border-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 min-h-32"
          />
          <button
            type="submit"
            className="bg-green-600 rounded-md h-8 mt-2 text-white"
          >
            Add Message
          </button>
        </form>
      </section>
    </>
  );
};

export default AddMessage;
