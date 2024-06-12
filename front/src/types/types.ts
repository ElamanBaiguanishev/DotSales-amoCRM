export interface Result {
    id: number;
    status_id: Status;
    responsible_user: User;
    name: string;
    price: number;
    created_at: Date;
    contacts: Contact[];
}

export interface Contact {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    custom_fields_values: any;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Status {
    id: number;
    name: string;
}
