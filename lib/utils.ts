import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { QueryFunctionContext } from "@tanstack/react-query";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getInitials(
    firstOrFullName: string,
    lastName?: string
): string {
    if (lastName) {
        // Handle case when first and last names are passed separately
        return (firstOrFullName[0] + lastName[0]).toUpperCase();
    } else {
        // Handle case when full name is passed as single string
        const names = firstOrFullName.split(" ");
        if (names.length >= 2) {
            return (names[0][0] + names[1][0]).toUpperCase();
        }
        return names[0].slice(0, 2).toUpperCase();
    }
}

export const getUsers = async ({
    pageParam,
    queryKey,
}: QueryFunctionContext<
    [string, { q: string | string[]; sort: string | string[] }]
>) => {
    // const [_key, { q, sort }] = queryKey;
    const [, { q, sort }] = queryKey;

    const qString = Array.isArray(q) ? q[0] : q;
    const sortString = Array.isArray(sort) ? sort[0] : sort;

    let url = `/api/users?page=${pageParam}`;
    if (qString) url += `&q=${qString}`;
    if (sortString) url += `&sort=${sortString}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
};
