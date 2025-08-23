import LogoutButton from "./LogoutButton";
import HamburgerMenu from "./HamburgerMenu";
import { Link, useLocation } from "react-router";

export default function Navigation({ onPlus }) {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const pageSlug = "/" + (segments[segments.length - 1] || "");

  const pages = [
    { title: "Contact List", href: "/" },
    { title: "Import Contacts", href: "/import" },
  ];

  return (
    <nav className="bg-white flex items-stretch justify-between border-b">
      {onPlus && (
        <div className="my-1 [&>button]:cursor-pointer text-5xl">
          <button onClick={onPlus}>+</button>
        </div>
      )}
      <h1 className="inline-block p-2">DigiDex</h1>

      <HamburgerMenu>
        {pages.map((page, index) => {
          return (
            <Link
              key={`${page.href}index`}
              to={`${page.href}`}
              className={`${page.href === pageSlug && "border-b-2"} block m-3`}
            >
              {page.title}
            </Link>
          );
        })}
        <LogoutButton />
      </HamburgerMenu>
    </nav>
  );
}
