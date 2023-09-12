import { Link } from "react-router-dom";
import UserDropdown from "./user-dropdown";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between h-[74px]">
      <h1 className="flex justify-center flex-grow basis-0">
        <Link to={"/"}>
          <img className="w-[84px] h-[84px]" src="/logo.png" alt="SocialCode Logo" />
        </Link>
      </h1>

      <nav>
        <ul className="flex items-center gap-4">
          <li>
            <Link
              className="text-white bg-gradient-to-r  hover:bg-gradient-to-br focus:ring-4 focus:outline-none hover:bg-white/10 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              to={"/new/snippet"}
            >
              New Snippet
            </Link>
          </li>
          <li>
            <UserDropdown />
          </li>
        </ul>
      </nav>
    </header>
  );
}
