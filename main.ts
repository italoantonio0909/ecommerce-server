import 'reflect-metadata'

import { container } from './src/apps/sales/order/subscribers/container';

container

// function paginateCollection<T, K extends keyof T>(collection: T[], key: K, val: T[K]){
//     return collection.find((e)=> e[key] ===val)
// }


// interface User {
//     id: number;
//     name : string
// }

// const users: Array<User> = [
//     {
//         id: 1,
//         name: "name"
//     },
//     {
//         id: 2,
//         name : "name2"
//     }
// ]

// paginateCollection<User, 'name'>(users, "name", "name")