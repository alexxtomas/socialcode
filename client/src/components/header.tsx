import { Link } from "react-router-dom";

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
            <Link className="rounded py-2 px-4 hover:bg-white/90 hover:text-black" to={"/"}>
              Profile
            </Link>
          </li>
          <li>
            <Link
              className="rounded py-2 px-4 hover:bg-white/90 hover:text-black"
              to={"/new/snippet"}
            >
              New Snippet
            </Link>
          </li>
          <li>
            <Link tabIndex={0} className="bg-red-500 rounded py-2 px-4" to={"/new/snippet"}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
