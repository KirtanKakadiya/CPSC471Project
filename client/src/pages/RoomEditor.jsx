import "../assets/styling/AdminModifyRooms.css"
import React from 'react'
import DataTable from "react-data-table-component"
import { useState, useEffect } from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";




export default function RoomEditor() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const navigate = useNavigate();

    function formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:00:00`;
    }
    
    useEffect(() =>{
        async function getData(){
            const response = await fetch("http://localhost:7003/room/viewroom", {
                method: "GET",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET",
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


    const columns = [
        {
            name: "Room",
            selector: (row) =>row.room_id,
        },
        {
            name: "Created By",
            selector: (row) => row.created_by,
        },
        {
            name: "Capacity",
            selector: (row) =>row.capacity,
        },
        {
            name: "Room Type",
            selector: (row) =>row.room_type
        }

    ]


    const handleEvent = (data) => {
        console.log(data.roomnumber, data.roomtype);
    }

    const handleAddRooom = () => {
        navigate("/admin/roomeditor/addroom");
    }

    return(
        <div className="content-wrapper-adminmodify">
            <div className="heading">
                <h1 className='title-modifyrooom'>
                    Admin Room Editor
                </h1>
                <button className="addrooombtn" onClick={handleAddRooom}>
                    Add Room
                </button>
            </div>

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