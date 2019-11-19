// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataprovider';
import { EventList, EventEdit, EventCreate, EventIcon, EventShow } from './events';
import { ParticipantList, ParticipantIcon } from './participants';

// const dataProvider = jsonServerProvider('http://localhost:3000');
const App = () => (
  <Admin dataProvider={dataProvider}>
     <Resource name="events" list={EventList} edit={EventEdit} create={EventCreate} show={EventShow} icon={EventIcon}/>
     <Resource name="participants" list={ParticipantList} icon={ParticipantIcon} />
  </Admin>
);

export default App;