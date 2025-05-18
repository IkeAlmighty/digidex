import LogoutButton from "./LogoutButton";
import HamburgerMenu from "./HamburgerMenu";
import { Link, useLocation } from "react-router";

export default function Navigation() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const pageSlug = "/" + (segments[segments.length - 1] || "");

  const pages = [
    { title: "Your Calendar", href: "/" },
    { title: "Explore Events", href: "/explore" },
    { title: "Your Subscriptions", href: "/subscriptions" },
    { title: "Your Crews", href: "/permissions" },
  ];

  return (
    <nav>
      <div className="flex items-stretch justify-between border-b">
        <h1 className="inline-block p-2">{"PolySched"}</h1>

        <HamburgerMenu>
          {pages.map((page) => {
            return (
              <Link
                to={`${page.href}`}
                className={`${page.href === pageSlug && "border-b-2"} block m-3`}
              >
                {page.title}
              </Link>
            );
          })}
          <LogoutButton />
        </HamburgerMenu>
      </div>
    </nav>
  );
}
