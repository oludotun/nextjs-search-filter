import userList from "@/lib/users";

export const dynamic = "force-static";

type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    phone: string;
};

const users: User[] = userList;

export async function GET() {
    return Response.json({ users });
}
