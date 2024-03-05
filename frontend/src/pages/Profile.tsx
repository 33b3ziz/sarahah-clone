import { useEffect, useState } from "react";

const Profile = () => {
  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([]);
  console.log(token);
  useEffect(() => {
    async function fetchMessages() {
      const res = await fetch("http://localhost:3000/messages/getMessages", {
        headers: {
          Authorization: `Bearer ${token}`,
          token: token!,
        },
      });
      const data = await res.json();
      setMessages(data.messages);
      console.log(data);
    }
    fetchMessages();
  }, [token]);
  // console.log(token);
  return (
    <section className="w-full min-h-[calc(100vh-72px)] flex  justify-center items-center gap-y-4 my-6 flex-wrap bg-[#f5f8fa]">
      <h1 className="w-full text-center font-bold">Profile</h1>
      {messages?.map((message: { content: string }) => (
        <div className="basis-[60%] min-h-24 bg-white text-center rounded-md flex justify-center items-center shadow-2xl ">
          {message.content}
        </div>
      ))}
    </section>
  );
};

export default Profile;
