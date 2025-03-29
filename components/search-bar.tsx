"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [search, setSearch] = useState(searchParams.get("q") || "");
    const [dSearch] = useDebounce(search, 500);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleReset = () => {
        setSearch("");
        router.push(pathname);
    };

    useEffect(() => {
        if (dSearch) {
            router.push(`${pathname}?q=${dSearch}`);
        } else {
            router.push(pathname);
        }
    }, [dSearch, pathname, router]);

    return (
        <div className="flex items-center gap-2">
            <Input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full"
            />
            <Button type="button" onClick={handleReset} variant="outline">
                Reset
            </Button>
        </div>
    );
}
