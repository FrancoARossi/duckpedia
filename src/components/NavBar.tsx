import type { Session } from "next-auth";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { GiExitDoor } from "react-icons/gi";
import { NAV_ITEMS, USER_NAV_ITEMS } from "~/constants/navbar";

const NavBar = () => {
  const { data: session }: { data: Session | null } = useSession();

  const playQuack = () => {
    const audio = new Audio("quack.wav");
    audio.volume = 0.5;
    audio.play().catch((err) => console.error(err));
  };

  return (
    <nav className="group/nav fixed left-0 top-0 z-50 flex h-screen w-20 animate-fade-in-from-left bg-gray-800 py-8 shadow-[-10px_0_40px_15px_rgba(0,0,0,0.66)] transition-all hover:w-48">
      <div className="flex h-full w-full flex-col gap-10 px-5 group-hover/nav:items-start">
        <div className="flex h-[38px] w-[38px] cursor-default items-center justify-center gap-2 rounded-lg border border-white/50 p-3 text-xl group-hover/nav:w-full group-hover/nav:justify-start group-hover/nav:px-[6px]">
          <h1 className="selection:bg-transparent cursor-pointer" onClick={playQuack}>🦆</h1>
          <h1 className="hidden animate-fade-in-from-left bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-sm font-semibold text-transparent transition-all group-hover/nav:block">
            Duckpedia
          </h1>
        </div>
        {session && session.user && (
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex flex-col justify-center gap-10">
              {NAV_ITEMS.map((navItem) => (
                <a
                  key={navItem.id}
                  className={`${
                    navItem.disabled ? "pointer-events-none opacity-50 " : ""
                  } relative flex h-fit w-fit cursor-pointer select-none items-center rounded-lg p-1 text-white/80 transition-all hover:scale-125 hover:bg-white/20 hover:text-white group-hover/nav:w-full`}
                  href={navItem.href}
                  target={navItem.target}
                >
                  <navItem.icon className="text-3xl" />
                  <span className="ml-2 hidden animate-fade-in-from-left whitespace-nowrap text-sm font-semibold transition-all group-hover/nav:block">
                    {navItem.label}
                  </span>
                </a>
              ))}
            </div>
            <div className="group/user flex flex-col justify-center gap-5 group-hover/nav:justify-start">
              <div className="hidden animate-fade-in-from-bottom flex-col justify-center gap-10 group-hover/user:flex">
                <div
                  onClick={() => void signOut()}
                  className={`relative flex h-fit w-fit cursor-pointer items-center rounded-lg p-1 text-red-600 opacity-80 transition-all hover:scale-125 hover:bg-white/20 hover:opacity-100 group-hover/nav:w-full`}
                >
                  <GiExitDoor className="text-3xl" />
                  <span className="ml-2 hidden whitespace-nowrap text-sm font-semibold transition-all group-hover/nav:block">
                    Logout
                  </span>
                </div>
                {USER_NAV_ITEMS.map((userNavItem) => (
                  <a
                    key={userNavItem.id}
                    className={`${
                      userNavItem.disabled
                        ? "pointer-events-none opacity-50"
                        : "opacity-80"
                    } relative flex h-fit w-fit cursor-pointer select-none items-center rounded-lg p-1 text-white transition-all hover:scale-125 hover:bg-white/20 hover:opacity-100 group-hover/nav:w-full`}
                    href={userNavItem.href}
                  >
                    <userNavItem.icon className="text-3xl" />
                    <span className="ml-2 hidden whitespace-nowrap text-sm font-semibold transition-all group-hover/nav:block">
                      {userNavItem.label}
                    </span>
                  </a>
                ))}
              </div>
              <div className="flex cursor-default items-center rounded-lg p-1 text-white/80 transition-all hover:bg-white/20 hover:text-white">
                <Image
                  src={session.user.image as string}
                  alt={session.user.name as string}
                  width={30}
                  height={30}
                  className="cursor-pointer rounded-full"
                />
                <span className="ml-2 hidden animate-fade-in-from-left text-sm font-semibold text-white transition-all group-hover/nav:block">
                  {session.user.name}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
