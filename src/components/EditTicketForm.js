import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ticketUpdated } from '../features/ticketsSlice';
import { TextField, Button, MenuItem, Grid } from '@mui/material';

const EditTicketForm = ({ ticket, onClose }) => {
  const dispatch = useDispatch();
  const [priority, setPriority] = useState(ticket.priority);
  const [status, setStatus] = useState(ticket.status);

  const handleUpdateTicket = () => {
    dispatch(ticketUpdated({
      id: ticket.id,
      priority,
      status
    }));
    onClose();  // Llamar a onClose después de actualizar
  };

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={6}>
        <TextField
          select
          fullWidth
          label="Prioridad"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <MenuItem value="Alta">Alta</MenuItem>
          <MenuItem value="Media">Media</MenuItem>
          <MenuItem value="Baja">Baja</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          select
          fullWidth
          label="Estado"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={ticket.status === 'cerrado'}
        >
          <MenuItem value="Abierto">Abierto</MenuItem>
          <MenuItem value="Cerrado">Cerrado</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleUpdateTicket}>
          Actualizar Ticket
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditTicketForm;
