import React, { useEffect, useState } from 'react'
import "../assets/styling/Booking.css"
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';


export default function BookingPage(){
    const username = useSelector((state) => state.user.username)
    const userID = useSelector((state) => state.user.userID)
    const {roomNumber, capacity, date} = useParams();
    let endDate=  "";
    
    function formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:00:00`;
    }

    const d =  new Date(date);
    d.setTime(d.getTime() + 2 * 3_600_000);
    endDate = formatDateTime(d);


    async function HandleBooking(){

        const body = {
            room: roomNumber,
            start: date,
            end: endDate,
            name : userID,
        }
        const response = await fetch("http://localhost:7003/booking/bookroom", {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
        )
        

        if(response.status == 500){
            toast.error(response.statusText);
        }
        else if(response.status == 401){
            toast.error(response.statusText);
        }
        else{
            toast.success("Booking was a success")
        }

        
    }
    console.log(roomNumber, capacity, date);
    return(
        <div className='content-wrapper-booking'>
            <h1 className='title'>
                Booking Room
            </h1>
            <p>Room : {roomNumber}</p>
            <p>Capacity: {capacity}</p>
            <p>Start Date: {date}</p>
            <p>End Date: {endDate}</p>
            <p>Name: {username}</p>
            
            <button className='confirm-booking' onClick= {HandleBooking}>
                Confirm your booking
            </button>
            <ToastContainer/>
        </div>

    );

}