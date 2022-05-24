import {makeAutoObservable} from "mobx";

export class ModulesStore {
    constructor() {
        makeAutoObservable(this)
    }
}