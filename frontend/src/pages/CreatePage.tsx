import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button, FormControl, Grid, IconButton, TextField } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { CREATE_FIELDS_MAP, routerPaths } from '../const';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { PostUriManager, PutUriManager, UrlBuilder } from '../helpers';
import { EXPORT_COURSE_TUTORS, TUTORS } from '../urls';
import { SelectField } from './SelectField';
import { saveAs } from 'file-saver';

export const AttachFile = (props: any) => {
    return (
        <>
            <span>{props.field.label}</span>
            <Button variant="contained" component="label" color="secondary">
                Прикрепить файл
                <input type="file" hidden />
            </Button>
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
    let location: any = useLocation();
    let navigate = useNavigate();
    let path = location.pathname;

    const [formData, setFormData] = useState({});

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
            setTutors(form.tutors);

            const tutorsIds = form.tutors.map((tutor) => tutor.id);
            setSelectedTutorsIds(tutorsIds);
        }
    }, []);

    useEffect(() => {
        if (isEditing) return;

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
                if (field.hasAttach) return <AttachFile field={field} />;
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
            {path === routerPaths.courses && isEditing && (
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

                                saveAs(url, 'tutors.csv');
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
                        const enhancedFormData = { ...formData, tutors: selectedTutors };

                        if (isEditing) {
                            return api.put(PutUriManager[from], enhancedFormData).then((data) => {
                                navigate(from);
                            });
                        }

                        return api.post(PostUriManager[from], enhancedFormData);
                    }}
                >
                    {isEditing ? 'Сохранить' : 'Создать'}
                </Button>
            </FormControl>
        </Grid>
    );
};
