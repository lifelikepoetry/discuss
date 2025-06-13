import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import UserAvatar from "./user-avatar";
import Link from "next/link";
import SearchComponent from "./search-component";
import ThemeSwitcher from "./theme-switcher";
import { Suspense } from "react";
import { Telescope } from "lucide-react";

export const AcmeLogo = () => {
    return (
        <Telescope />
    );
};

export default async function NavigationBar() {

    return (
        <Navbar className=" shadow-md dark:shadow-purple-300">
            <NavbarBrand>
                <Link href="/" className="flex gap-2 items-center">
                    <AcmeLogo />
                    <p className="font-bold text-inherit">Discussion Board</p>
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Suspense>
                        <SearchComponent />
                    </Suspense>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <UserAvatar />
                <ThemeSwitcher />
            </NavbarContent>
        </Navbar>
    );
}
