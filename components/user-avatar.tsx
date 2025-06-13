"use client"
import React from 'react'
import { useSession } from "next-auth/react"
import { NavbarItem, Popover, PopoverTrigger, PopoverContent, Avatar, Button, Spinner } from "@heroui/react"
import { loginGithub, logoutGithub } from "@/actions"

export default function UserAvatar() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <Spinner size='sm' color="secondary" label="Loading..." labelColor="secondary" />
    }

  return (
    <>
      {session?.user ? (
                    <NavbarItem>
                        <Popover placement="bottom" showArrow={true}>
                            <PopoverTrigger>
                                <Avatar className='border-2 dark:border-purple-300' src={session.user.image || ''} />
                            </PopoverTrigger>
                            <PopoverContent>
                                <p className='mb-2'>{session.user.name}</p>
                                <form
                                    action={logoutGithub}
                                >
                                    <Button type="submit" color="danger" variant="flat" className='w-full'>Logout</Button>
                                </form>
                            </PopoverContent>
                        </Popover>
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <form
                                action={loginGithub}  
                            >
                                <Button type="submit" variant="bordered" color="secondary">Login with GitHub</Button>
                            </form>
                        </NavbarItem>
                        <NavbarItem>
                            <Button color="secondary" variant="solid">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                )}
    </>
  )
}
