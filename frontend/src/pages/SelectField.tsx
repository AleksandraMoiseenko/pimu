import * as React from 'react';
import { Checkbox, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export function SelectField({ field, tutors = [], selectedTutorsIds, setSelectedTutorsIds }: any) {
    const handleRoleChange = (event: any) => {
        const { value } = event.target;
        setSelectedTutorsIds(value);
    };

    return (
        <div>
            <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-multiple-chip-label">{field.label}</InputLabel>
                <Select
                    multiple
                    value={selectedTutorsIds}
                    onChange={handleRoleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => {
                        return (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((tutorId: any) => {
                                    const chipText = `${
                                        tutors.find((t) => t.id === tutorId)?.firstname
                                    } ${tutors.find((t) => t.id === tutorId)?.lastname}`;

                                    return (
                                        <Chip variant="outlined" key={tutorId} label={chipText} />
                                    );
                                })}
                            </Box>
                        );
                    }}
                    MenuProps={MenuProps}
                >
                    {tutors.map((tutor: any) => {
                        const listItemText = `${tutor.firstname} ${tutor.lastname}`;

                        return (
                            <MenuItem key={tutor.id} value={tutor.id}>
                                <Checkbox checked={selectedTutorsIds.includes(tutor.id)} />
                                <ListItemText primary={listItemText} />
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );
}
