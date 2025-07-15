export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen overflow-y-hidden">
      <span className="flex space-x-1">
      <span className="animate-bounce text-9xl [animation-delay:-0.3s]">.</span>
      <span className="animate-bounce text-9xl [animation-delay:-0.15s]">.</span>
      <span className="animate-bounce text-9xl ">.</span>
    </span>
    </div>
  );
}