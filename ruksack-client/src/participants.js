import React from 'react';
import {List, Datagrid, TextField} from 'react-admin';
import EIcon from '@material-ui/icons/People';
export const ParticipantIcon = EIcon;

export const ParticipantList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="firstName" />
            <TextField source="lastName" />
        </Datagrid>
    </List>
);