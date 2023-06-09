import { type Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { GiHamburgerMenu, GiExitDoor } from "react-icons/gi";
import { NAV_ITEMS, USER_NAV_ITEMS } from "~/constants/navbar";
import useOutsideClick from "~/hooks/useOutsideClick";

const MobileNavBar: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  const [logoExpand, setLogoExpand] = useState<boolean>(false);

  const handleOpenNavMenu = () => {
    onOpen();

    const mainContainerElement = document.getElementById(
      "nav-and-layout-container"
    );

    const mobileNavElement = document.getElementById("mobile-nav");

    const MainLayoutElement = document.getElementById("main-layout");

    if (mainContainerElement) {
      mainContainerElement.style.transform = "scale(0.85)";
      mainContainerElement.style.borderRadius = "0.75rem"; // xl
    }
    if (mobileNavElement) {
      mobileNavElement.style.borderTopLeftRadius = "0.75rem"; // xl
      mobileNavElement.style.borderTopRightRadius = "0.75rem"; // xl
    }
    if (MainLayoutElement) MainLayoutElement.style.borderRadius = "0.75rem"; // xl
  };

  const playQuack = () => {
    const audio = new Audio("quack.wav");
    audio.volume = 0.5;
    audio.play().catch((err) => console.error(err));
  };

  return (
    <nav
      id="mobile-nav"
      className="fixed left-0 top-0 z-50 flex h-16 w-screen animate-fade-in-from-top items-center justify-between bg-gray-800 px-8 shadow-[0px_0_10px_1px_rgba(0,0,0,0.66)] transition-all"
    >
      <div
        className={`flex h-[38px] ${
          logoExpand ? "w-fit" : "w-[38px]"
        } cursor-default items-center justify-center gap-2 rounded-lg border border-white/50 p-3 text-xl`}
        onClick={() => setLogoExpand(!logoExpand)}
      >
        <h1 className="selection:bg-transparent cursor-pointer" onClick={playQuack}>🦆</h1>
        <h1
          className={`${
            logoExpand ? "block" : "hidden"
          } animate-fade-in-from-left bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-sm font-semibold text-transparent transition-all`}
        >
          Duckpedia
        </h1>
      </div>
      <GiHamburgerMenu
        className="text-2xl text-white/80"
        onClick={handleOpenNavMenu}
      />
      <div className="fixed"></div>
    </nav>
  );
};

export const MobileNavMenu: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { data: session }: { data: Session | null } = useSession();

  const handleClose = () => {
    const mainContainerElement = document.getElementById(
      "nav-and-layout-container"
    );

    const mobileNavElement = document.getElementById("mobile-nav");

    const MainLayoutElement = document.getElementById("main-layout");

    if (mainContainerElement) {
      mainContainerElement.style.transform = "scale(1)";
      mainContainerElement.style.borderRadius = "unset";
    }
    if (mobileNavElement) {
      mobileNavElement.style.borderTopLeftRadius = "unset";
      mobileNavElement.style.borderTopRightRadius = "unset";
    }
    if (MainLayoutElement) MainLayoutElement.style.borderRadius = "unset";

    onClose();
  };

  useOutsideClick(ref, handleClose);

  return (
    <div className="absolute z-50 h-full w-screen bg-gray-800/50 backdrop-blur-sm backdrop-filter">
      <div
        ref={ref}
        className="absolute right-0 top-0 h-full w-48 animate-opacity bg-gray-800"
      >
        {session && session.user && (
          <div className="relative flex h-full flex-col justify-between px-5 py-8">
            <div className="flex flex-col justify-center gap-10">
              {NAV_ITEMS.map((navItem) => (
                <a
                  key={navItem.id}
                  className={`${
                    navItem.disabled ? "pointer-events-none opacity-50 " : ""
                  } relative flex h-fit w-full cursor-pointer select-none items-center rounded-lg p-1 text-white/80 transition-all hover:scale-125 hover:bg-white/20 hover:text-white`}
                  href={navItem.href}
                  target={navItem.target}
                >
                  <navItem.icon className="text-3xl" />
                  <span className="ml-2 animate-fade-in-from-left whitespace-nowrap text-sm font-semibold transition-all">
                    {navItem.label}
                  </span>
                </a>
              ))}
            </div>
            <div className="group/user flex flex-col justify-center gap-5">
              <div className="hidden animate-fade-in-from-bottom flex-col justify-center gap-10 group-hover/user:flex">
                <div
                  onClick={() => void signOut()}
                  className={`relative flex h-fit w-full cursor-pointer items-center rounded-lg p-1 text-red-600 opacity-80 transition-all hover:scale-125 hover:bg-white/20 hover:opacity-100`}
                >
                  <GiExitDoor className="text-3xl" />
                  <span className="ml-2 whitespace-nowrap text-sm font-semibold transition-all">
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
                    } relative flex h-fit w-full cursor-pointer select-none items-center rounded-lg p-1 text-white/80 transition-all hover:scale-125 hover:bg-white/20 hover:opacity-100`}
                    href={userNavItem.href}
                  >
                    <userNavItem.icon className="text-3xl" />
                    <span className="ml-2 whitespace-nowrap text-sm font-semibold transition-all">
                      {userNavItem.label}
                    </span>
                  </a>
                ))}
              </div>
              <div className="flex cursor-default items-center rounded-lg p-1 transition-all hover:bg-white/20 hover:text-white">
                <Image
                  src={session.user.image as string}
                  alt={session.user.name as string}
                  width={30}
                  height={30}
                  className="cursor-pointer rounded-full"
                />
                <span className="ml-2 animate-fade-in-from-left text-sm font-semibold text-white/80 transition-all">
                  {session.user.name}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavBar;
