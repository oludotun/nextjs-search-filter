"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { UsersApiResponse, type User } from "@/lib/types";
import { getUsers } from "@/lib/utils";
import React, { useEffect } from "react";
import UserItem from "./user-item";
import { useInView } from "react-intersection-observer";

export default function UserList({
    q,
    sort,
}: {
    q?: string | string[];
    sort?: string | string[];
}) {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["users", { q, sort }] as [
            string,
            { q: string; sort: string }
        ],
        queryFn: getUsers,
        initialPageParam: 0,
        getNextPageParam: (lastPage: UsersApiResponse) =>
            lastPage.pagination.next_page,
    });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage]);

    const noUsersFound =
        data?.pages[0].users.length === 0 &&
        data?.pages.length === 1 &&
        !isFetching &&
        !isFetchingNextPage;

    return (
        <div>
            {error && (
                <div className="text-red-500">Error: {error.message}</div>
            )}
            <ul role="list" className="divide-y divide-border">
                {data?.pages.map((page) => {
                    return (
                        <React.Fragment key={page.pagination.current_page}>
                            {page.users.map((user: User) => (
                                <UserItem key={user.id} user={user} />
                            ))}
                        </React.Fragment>
                    );
                })}
            </ul>
            <div ref={ref} className="flex justify-center my-4">
                {isFetchingNextPage || isFetching
                    ? "Loading Users..."
                    : hasNextPage
                    ? "Load More Users"
                    : noUsersFound
                    ? "No Users Found"
                    : "No More Users"}
            </div>
        </div>
    );
}
