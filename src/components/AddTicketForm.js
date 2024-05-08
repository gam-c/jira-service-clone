import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ticketAdded } from '../features/ticketsSlice';
import { TextField, Button, MenuItem, Grid } from '@mui/material';

const AddTicketForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [priority, setPriority] = useState('');

  const handleAddTicket = () => {
    if (!title || !description || !type || !priority) {
      alert("Faltan datos");
      return;
    }
    dispatch(ticketAdded({
      id: Date.now(), 
      title,
      description,
      type,
      priority,
      status: 'Abierto',
      date: new Date().toISOString()
    }));
    setTitle('');
    setDescription('');
    setType('');
    setPriority('');
  };

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Asunto Ticket"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Descripción"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          select
          fullWidth
          label="Tipo"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="Técnico">Técnico</MenuItem>
          <MenuItem value="Funcional">Funcional</MenuItem>
        </TextField>
      </Grid>
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
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAddTicket}>
          Añadir Ticket
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddTicketForm;
