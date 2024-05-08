import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
  status: 'idle', // Puede ser 'idle', 'loading', 'succeeded', 'failed'
  error: null
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    ticketAdded(state, action) {
      state.tickets.push({
        ...action.payload,
        id: action.payload.id || Date.now(), // Asegura un ID único, útil para la clave 'key' en listas de React
        createdAt: new Date().toISOString(), // Establece la fecha y hora de creación
        updatedAt: new Date().toISOString()  // Establece la fecha y hora de última actualización
      });
    },
    ticketUpdated(state, action) {
      const { id, priority, status } = action.payload;
      const existingTicket = state.tickets.find(ticket => ticket.id === id);
      if (existingTicket) {
        existingTicket.priority = priority;
        existingTicket.status = status;
        existingTicket.updatedAt = new Date().toISOString(); // Actualiza la fecha y hora de última actualización
      }
    }
  }
});

export const { ticketAdded, ticketUpdated } = ticketsSlice.actions;

export default ticketsSlice.reducer;
