import LogoutButton from "./LogoutButton";
import HamburgerMenu from "./HamburgerMenu";
import { Link, useLocation } from "react-router";

export default function Navigation() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const pageSlug = "/" + (segments[segments.length - 1] || "");

  const pages = [
    { title: "Contact List", href: "/" },
    { title: "Import Contacts", href: "/import" },
  ];

  return (
    <nav>
      <div className="flex items-stretch justify-between border-b">
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
      </div>
    </nav>
  );
}
