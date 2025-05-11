export default function ChatMessagesList({}) {
  return (
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
      {allMessages.map(renderMessage)}
      <div ref={messagesEndRef} />
      {(isPending || isLoading) && (
        <div className="flex w-full justify-center py-4">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      )}
    </div>
  );
}
