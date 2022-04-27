export interface User {
    id: number,
    email: string,
    password: string
    name: string,
    surnames: string,
    description: string,
    birthday: string,
    tlf: string,
    telegram: string,
    img: string,
    rating: number
}

export interface Book {
    id: number,
    title: string,
    author: string,
    description: string,
    state: string,
    price: string,
    img: string,
    idBuyer: User,
    idUser: User
}

export interface Exchange {
    id: number,
    idPetitioner: User,
    idBookP: Book,
    idTitular: User,
    idBookT: Book,
    date: string
}

export interface TokenJWT {
    jwt: any
}