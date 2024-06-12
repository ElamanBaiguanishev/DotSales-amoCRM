export interface Result {
    id: number,
    status_id: Status
    responsible_user: User,
    name: string,
    price: number,
    created_at: Date
    contacts: Contact[]
}

export interface Contact {
    id: number
    name: string,
    first_name: string,
    last_name: string,
    custom_fields_values: any
}


export interface Lead {
    id: number;

    // Имя сделки
    name: string;

    // Бюджет
    price: number;

    // Ответственный id
    responsible_user_id: number;
    group_id: number;
    status_id: number;
    pipeline_id: number;
    loss_reason_id: number | null;

    // ID пользователя, создающий сделку
    created_by: number;

    // ID пользователя, изменяющий сделку
    updated_by: number;

    //Дата создания сделки, передается в Unix Timestamp
    created_at: number;
    updated_at: number;
    _embedded: {
        contacts: {
            id: number
        }[]
    };
}

export interface User {
    id: number,
    name: string,
    email: string,
}

export interface Status {
    id: number
    name: string
}