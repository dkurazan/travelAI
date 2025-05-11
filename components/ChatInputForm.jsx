export default function ChatInputForm({ handleSubmit, isPending, text, setText }) {
  return (
    <form
      className="max-w-full w-full mx-auto pt-3 2xl:px-3 border-t border-base-300"
      onSubmit={handleSubmit}
    >
      <div className="join w-full">
        <input
          type="text"
          placeholder="Message RouteAI"
          required
          className="input input-bordered join-item w-full focus:!outline-none"
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
  );
}
