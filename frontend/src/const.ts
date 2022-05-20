export const routerPaths = {
    root: '/',
    teachers: '/teachers',
    disciplines: '/disciplines',
    courses: '/courses',
    modules: '/modules',
    topics: '/topics',
    new: '/new'
}

export const topicsList = ['Липидный дисбаланс', 'Электролитный дисбаланс', 'АЛТ и АСТ', 'Влияние йода на состояние щитовидной железы'];

export const modulesList = ['Терминология восточной медицины',
    'Анатомическая лаборатория'];

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
    "Актуальные вопросы в хирургии",
    "Акушерство",
    "Аналитические методы исследования",
    "Анатомия",
    "Анестезиология, реанимация, интенсивная терапия",
    "Безопасность жизнедеятельности",
    "Биология",
    "Биоорганическая химия",
    "Биохимия",
    "Биоэтика",
    "Гигиена"
];

export const teachersList = [
    'Иванов Иван Иванович',
    'Сидоров Дмитрий Викторович',
    'Петров Петр Петрович',
    'Перелетов Дмитрий Сергеевич',
    'Остольский Юрий Викторович',
    'Малыженкова Юлия Дмитриевна'
];

export const ROUTES_DATA_MAP = {
    [routerPaths.disciplines]: disciplineList,
    [routerPaths.courses]: coursesList,
    [routerPaths.modules]: modulesList,
    [routerPaths.topics]: topicsList,
    [routerPaths.teachers]: teachersList
}

export const ROUTES_NESTED_RENDER_PATH_MAP = {
    [routerPaths.disciplines]: routerPaths.courses,
    [routerPaths.courses]: routerPaths.modules,
    [routerPaths.modules]: routerPaths.topics,
    [routerPaths.teachers]: undefined
}

export const TAB_LABEL_PATH_MAP = {
    [routerPaths.disciplines]: {
        label: 'Дисциплины',
        value: routerPaths.disciplines,
        to: routerPaths.disciplines
    },
    [routerPaths.courses]: {
        label: 'Курсы',
        value: routerPaths.courses,
        to: routerPaths.courses
    },
    [routerPaths.modules]: {
        label: 'Модули',
        value: routerPaths.modules,
        to: routerPaths.modules
    },
    [routerPaths.topics]: {
        label: 'Темы',
        value: routerPaths.topics,
        to: routerPaths.topics
    },
}

export const CREATE_FIELDS_MAP = {
    [routerPaths.disciplines]: [
        {
            name: 'title',
            label: 'Название'
        },
        {
            name: 'goal',
            label: 'Цель освоения'
        },
        {
            name: 'description',
            label: 'Описание',
            isTextArea: true
        },
        {
            name: 'result',
            label: 'Результаты'
        },
        {
            name: 'author',
            label: 'Авторы'
        },
    ],
    [routerPaths.courses]: [
        {
            name: 'id',
            label: 'Идентификатор (код курса)'
        },
        {
            name: 'title',
            label: 'Название'
        },
        {
            name: 'description',
            label: 'Краткое описание',
            isTextArea: true
        },
        {
            name: 'release',
            label: 'Сроки реализации'
        },
        {
            name: 'elements',
            label: 'Элементы контроля (и критерии успешного освоения)'
        },
        {
            name: 'author',
            label: 'Авторы (преподаватели)'
        },
    ],
    [routerPaths.modules]: [
        {
            name: 'id',
            label: 'Идентификатор (код модуля)'
        },
        {
            name: 'title',
            label: 'Название'
        },
        {
            name: 'release',
            label: 'Сроки реализации'
        },
        {
            name: 'author',
            label: 'Авторы (преподаватели)'
        },
    ],
    [routerPaths.topics]: [
        {
            name: 'title',
            label: 'Название'
        },
        {
            name: 'description',
            label: 'Содержание (описание)',
            isTextArea: true
        },
        {
            name: 'files',
            label: 'Файлы',
            hasAttach: true
        }
    ],
    [routerPaths.teachers]: [
        {
            name: 'firstName',
            label: 'Имя (имя + отчество)'
        },
        {
            name: 'lastName',
            label: 'Фамилия'
        },
        {
            name: 'faculty',
            label: 'Факультет',
        },
        {
            name: 'login',
            label: 'Логин',
        },
        {
            name: 'password',
            label: 'Пароль',
            type: 'password'
        },
        {
            name: 'email',
            label: 'Адрес электронной почты',
        },
    ]
}
