import {makeAutoObservable} from "mobx";

export class SubjectsStore {
    constructor() {
        makeAutoObservable(this)
    }
}