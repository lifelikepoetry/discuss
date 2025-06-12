import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Input } from "@heroui/react";
import UserAvatar from "./user-avatar";
import Link from "next/link";

export const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default async function NavigationBar() {

    return (
        <Navbar className="border-b border-gray-200">
            <NavbarBrand>
                <Link href="/" className="flex gap-2 items-center">
                    <AcmeLogo />
                    <p className="font-bold text-inherit">Discussion Board</p>
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Input className="w-80" size="md" placeholder="Search" type="text" />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <UserAvatar />
            </NavbarContent>
        </Navbar>
    );
}
