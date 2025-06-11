'use server'

import { signOut } from "@/auth"

export async function logoutGithub() {
    await signOut()
}