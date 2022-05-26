import { GET_COURSES, GET_MODULES, SUBJECTS, GET_TOPICS, TUTORS } from './urls';

export const routerPaths = {
    root: '/',
    teachers: '/teachers',
    disciplines: '/disciplines',
    courses: '/courses',
    modules: '/modules',
    topics: '/topics',
    new: '/new',
};

export const topicsList = [
    'Липидный дисбаланс',
    'Электролитный дисбаланс',
    'АЛТ и АСТ',
    'Влияние йода на состояние щитовидной железы',
];

export const modulesList = ['Терминология восточной медицины', 'Анатомическая лаборатория'];

export const coursesList = [
    'Нидерландский курс глобального здравоохранения и тропической медицины',
    'Королевская диабетическая стопа: принципы и практика',
    'Влияние аллергии на пенициллин',
    'Иммунология',
    'Терминология восточной медицины',
    'Анатомическая лаборатория',
    'COVID-19: курс диагностики и тестирования',
    'Курс по вопросам дыхательных путей',
];

export const disciplineList = [
    'Актуальные вопросы в хирургии',
    'Акушерство',
    'Аналитические методы исследования',
    'Анатомия',
    'Анестезиология, реанимация, интенсивная терапия',
    'Безопасность жизнедеятельности',
    'Биология',
    'Биоорганическая химия',
    'Биохимия',
    'Биоэтика',
    'Гигиена',
];

export const teachersList = [
    'Иванов Иван Иванович',
    'Сидоров Дмитрий Викторович',
    'Петров Петр Петрович',
    'Перелетов Дмитрий Сергеевич',
    'Остольский Юрий Викторович',
    'Малыженкова Юлия Дмитриевна',
];

export const ROUTES_DATA_MAP = {
    [routerPaths.disciplines]: disciplineList,
    [routerPaths.courses]: coursesList,
    [routerPaths.modules]: modulesList,
    [routerPaths.topics]: topicsList,
    [routerPaths.teachers]: teachersList,
};

export const ROUTES_DATA_FETCH = {
    [routerPaths.disciplines]: SUBJECTS,
    [routerPaths.courses]: GET_COURSES,
    [routerPaths.modules]: GET_MODULES,
    [routerPaths.topics]: GET_TOPICS,
    [routerPaths.teachers]: TUTORS,
};

export const ROUTES_NESTED_RENDER_PATH_MAP = {
    [routerPaths.disciplines]: routerPaths.courses,
    [routerPaths.courses]: routerPaths.modules,
    [routerPaths.modules]: routerPaths.topics,
    [routerPaths.teachers]: undefined,
};

export const TAB_LABEL_PATH_MAP = {
    [routerPaths.disciplines]: {
        label: 'Дисциплины',
        value: routerPaths.disciplines,
        to: routerPaths.disciplines,
    },
    [routerPaths.courses]: {
        label: 'Курсы',
        value: routerPaths.courses,
        to: routerPaths.courses,
    },
    [routerPaths.modules]: {
        label: 'Модули',
        value: routerPaths.modules,
        to: routerPaths.modules,
    },
    [routerPaths.topics]: {
        label: 'Темы',
        value: routerPaths.topics,
        to: routerPaths.topics,
    },
};

export const CREATE_FIELDS_MAP = {
    [routerPaths.disciplines]: [
        {
            name: 'id',
        },
        {
            name: 'name',
            label: 'Название',
        },
        {
            name: 'purpose',
            label: 'Цель освоения',
            isTextArea: true,
        },
        {
            name: 'description',
            label: 'Описание',
            isTextArea: true,
        },
        {
            name: 'result',
            label: 'Результаты',
            isTextArea: true,
        },
        {
            name: 'authors',
            label: 'Авторы',
        },
    ],
    [routerPaths.courses]: [
        {
            name: 'id',
        },
        {
            name: 'code',
            label: 'Идентификатор (код курса)',
        },
        {
            name: 'name',
            label: 'Название',
        },
        {
            name: 'description',
            label: 'Краткое описание',
            isTextArea: true,
        },
        {
            name: 'startDate',
            label: 'Дата начала',
        },
        {
            name: 'endDate',
            label: 'Дата конца',
        },
        {
            name: 'passCriteriaDescription',
            label: 'Элементы контроля (и критерии успешного освоения)',
        },
        {
            name: 'tutors',
            label: 'Авторы (преподаватели)',
            isSelect: true,
        },
    ],
    [routerPaths.modules]: [
        {
            name: 'code',
            label: 'Идентификатор (код модуля)',
        },
        {
            name: 'name',
            label: 'Название',
        },
        {
            name: 'startDate',
            label: 'Дата начала',
        },
        {
            name: 'endDate',
            label: 'Дата конца',
        },
        {
            name: 'tutors',
            label: 'Авторы (преподаватели)',
            isSelect: true,
        },
    ],
    [routerPaths.topics]: [
        {
            name: 'id',
        },
        {
            name: 'name',
            label: 'Название',
        },
        {
            name: 'description',
            label: 'Содержание (описание)',
            isTextArea: true,
        },
        {
            name: 'files',
            label: 'Файлы',
            hasAttach: true,
        },
    ],
    [routerPaths.teachers]: [
        {
            name: 'id',
        },
        {
            name: 'firstname',
            label: 'Имя (имя + отчество)',
        },
        {
            name: 'lastname',
            label: 'Фамилия',
        },
        {
            name: 'department',
            label: 'Факультет',
        },
        {
            name: 'username',
            label: 'Логин',
        },
        {
            name: 'password',
            label: 'Пароль',
            type: 'password',
        },
        {
            name: 'email',
            label: 'Адрес электронной почты',
        },
    ],
};
