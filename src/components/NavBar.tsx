import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import MainLayout from "~/layouts/MainLayout";

const USER_NAV_ITEMS = [
  /* {
    id: "user_nav_profile",
    label: "Profile",
    href: "/profile",
  }, */
  {
    id: "user_nav_logout",
    label: "Logout",
    href: "/api/auth/signout",
  },
];

const NAV_ITEMS = [
  {
    id: "nav_claims",
    label: "Claims",
    href: "/claims",
  },
  {
    id: "nav_hall_of_shame",
    label: "Hall of Shame",
    href: "/hall-of-shame",
    disabled: true,
  },
  {
    id: "nav_tips_n_tricks",
    label: "Tips n' Tricks",
    href: "https://duckgame.fandom.com/wiki/Category:Tips_and_Tricks",
    target: "_blank",
  },
];

const NavBar = () => {
  const { data: session }: { data: Session | null } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <nav className="fixed left-0 top-0 z-50 h-20 w-full bg-white shadow animate-fade-in">
      <MainLayout>
        <div className="flex w-full items-center justify-between">
          <h1 className="cursor-default text-xl font-semibold uppercase">
            Duckpedia 🦆
          </h1>
          <div className="flex gap-2">
            {session && session.user && (
              <div className="relative flex justify-center gap-10">
                <div className="flex gap-10">
                  {NAV_ITEMS.map((navItem) => (
                    <a
                      key={navItem.id}
                      className={`${
                        navItem.disabled
                          ? "pointer-events-none opacity-50 "
                          : ""
                      } relative flex h-12 items-center justify-center font-bold uppercase text-slate-700`}
                      href={navItem.href}
                      target={navItem.target}
                    >
                      {navItem.label}
                    </a>
                  ))}
                </div>
                <div className="relative flex items-center justify-center">
                  <Image
                    src={session.user.image as string}
                    alt={session.user.name as string}
                    width={40}
                    height={40}
                    className="cursor-pointer rounded-full"
                    onClick={isOpen ? handleClose : handleOpen}
                  />
                  {isOpen && (
                    <div className="absolute top-full mt-1 w-40 animate-fade-in rounded-md bg-white shadow-lg">
                      {USER_NAV_ITEMS.map((userNavItem) => (
                        <a
                          key={userNavItem.id}
                          href={userNavItem.href}
                          className="flex h-12 w-full items-center justify-center"
                        >
                          {userNavItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </nav>
  );
};

export default NavBar;
