import { FavoritColor } from "./selection-types"

export type User ={
    firstName:string,
    lastName:string,
    sex: string,
    age:number,
    favoritColor:FavoritColor,
    id: string,
}
export type UserState = {
    firstName:string | null,
    lastName:string | null,
    sex: string | null,
    age:number | null,
    favoritColor:FavoritColor | null,
    id: string | null,
}