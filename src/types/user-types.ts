import { FavoritColor, Gender } from "./selection-types"

export type User ={
    firstName:string,
    lastName:string,
    gender: Gender,
    age:number,
    favoritColor:FavoritColor,
    id: string,
}
export type UserState = {
    firstName:string | '',
    lastName:string | '',
    gender: Gender | '',
    age:number | '',
    favoritColor:FavoritColor | '',
    id: string | '',
}