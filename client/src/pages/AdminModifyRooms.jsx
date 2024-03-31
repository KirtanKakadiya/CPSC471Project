import "../assets/styling/AdminModifyRooms.css"
import React from 'react'
import DataTable from "react-data-table-component"
import { useState, useEffect } from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";



export default function AdminModifyRooms() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
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
            const response = await fetch("http://localhost:7003/booking/getAllBooking", {
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "POST",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(),
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

   
    const HandleApprove = (room, start, end) =>{
        const startDate = new Date(start);
        const endDate = new Date(end);

        start = formatDateTime(startDate);
        end = formatDateTime(endDate);

        const body = {
            room: room,
            start: start,
            end: end,
        }
        async function getData() {
            const response = await fetch("http://localhost:7003/booking/approveBooking", {
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
                toast.success("Approved");
            }
        }
        getData();
    }

    const HandleDecline = (room, start, end) =>{
        const startDate = new Date(start);
        const endDate = new Date(end);

        start = formatDateTime(startDate);
        end = formatDateTime(endDate);

        const body = {
            room: room,
            start: start,
            end: end,
        }
        async function getData() {
            const response = await fetch("http://localhost:7003/booking/declineBooking", {
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
                toast.success("Denied");
            }
        }
        getData();
    }

    const HandleDelete = (data) => {
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
            selector: (row) => formatDateTime(new Date(row.start_))
        },
        {
            name: "End Date",
            selector: (row) =>formatDateTime(new Date(row.end_))
        },
         {
            name : "Approved By",
            selector: (row) =>row.approved_by === null ? 
                <div>
                    <button className="approve" onClick = {() => HandleApprove(row.held_in,row.start_,row.end_ )}>
                        <IoMdCheckmark/>
                    </button>
                    <button className="decline" onClick={() =>HandleDecline(row.held_in,row.start_,row.end_ )}>
                        <FaXmark/> 
                    </button>
                    <ToastContainer/>
                </div>
                :row.approved_by
         },
         {
            name : "Cancel",
            cell : (data) => [<div><button  onClick={() => HandleDelete(data)}><MdDelete /></button><ToastContainer/></div>]
         }

    ]


    const handleEvent = (data) => {
        console.log(data.roomnumber, data.roomtype);
    }

    return(
        <div className="content-wrapper-adminmodify">
            <h1 className='title'>
                Admin Modify Bookings
            </h1>
            <div className='restable-content'>
                <DataTable 
                    columns={columns}
                    data = {data}
                    progressPending = {loading}
                />
            </div>
        </div>

    );
}