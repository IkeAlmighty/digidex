export default function Modal({ children }) {
  return (
    <div className="top-15 fixed w-screen h-screen bg-white">
      <div className="my-20">{children}</div>
    </div>
  );
}
