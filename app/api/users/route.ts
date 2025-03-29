import { type NextRequest } from "next/server";
import userList from "@/lib/users";
import { type User } from "@/lib/types";

const users: User[] = userList;
// const keys: (keyof User)[] = ["first_name", "last_name", "email"];
const keys: ("first_name" | "last_name" | "email")[] = [
    "first_name",
    "last_name",
    "email",
];

const search = (q: string) => {
    return users.filter((user) =>
        keys.some((key) => user[key].toLowerCase().includes(q.toLowerCase()))
    );
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q");
    const page = searchParams.get("page");
    const pageSize = searchParams.get("size");

    const pageNumber = page ? parseInt(page as string) : 0;
    let pageSizeNumber = pageSize ? parseInt(pageSize as string) : 10;
    if (pageSizeNumber > 100) {
        pageSizeNumber = 100;
    }
    if (pageSizeNumber < 10) {
        pageSizeNumber = 10;
    }
    const start = pageNumber * pageSizeNumber;
    const end = start + pageSizeNumber;

    let paginatedUsers = users.slice(start, end);
    let totalUsers = users.length;
    if (q) {
        paginatedUsers = search(q).slice(start, end);
        totalUsers = search(q).length;
    }

    const totalPages = Math.ceil(totalUsers / pageSizeNumber);
    const hasNextPage = pageNumber < totalPages - 1;
    const hasPreviousPage = pageNumber > 0;
    const nextCursor = hasNextPage ? pageNumber + 1 : null;
    const previousCursor = hasPreviousPage ? pageNumber - 1 : null;
    const paginatedResponse = {
        users: paginatedUsers,
        pagination: {
            current_page: pageNumber,
            page_size: pageSizeNumber,
            num_items: totalUsers,
            num_pages: totalPages,
            has_next_page: hasNextPage,
            has_previous_page: hasPreviousPage,
            next_page: nextCursor,
            previous_page: previousCursor,
        },
    };
    return Response.json(paginatedResponse);
}
