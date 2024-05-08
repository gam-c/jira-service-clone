import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText, Divider, Button, Typography, Grid, MenuItem, Select, FormControl, InputLabel, Container } from '@mui/material';
import EditTicketForm from './EditTicketForm';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const getBackgroundColor = (priority) => {
  switch (priority) {
    case 'alta':
      return 'rgba(255, 0, 0, 0.2)';  // Rojo para alta prioridad
    case 'media':
      return 'rgba(255, 165, 0, 0.2)'; // Naranja para prioridad media
    case 'baja':
      return 'rgba(255, 255, 0, 0.2)'; // Amarillo para baja prioridad
    default:
      return 'inherit';  // Sin color de fondo si no hay prioridad definida
  }
};

const TicketsList = () => {
  const tickets = useSelector((state) => state.tickets.tickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [sortField, setSortField] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredTickets = tickets.filter(ticket => {
    return (
      (!filterType || ticket.type === filterType) &&
      (!filterPriority || ticket.priority === filterPriority) &&
      (!filterStatus || ticket.status === filterStatus)
    );
  }).sort((a, b) => {
    if (!sortField) return 0;
    if (sortField === 'createdAt' || sortField === 'updatedAt') {
      return new Date(b[sortField]) - new Date(a[sortField]);
    }
    return a[sortField].localeCompare(b[sortField]);
  });

  return (
    <Container>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="standard">
            <InputLabel>Ordenar por</InputLabel>
            <Select
              value={sortField}
              onChange={e => setSortField(e.target.value)}
              label="Ordenar por"
            >
              <MenuItem value="">Ninguno</MenuItem>
              <MenuItem value="createdAt">Fecha de Creación</MenuItem>
              <MenuItem value="updatedAt">Última Actualización</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="standard">
            <InputLabel>Filtrar por Tipo</InputLabel>
            <Select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              label="Tipo"
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="tecnico">Técnico</MenuItem>
              <MenuItem value="funcional">Funcional</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="standard">
            <InputLabel>Filtrar por Prioridad</InputLabel>
            <Select
              value={filterPriority}
              onChange={e => setFilterPriority(e.target.value)}
              label="Prioridad"
            >
              <MenuItem value="">Todas</MenuItem>
              <MenuItem value="alta">Alta</MenuItem>
              <MenuItem value="media">Media</MenuItem>
              <MenuItem value="baja">Baja</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="standard">
            <InputLabel>Filtrar por Estado</InputLabel>
            <Select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              label="Estado"
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="abierto">Abierto</MenuItem>
              <MenuItem value="cerrado">Cerrado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <List>
        {filteredTickets.map((ticket, index) => (
          <React.Fragment key={ticket.id}>
            <ListItem 
              alignItems="flex-start"
              sx={{ backgroundColor: getBackgroundColor(ticket.priority) }}
            >
              <ListItemText
                primary={<Typography variant="subtitle1" component="span" style={{ fontWeight: 'bold' }}>{ticket.title}</Typography>}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      Tipo: {ticket.type} - Prioridad: {ticket.priority} - Estado: {ticket.status}
                    </Typography>
                    <br />
                    <Typography component="span" variant="caption" color="textSecondary" style={{ fontStyle: 'italic' }}>
                      Creado: {formatDate(ticket.createdAt)}
                    </Typography>
                    <br />
                    <Typography component="span" variant="caption" color="textSecondary" style={{ fontStyle: 'italic' }}>
                      Actualizado: {formatDate(ticket.updatedAt)}
                    </Typography>
                  </>
                }
              />
              <Button onClick={() => setSelectedTicket(ticket)} size="small">Editar</Button>
            </ListItem>
            {selectedTicket && selectedTicket.id === ticket.id && (
              <EditTicketForm ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
            )}
            {index !== tickets.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default TicketsList;
