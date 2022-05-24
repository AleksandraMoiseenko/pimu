export const PAGE_PARAM = '?page={page}';
export const SIZE_PARAM = '&size={size}';

export const SUBJECTS = '/subjects';
export const DELETE_SUBJECT = '/subjects/{id}';

export const COURSES = '/courses';
export const GET_COURSES = '/courses/subject/{id}';
export const DELETE_COURSE = '/courses/{id}';
export const DOWNLOAD_COURSE = '/courses/backup/{id}';

export const MODULES = '/modules';
export const GET_MODULES = '/modules/course/{id}';
export const DELETE_MODULE = '/modules/{id}';

export const TOPICS = '/topics';
export const GET_TOPICS = '/topics/module/{id}';
export const DELETE_TOPIC = '/topics/{id}';
export const ATTACH_TOPIC = '/topics/{id}/upload';

export const TUTORS = '/tutors';
export const EXPORT_TUTORS = '/tutors/export';
export const EXPORT_COURSE_TUTORS = '/tutors/export/course/{id}';
export const DELETE_TUTOR = '/tutors/{id}';
export const SEARCH_TUTOR = '/tutors/{regexp}';

export const DOWNLOAD_FILE = '/files/download/{id}';
export const DELETE_FILE = '/files/{id}';
