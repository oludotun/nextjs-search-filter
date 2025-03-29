export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    phone: string;
};

export type UsersApiResponse = {
    users: User[];
    pagination: {
        current_page: number;
        page_size: number;
        num_items: number;
        num_pages: number;
        has_next_page: boolean;
        has_previous_page: boolean;
        next_page: number | null;
        previous_page: number | null;
    };
};
