import { FavoritColor, File, Gender } from "./selection-types"

export type User ={
    firstName:string,
    lastName:string,
    gender: Gender,
    age:number,
    favoritColor:FavoritColor,
    id: string,
    files: File[]
}
export type UserState = {
    firstName:string | '',
    lastName:string | '',
    gender: Gender | '',
    age:number | '',
    favoritColor:FavoritColor | '',
    id: string | '',
    files: File[]
}