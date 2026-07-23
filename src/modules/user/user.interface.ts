export interface LoginPaylod {
    email: string
    password: string
}

export interface RegisterPayload {
    email: string,
    password: string
    username: string
}

export interface CreateUserPayload {
    email: string,
    password: string
    username: string
}

export interface AuthUser {
    id: string
    email: string
    username: string
}