import React from 'react'
import "../assets/styling/RoomReservations.css"
import ReservationsTable from '../components/ReservationTable';

export default function RoomReservations(){

    return(
        <div className='roomres-content'>
            <h1>Room Reservations</h1>
            <ReservationsTable />
        </div>
    );
}