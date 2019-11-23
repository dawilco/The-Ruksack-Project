import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput, Show, TabbedShowLayout, Tab, ReferenceManyField } from 'react-admin';
import EIcon from '@material-ui/icons/Event';
export const EventIcon = EIcon;

export const EventList = (props) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="name" />
            <TextField source="notes" />
            <DateField source="eventStart" />
            <EditButton basePath="/Events" />
        </Datagrid>
    </List>
);

const EventTitle = ({ record }) => {
    return <span>Event {record ? `"${record.title}"` : ''}</span>;
};

export const EventEdit = (props) => (
    <Edit title={<EventTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="notes" options={{ multiLine: true }} />
            <DateInput label="Event Start" source="eventStart" />
        </SimpleForm>
    </Edit>
);

export const EventCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <LongTextInput source="notes" />
            <DateInput label="Event Start" source="eventStart" />   
        </SimpleForm>
    </Create>
);

export const EventShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="Summary">
                <TextField label="event id" source="id" />
                <TextField label="notes" source="notes" />
            </Tab>
            <Tab label="Registrations">
                <ReferenceManyField reference="participants" target="1" addLabel={false}>
                    <Datagrid>
                        <TextField source="firstName" />
                        <TextField source="lastName" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
)