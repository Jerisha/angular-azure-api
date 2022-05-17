export class User {
    id!: number;
    username!: string;
    errorMessage?: string;
    firstName!: string;
    lastName!: string;
    profileName!: string;
    password!: string;
    token?: string;
    menuConfig?: any[] = [];
}
