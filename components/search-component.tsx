'use client'
import { searchListAction } from '@/actions/search-list-action'
import { Input, Kbd } from '@heroui/react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function SearchComponent() {
    const [keyword, setKeyword] = useState('')
    const searchParams = useSearchParams()

    useEffect(() => {
        setKeyword(searchParams.get('keyword') || '')
    }, [searchParams])

    return (
        <form action={searchListAction} className="w-80 flex items-center gap-2">
            <Input onChange={(e) => setKeyword(e.target.value)} value={keyword} name="keyword" size="md" placeholder="Type to search..." type="text" endContent={<Kbd className='h-7' keys={["enter"]}>Enter</Kbd>} />
        </form>
    )
}
