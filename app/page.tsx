import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query-client";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "@/components/app-header";
import UserList from "@/components/users-list";
import { getUsers } from "@/lib/utils";
import { UsersApiResponse } from "@/lib/types";
import SearchBar from "@/components/search-bar";

const headerLinks = [{ title: "Dashboard", url: "/" }];

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    // Cast the resolved searchParams to ensure q and sort are strings
    const params = (await searchParams) as {
        [key: string]: string | undefined;
    };
    const { sort = "", q = "" } = params;

    const queryClient = getQueryClient();
    // Assert the queryKey as a tuple of [string, { q: string; sort: string }]
    await queryClient.prefetchInfiniteQuery({
        queryKey: ["users", { q, sort }] as [
            string,
            { q: string; sort: string }
        ],
        queryFn: getUsers,
        initialPageParam: 0,
        getNextPageParam: (lastPage: UsersApiResponse) =>
            lastPage.pagination.next_page,
    });

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppHeader links={headerLinks} />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="py-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            NextJS Remote Search Filter Demo
                        </h1>
                    </div>
                    <div className="py-2">
                        <SearchBar />
                    </div>
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <UserList q={q} sort={sort} />
                    </HydrationBoundary>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
