import {makeAutoObservable} from "mobx";

export class CoursesStore {
    constructor() {
        makeAutoObservable(this)
    }
}