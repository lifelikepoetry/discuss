'use server'
import { redirect } from "next/navigation";

export async function searchListAction(formData: FormData) {
    const keyword = formData.get('keyword') as string
    if (!keyword) {
        redirect('/')
    }
    redirect(`/search?keyword=${encodeURIComponent(keyword)}`)
}