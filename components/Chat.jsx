"use client";
import toast from "react-hot-toast";
import {
  fetchUserTokensById,
  generateChatResponse,
  getMessagesBySenderId,
  saveMessage,
  subtractTokens,
} from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";
import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import ChatInputForm from "./ChatInputForm";

const MESSAGES_PER_PAGE = 10;

export default function Chat() {
  const [text, setText] = useState("");
  const { userId } = useAuth();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const isInitialLoad = useRef(true);
  const scrollHeightRef = useRef(0);
  const queryClient = useQueryClient();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["messages", userId],
      queryFn: async ({ pageParam = 0 }) => {
        const result = await getMessagesBySenderId(userId, pageParam);
        return {
          messages: result,
          nextPage:
            result.length === MESSAGES_PER_PAGE ? pageParam + 1 : undefined,
        };
      },
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 0,
    });

  const { mutate, isPending } = useMutation({
    mutationFn: async (query) => {
      const currentTokens = await fetchUserTokensById(userId);

      if (currentTokens < 200) {
        toast.error("Token balance too low....");
        return null;
      }

      const response = await generateChatResponse([...allMessages, query]);

      if (!response) {
        toast.error("Something went wrong...");
        return null;
      }

      await saveMessage({
        content: response.message.content,
        senderId: `guide-${userId}`,
        role: "system",
      });

      const newTokens = await subtractTokens(userId, response.tokens);
      toast.success(`${newTokens} tokens remaining...`);

      await queryClient.invalidateQueries({ queryKey: ["messages", userId] });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    mutate({ role: "user", content: text });

    setText("");

    await saveMessage({
      content: text,
      senderId: userId,
      role: "user",
    });
    await queryClient.invalidateQueries({ queryKey: ["messages", userId] });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    if (isInitialLoad.current && data?.pages[0]?.messages?.length > 0) {
      scrollToBottom();
      isInitialLoad.current = false;
    }
  }, [data?.pages[0]?.messages]);

  useEffect(() => {
    if (isFetchingNextPage) {
      scrollHeightRef.current = messagesContainerRef.current?.scrollHeight || 0;
    } else if (scrollHeightRef.current > 0) {
      const newScrollHeight = messagesContainerRef.current?.scrollHeight || 0;
      const scrollDiff = newScrollHeight - scrollHeightRef.current;
      if (scrollDiff > 0) {
        messagesContainerRef.current?.scrollTo({
          top: scrollDiff,
          behavior: "auto",
        });
      }
      scrollHeightRef.current = 0;
    }
  }, [isFetchingNextPage, data?.pages]);

  const handleScroll = async (e) => {
    const { scrollTop } = e.target;
    if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  const allMessages =
    data?.pages
      .reduce((acc, page) => {
        return [...acc, ...page.messages];
      }, [])
      .reverse() || [];

  const renderMessage = ({ role, content }, index) => {
    const avatar = role === "user" ? "👤" : "🤖";
    const bcg = role === "user" ? "bg-base-200" : "bg-base-100";

    return (
      <div
        key={index}
        className={`${bcg} flex py-6  px-8 text-xl leading-loose border-b border-base-300`}
      >
        <span className="mr-4">{avatar}</span>
        <p className="max-w-3xl">{content}</p>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto overflow-x-hidden"
      >
        {isFetchingNextPage && (
          <div className="flex w-full justify-center py-4">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
        {allMessages.length > 0 ? (
          allMessages.map(renderMessage)
        ) : (
          <div className="flex w-full h-full items-center justify-center py-4">
            <p className="text-2xl">No messages yet...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
        {isLoading && (
          <div className="flex w-full h-full justify-center py-4">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
      </div>
      <ChatInputForm
        handleSubmit={handleSubmit}
        isPending={isPending}
        text={text}
        setText={setText}
      />
    </div>
  );
}
