export const routerPaths = {
    root: '/',
    teachers: '/teachers',
    disciplines: '/disciplines',
    courses: '/courses',
    modules: '/modules'
}
export const modulesList = [''];

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
    [routerPaths.teachers]: teachersList
}

export const ROUTES_NESTED_RENDER_PATH_MAP = {
    [routerPaths.disciplines]: routerPaths.courses,
    [routerPaths.courses]: routerPaths.modules,
    [routerPaths.modules]: '/',
    [routerPaths.teachers]: '/'
}
