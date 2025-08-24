import LogoutButton from "./LogoutButton";
import HamburgerMenu from "./HamburgerMenu";
import { Link, useLocation } from "react-router";

export default function Navigation({ children }) {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const pageSlug = "/" + (segments[segments.length - 1] || "");

  const pages = [
    { title: "Contact List", href: "/" },
    { title: "Import Contacts", href: "/import" },
  ];

  return (
    <nav className="bg-white flex items-stretch justify-between border-b !pt-1">
      <div className="my-1 [&>button]:cursor-pointer">{children}</div>

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
