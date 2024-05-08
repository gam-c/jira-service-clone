import React from 'react';
import TicketsList from './components/TicketsList';
import AddTicketForm from './components/AddTicketForm';
import { Container } from '@mui/material';

function App() {
  return (
    <Container>
      <h1>Sistema Administración de Tickets</h1>
      <AddTicketForm />
      <TicketsList />
    </Container>
  );
}

export default App;

