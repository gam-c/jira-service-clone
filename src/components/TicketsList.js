import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText, Divider, Button, Typography, Box, MenuItem, Select, FormControl, InputLabel, Container } from '@mui/material';
import EditTicketForm from './EditTicketForm';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
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
    if (!sortField) return 0; // No ordenar si no se ha seleccionado campo
    if (sortField === 'createdAt' || sortField === 'updatedAt') {
      return new Date(b[sortField]) - new Date(a[sortField]);
    }
    return a[sortField].localeCompare(b[sortField]);
  });

  return (
    <Container>
      <Box sx={{ maxWidth: 960, mx: 'auto', my: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel>Ordenar por</InputLabel>
            <Select
              value={sortField}
              onChange={e => setSortField(e.target.value)}
              label="Ordenar por"
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="createdAt">Fecha de Creación</MenuItem>
              <MenuItem value="updatedAt">Última Actualización</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel>Tipo</InputLabel>
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
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel>Prioridad</InputLabel>
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
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel>Estado</InputLabel>
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
        </Box>
        <List>
          {filteredTickets.map((ticket, index) => (
            <React.Fragment key={ticket.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={<Typography variant="subtitle1" component="span" style={{ fontWeight: 'bold' }}>{ticket.title}</Typography>}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        Prioridad: {ticket.priority} - Estado: {ticket.status} - Tipo: {ticket.type} 
                      </Typography>
                      <br/>
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
      </Box>
    </Container>
  );
};

export default TicketsList;
