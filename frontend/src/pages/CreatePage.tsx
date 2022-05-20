import {Button, FormControl, Grid, TextField} from "@mui/material";
import {useState} from "react";
import {useLocation} from "react-router-dom";
import {CREATE_FIELDS_MAP} from "../const";
import TextareaAutosize from '@mui/material/TextareaAutosize';

export const Attach = (props: any) => {
    return <>
        <span>{props.field.label}</span>
        <Button
            variant="contained"
            component="label"
            color='secondary'
        >
            Прикрепить файл
            <input
                type="file"
                hidden
            />
        </Button>
    </>
}

const TextArea = (props: any) => {
    return <>
        {props.field.label}
        <TextareaAutosize
            placeholder={props.field.label}
            minRows={3}
        />
    </>
}

export const CreatePage = () => {
    let location: any = useLocation();

    const [formData] = useState({});

    return <Grid display={'grid'} gridTemplateColumns={'1fr'} padding={'36px 30vw'} gap={3}>
        {CREATE_FIELDS_MAP[location.state.from].map(f => {
            if (f.hasAttach) return <Attach field={f}/>
            if (f.isTextArea) return <TextArea field={f}/>
            return <FormControl>
                <TextField
                    name={f.name}
                    label={f.label}
                    defaultValue=""
                    type={f.type}
                />
            </FormControl>
        })}
            <FormControl sx={{mt: 4}}>
            <Button
            variant="contained"
            color="primary"
            type="submit"
            >
            Создать
            </Button>
            </FormControl>
            </Grid>
        }