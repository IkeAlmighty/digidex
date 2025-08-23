export default function Modal({ onExit, children }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white">
      <button className="absolute left-2 top-0 rotate-45" onClick={onExit}>
        <span className="text-5xl">+</span>
      </button>
      <div className="my-20">{children}</div>
    </div>
  );
}
