export interface IItem {
    item: string;
    price: string; // Format price as a string with currency prefix, e.g., "Rp. 20,000"
}

export interface ICustomer {
    name: string;
    items: IItem[];
}

export interface IForSome {
    items: IItem[];
    customers: number[];
}

export interface IAlreadyPaid {
    indexUser: number
    total: string
}
