import React, { useEffect, useState } from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import "../css/dashboardhome.css";

export default function DashboardHome() {

    const [stats, setStats] = useState({
        total:0,
        available:0,
        completed:0,
        pending:0
    });

    const [history,setHistory]=useState([]);

    useEffect(()=>{

        loadStats();
        loadHistory();

    },[]);

    async function loadStats(){

        const token=localStorage.getItem("token");

        const response=await fetch(

            "http://localhost:8081/dashboard/stats",

            {

                headers:{
                    Authorization:`Bearer ${token}`
                }

            }

        );

        const data=await response.json();

        setStats(data);

    }

    async function loadHistory(){

        const token=localStorage.getItem("token");

        const response=await fetch(

            "http://localhost:8081/donation/history",

            {

                headers:{
                    Authorization:`Bearer ${token}`
                }

            }

        );

        const data=await response.json();

        setHistory(data);

    }

    const pieData=[

        {
            name:"Available",
            value:stats.available
        },

        {
            name:"Completed",
            value:stats.completed
        },

        {
            name:"Pending",
            value:stats.pending
        }

    ];

    const COLORS=["#22c55e","#3b82f6","#f59e0b"];

    return(

<div>

<h2>Dashboard</h2>
<br/>

<div className="cards">

<div className="dashboard-card">

<h3>Total Donations</h3>

<h1>{stats.total}</h1>

</div>

<div className="dashboard-card">

<h3>Available</h3>

<h1>{stats.available}</h1>

</div>

<div className="dashboard-card">

<h3>Completed</h3>

<h1>{stats.completed}</h1>

</div>

<div className="dashboard-card">

<h3>Pending</h3>

<h1>{stats.pending}</h1>

</div>

</div>

<div className="chart-box">

<ResponsiveContainer width="100%" height={350}>

<PieChart>

<Pie

data={pieData}

dataKey="value"

nameKey="name"

outerRadius={120}

label

>

{

pieData.map((entry,index)=>(

<Cell

key={index}

fill={COLORS[index]}

/>

))

}

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>

</div>

<h2>

Recent Completed Donations

</h2>

<table className="history-table">

<thead>

<tr>

<th>Food</th>

<th>Category</th>

<th>Quantity</th>

<th>Address</th>

</tr>

</thead>

<tbody>

{

history.map(item=>(

<tr key={item.id}>

<td>{item.foodName}</td>

<td>{item.category}</td>

<td>{item.quantity}</td>

<td>{item.address}</td>

</tr>

))

}

</tbody>

</table>

</div>

    );

}