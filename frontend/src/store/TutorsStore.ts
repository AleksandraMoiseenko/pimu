import {makeAutoObservable} from "mobx";

export class TutorsStore {
    constructor() {
        makeAutoObservable(this)
    }
}