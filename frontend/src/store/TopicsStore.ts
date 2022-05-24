import {makeAutoObservable} from "mobx";

export class TopicsStore {
    constructor() {
        makeAutoObservable(this)
    }
}