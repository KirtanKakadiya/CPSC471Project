import "../assets/styling/AdminModifyRooms.css"
import React from 'react'
import DataTable from "react-data-table-component"
import { useState, useEffect } from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";




export default function AdminViewUsers() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const navigate = useNavigate();

   
    useEffect(() =>{
        async function getData(){
            const response = await fetch("http://localhost:7003/user/viewuser", {
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
                response.json().then(response => {
                    console.log(response);
                    setData(response)}
                    );
            }
            
        }
        getData();
        console.log(data);
    }, []); 

  
    const columns = [
        {
            name: "ID",
            selector: (row) =>row.id,
        },
        {
            name: "First Name",
            selector: (row) =>row.f_name,
        },
        {
            name: "Middle Name",
            selector: (row) => row.m_name,
        },
        {
            name: "Last Name",
            selector: (row) =>row.l_name,
        },
        {
            name: "Phone Number",
            selector: (row) =>row.phone_number
        },
        {
            name: "Email",
            selector: (row) =>row.email
        },
        {
            name: "User Type",
            selector: (row) =>row.usertype
        }

    ]


    return(
        <div className="content-wrapper-adminmodify">
            <div className="heading">
                <h1 className='title-modifyrooom'>
                    See Users
                </h1>
                <button className="addrooombtn"  onClick={() => navigate("/admin/addusers")}>
                    Add User
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