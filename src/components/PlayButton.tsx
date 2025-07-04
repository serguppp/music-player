
export default function PlayButton() {
  return (
    <div className={`absolute w-14 h-14 hover:scale-110 shadow-black shadow-sm bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-17 right-4`}>
      <div className="w-0 h-0 border-l-[20px] border-l-black border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" />
    </div>
  );
}
