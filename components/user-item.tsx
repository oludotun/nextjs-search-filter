import { User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/lib/utils";

export default function UserItem({ user }: { user: User }) {
    return (
        <li key={user.id} className="flex justify-between gap-x-6 my-4 pb-4">
            <div className="flex min-w-0 gap-x-4">
                <Avatar className="hidden sm:flex h-12 w-12 rounded-full">
                    <AvatarImage
                        // No Avatar image available, using fallback
                        src="/images/no-image-found.png"
                        alt={`${user.first_name} ${user.last_name}`}
                    />
                    <AvatarFallback className="rounded-full">
                        {getInitials(user.first_name, user.last_name)}
                    </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold">
                        {`${user.first_name} ${user.last_name}`}
                    </p>
                    <p className="mt-1 text-xs/5 text-muted-foreground">
                        {user.email}
                    </p>
                </div>
            </div>
            <div className="shrink-0 sm:flex flex-col items-end">
                <p className="text-sm/6">{user.gender}</p>
                <p className="mt-1 text-xs/5 text-muted-foreground">
                    Phone: {user.phone}
                </p>
            </div>
        </li>
    );
}
