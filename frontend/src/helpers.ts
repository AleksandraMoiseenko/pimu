import { routerPaths } from './const';
import {
    DELETE_COURSE,
    DELETE_MODULE,
    DELETE_SUBJECT,
    DELETE_TOPIC,
    DELETE_TUTOR,
    GET_COURSES,
    GET_MODULES,
    GET_TOPICS,
    SUBJECTS,
    TUTORS,
} from './urls';

export const CrudManager = {
    create: <T extends any[], D extends unknown>(list: T, newItem: D) => {
        return list.concat([newItem]);
    },
    read: <T extends any[]>(list: T) => list,
    update: <T extends any[], D extends unknown>(list: T, itemId: number, newItem: D) => {
        return list.map((item) => {
            return item.id === itemId ? newItem : item;
        });
    },
    delete: <T extends any[]>(list: T, itemId: number) => {
        return list.filter((item) => {
            return item.id !== itemId;
        });
    },
};

export const FetchUriManager = {
    [routerPaths.disciplines]: SUBJECTS,
    [routerPaths.courses]: GET_COURSES,
    [routerPaths.modules]: GET_MODULES,
    [routerPaths.topics]: GET_TOPICS,
    [routerPaths.teachers]: TUTORS,
};

export const DeleteUriManager = {
    [routerPaths.disciplines]: DELETE_SUBJECT,
    [routerPaths.courses]: DELETE_COURSE,
    [routerPaths.modules]: DELETE_MODULE,
    [routerPaths.topics]: DELETE_TOPIC,
    [routerPaths.teachers]: DELETE_TUTOR,
};

export class UrlBuilder {
    _url;
    constructor() {
        this._url = '';
    }
    build(url: string, param = '') {
        this._url = this._url + url.replace(/\{(.+?)\}/g, param);
        return this;
    }

    get url() {
        return this._url;
    }
}
