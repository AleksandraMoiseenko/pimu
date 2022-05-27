import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api, baseURL } from '../api/client';
import { CREATE_FIELDS_MAP, routerPaths, ROUTES_DATA_FETCH } from '../const';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { PostUriManager, PutUriManager, UrlBuilder } from '../helpers';
import { useGlobal } from '../providers/GlobalProvider';
import {
    ATTACH_TOPIC,
    DELETE_FILE,
    DOWNLOAD_FILE,
    EXPORT_COURSE_TUTORS,
    PAGE_PARAM,
    SIZE_PARAM,
    TUTORS,
} from '../urls';
import { SelectField } from './SelectField';
import './create-page.css';
// @ts-ignore
import { saveAs } from 'file-saver';

const renderCurrentFileList = (currentFileList: any[] = [], setCurrentFiles: any, item: any) => {
    useEffect(() => {
        if (item && 'files' in item) {
            setCurrentFiles(item.files);
        }
    }, []);

    return (
        <div>
            {currentFileList.map((file) => (
                <Box display="flex">
                    <Typography
                        sx={{
                            marginRight: 1,
                            cursor: 'pointer',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            const downloadUrl = new UrlBuilder().build(DOWNLOAD_FILE, file?.id).url;

                            api.post(downloadUrl, undefined, { responseType: 'blob' }).then(
                                (response: any) => {
                                    const url = window.URL.createObjectURL(new Blob([response]));
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.setAttribute('download', file.name);
                                    document.body.appendChild(link);
                                    link.click();
                                    link.remove();
                                },
                            );

                            // api.post(downloadUrl, { responseType: 'blob' })
                            //     .then((response: any) => response.blob())
                            //     .then((blob) => saveAs(blob, file.name));
                        }}
                    >
                        {file.name}
                    </Typography>
                    <IconButton
                        size="small"
                        sx={{ p: 0 }}
                        onClick={async (e) => {
                            e.stopPropagation();
                            const deleteUrl = new UrlBuilder().build(DELETE_FILE, file?.id).url;
                            await api.delete(deleteUrl);
                        }}
                    >
                        <ClearIcon />
                    </IconButton>
                </Box>
            ))}
        </div>
    );
};

const renderFilesList = (files: FileList) => {
    if (!files) return <Typography>Выберите файлы, которые хотите добавить</Typography>;

    let filesList: string[] = [];

    for (const file of files) {
        filesList.push(file.name);
    }

    return filesList.map((fileName) => <Typography key={fileName}>{fileName}</Typography>);
};

export const AttachFile = (props: any) => {
    return (
        <>
            <span>{props.field.label}</span>
            <Box sx={{ border: '2px solid lightgray', padding: 2 }}>
                <Box>
                    {renderCurrentFileList(props.currentFiles, props.setCurrentFiles, props.item)}
                </Box>
                <label className="custom-file-upload">
                    {renderFilesList(props.files)}
                    <input
                        multiple
                        type="file"
                        name="fileFld"
                        id="fileFld"
                        onChange={(e) => {
                            console.log(e.target.files);
                            props.setFiles(e.target.files);
                        }}
                    />
                </label>
            </Box>
        </>
    );
};

export const TextArea = (props: any) => {
    return (
        <>
            {props.field.label}
            <TextareaAutosize
                name={props.field.name}
                placeholder={props.field.label}
                defaultValue={props.value}
                onChange={props.handleChange}
                minRows={3}
            />
        </>
    );
};

export const CreatePage = () => {
    const { subjectData, coursesData, modulesData, setIsAfterChanges } = useGlobal();

    let location: any = useLocation();
    let navigate = useNavigate();

    const [formData, setFormData] = useState({});

    const [files, setFiles] = useState<any>(null);
    const [currentFiles, setCurrentFiles] = useState<any[]>([]);

    const [tutors, setTutors] = React.useState<any[]>([]);
    const [selectedTutorsIds, setSelectedTutorsIds] = React.useState<any[]>([]);

    const { item, from, isEditing } = location.state;
    const fields = CREATE_FIELDS_MAP[from];

    useEffect(() => {
        let form: any = {};

        for (const key of fields) {
            form[key.name] = (item && item[key.name]) || '';
        }

        setFormData(form);
        if ('tutors' in form && form.tutors.length > 0) {
            const tutorsIds = form.tutors.map((tutor: any) => tutor.id);
            setSelectedTutorsIds(tutorsIds);
        }
    }, []);

    useEffect(() => {
        setIsAfterChanges(false);

        api.get(TUTORS).then((tutorsData: any) => {
            setTutors(tutorsData.data);
        });
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const navigateAfterChanges = () => {
        setIsAfterChanges(true);
        navigate(from);
    };

    const sendAttachFiles = async (ItemId: any = undefined) => {
        if (!files) return;

        const url = new UrlBuilder().build(
            ATTACH_TOPIC,
            ItemId ? String(ItemId) : String(item.id),
        ).url;

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file, file.name);
            await api.post(url, formData);
        }
    };

    return (
        <Grid display={'grid'} gridTemplateColumns={'1fr'} padding={'36px 30vw'} gap={3}>
            {fields.map((field: any) => {
                if (!field.label) return;
                if (field.isSelect)
                    return (
                        <SelectField
                            tutors={tutors}
                            selectedTutorsIds={selectedTutorsIds}
                            setSelectedTutorsIds={setSelectedTutorsIds}
                            field={field}
                        />
                    );
                if (field.hasAttach)
                    return (
                        <AttachFile
                            files={files}
                            setFiles={setFiles}
                            currentFiles={currentFiles}
                            setCurrentFiles={setCurrentFiles}
                            field={field}
                            item={item}
                        />
                    );
                if (field.isTextArea)
                    return (
                        <TextArea
                            field={field}
                            value={(item && item[field.name]) || ''}
                            handleChange={handleChange}
                        />
                    );
                return (
                    <FormControl>
                        <TextField
                            onChange={handleChange}
                            name={field.name}
                            label={field.label}
                            defaultValue={(item && item[field.name]) || ''}
                            type={field.type}
                        />
                    </FormControl>
                );
            })}
            {from === routerPaths.courses && isEditing && (
                <div>
                    <span>
                        <IconButton
                            edge="end"
                            onClick={(e) => {
                                e.stopPropagation();

                                const url = new UrlBuilder().build(
                                    EXPORT_COURSE_TUTORS,
                                    item.id,
                                ).url;

                                saveAs(`${baseURL}${url}`, 'tutors.csv');
                            }}
                        >
                            <FileDownloadIcon />
                        </IconButton>
                    </span>
                    <span style={{ paddingLeft: 16 }}>Скачать список преподователей</span>
                </div>
            )}
            <FormControl sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={() => {
                        const selectedTutors = selectedTutorsIds.map((ids) => {
                            return tutors.find((tutor) => tutor.id === ids);
                        });

                        let nestedModulesData = {};

                        if (from === routerPaths.topics) {
                            nestedModulesData = {
                                ...nestedModulesData,
                                module: {
                                    ...modulesData,
                                    course: { ...coursesData, subject: subjectData },
                                },
                            };
                        }

                        if (from === routerPaths.modules) {
                            nestedModulesData = {
                                ...nestedModulesData,
                                course: {
                                    ...coursesData,
                                    subject: subjectData,
                                },
                            };
                        }

                        if (from === routerPaths.courses) {
                            nestedModulesData = {
                                ...nestedModulesData,
                                subject: subjectData,
                            };
                        }

                        const enhancedFormData = {
                            ...formData,
                            tutors: selectedTutors,
                            ...nestedModulesData,
                            files: [],
                        };

                        if (isEditing) {
                            return api.put(PutUriManager[from], enhancedFormData).then((data) => {
                                return sendAttachFiles().then((r) => navigateAfterChanges());
                            });
                        }

                        return api.post(PostUriManager[from], enhancedFormData).then(({ data }) => {
                            return sendAttachFiles(data.id).then((_) => navigateAfterChanges());
                        });
                    }}
                >
                    {isEditing ? 'Сохранить' : 'Создать'}
                </Button>
            </FormControl>
        </Grid>
    );
};
