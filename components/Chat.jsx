"use client";
import toast from "react-hot-toast";
import {
  fetchUserTokensById,
  generateChatResponse,
  subtractTokens,
} from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function Chat() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationFn: async (query) => {
      const currentTokens = await fetchUserTokensById(userId);

      if (currentTokens < 100) {
        toast.error("Token balance too low....");
        return;
      }

      const response = await generateChatResponse([...messages, query]);

      if (!response) {
        toast.error("Something went wrong...");
        return;
      }
      setMessages((prev) => [...prev, response.message]);
      const newTokens = await subtractTokens(userId, response.tokens);
      toast.success(`${newTokens} tokens remaining...`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { role: "user", content: text };

    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText("");
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        {messages.map(({ role, content }, index) => {
          const avatar = role == "user" ? "👤" : "🤖";
          const bcg = role == "user" ? "bg-base-200" : "bg-base-100";
          return (
            <div
              key={index}
              className={` ${bcg} flex py-6 -mx-8 px-8
               text-xl leading-loose border-b border-base-300`}
            >
              <span className="mr-4 ">{avatar}</span>
              <p className="max-w-3xl">{content}</p>
            </div>
          );
        })}
        {isPending && <span className="loading"></span>}
      </div>
      <form className="max-w-full w-full mx-auto pt-12 2xl:max-w-[70%]" onSubmit={handleSubmit}>
        <div className="join w-full">
          <input
            type="text"
            placeholder="Message TravelAI"
            required
            className="input input-bordered join-item w-full"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button
            className="btn btn-primary join-item"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "please wait" : "ask question"}
          </button>
        </div>
      </form>
    </div>
  );
}
