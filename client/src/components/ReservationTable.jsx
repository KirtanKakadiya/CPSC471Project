import React from 'react'
import DataTable from "react-data-table-component"
import { useState, useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

export default function ReservationsTable(){
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [perPage, setPerPage] = useState(10);

    function formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:00:00`;
    }


    
    useEffect(() =>{
        async function getData(){
            const response = await fetch("http://localhost:7003/booking/getNameBooking", {
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "POST",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({name: 2}),
            }
            );

            if(response.status == 500){
                // toast.error(response.statusText);
            }
            else if(response.status == 401){
                // toast.error(response.statusText);
            }
            else{
                response.json().then(response => setData(response));
            }
            
        }
        getData();
        console.log(data);
    }, []); 


    const handleEvent = (data) => {
        const startDate = new Date(data.start_);
        const endDate = new Date(data.end_);

        const start = formatDateTime(startDate);
        const end = formatDateTime(endDate);

        const body = {
            room: data.held_in,
            start: start,
            end: end,
        }
        async function deleteBooking(){
            const response = await fetch("http://localhost:7003/booking/deleteBooking", {
                method: "POST",
                headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
                "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
                });

                if(response.status == 500){
                    toast.error(response.statusText);
                }
                else if(response.status == 401){
                    toast.error(response.statusText);
                }
                else{
                    toast.success("Deleted booking");
                }
            }
        deleteBooking();
        }
    
    
   

    const columns = [
        {
            name: "Room",
            selector: (row) =>row.held_in,
        },
        {
            name: "Start Date",
            selector: (row) =>row.start_,
        },
        {
            name: "End Date",
            selector: (row) =>row.end_,
        },
         {
            name : "Cancel",
            cell : (data) => [<div><button  onClick={() => handleEvent(data)}><MdDelete /></button><ToastContainer/></div>]
         }

    ]




    return(
        <div className='restable-content'>
            <DataTable 
                columns={columns}
                data = {data}
                progressPending = {loading}
            />
        </div>
    );
    
}