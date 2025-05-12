'use client'

import Image from 'next/image';
import * as React from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import classess from "../login/loginCss.module.css";

// icons
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export interface DataRowModel {
  id: GridRowId;
  [price: string]: number | string;
}

export interface GridData {
  columns: GridColDef[];
  rows: DataRowModel[];
}

function useData(rowLength: number, columnLength: number) {
  const [data, setData] = React.useState<GridData>({ columns: [], rows: [] });

  /* React.useEffect(() => {
     async function fetchData() {
       try {
         const res = await fetch('/api/data'); // Change to your API endpoint
         const json = await res.json();
         setData({
           columns: json.columns,
           rows: json.rows,
         });
       } catch (error) {
         console.error('Failed to load data:', error);
       }
     }
 
     fetchData();
   }, []);*/


  React.useEffect(() => {
    const rows: DataRowModel[] = [
      { id: 1, name: 'Apple', category: 'Fruit', price: 1.25, stock: 100 },
      { id: 2, name: 'Banana', category: 'Fruit', price: 0.75, stock: 150 },
      { id: 3, name: 'Carrot', category: 'Vegetable', price: 0.5, stock: 200 },
      { id: 4, name: 'Broccoli', category: 'Vegetable', price: 1.1, stock: 80 },
      { id: 5, name: 'Chicken Breast', category: 'Meat', price: 5.5, stock: 50 },
      { id: 6, name: 'Salmon', category: 'Fish', price: 9.99, stock: 25 },
      { id: 7, name: 'Milk', category: 'Dairy', price: 2.5, stock: 60 },
      { id: 8, name: 'Cheese', category: 'Dairy', price: 3.75, stock: 45 },
    ];

    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'category', headerName: 'Category', width: 130 },
      { field: 'price', headerName: 'Price ($)', width: 100 },
      { field: 'stock', headerName: 'In Stock', width: 100 },
    ];

    setData({ rows, columns });
  }, []);

  return data;
}

export default function ColumnVirtualizationGrid() {
  const data = useData(100, 1000);


  return (
    <div className='min-h-screen   bg-[#fff9f9]'>
      <nav className="h-23 bg-white border-gray-200 ">
        <div className="flex items-center h-full pl-10">
          {/* Red Logo Box */}
          <div

            style={{ backgroundColor: '#cb001c', marginLeft: '28px' }}
            className="w-[280px] h-full flex items-center justify-center"
          >
            <Image
              src="/jnj_logo_white.jpg"
              alt="JJ Core Medtech Logo"
              priority
              width={165}
              height={45}
            />
          </div>

          {/* Johnson & Johnson Text */}
          <div className='w-[130px]' style={{ marginLeft: '50px' }}>
            <Image
              src="/image.png"
              alt=" Johnson & Johnson "
              priority
              width={155}
              height={35}
            />
          </div>

        </div>
      </nav>



      <div style={{ backgroundColor: '#fff9f9' }}>

        <div style={{ marginLeft: '40px', marginRight: '40px', borderColor: '#fceeee' }} >
          <h2 style={{ marginTop: '11px', marginBottom: '15px', fontSize: '25px', fontWeight: '800', color: 'rgb(52, 45, 45)' }} className={classess.font}>
            Dump Report
            <span className='text-[18px] font-medium'> : ETHICON, Jan-2025</span>
            {/* {} */}
          </h2>

          {/* grid box  */}
          <div style={{ height: '350px' }} className='border border-[#fceeee] rounded-xl bg-white shadow-sm'>
            <div style={{ marginLeft: '25px', marginRight: '25px' }} className="flex items-center justify-center h-[85%]">
              <div style={{ height: 290, width: '100%' }}>

                {/* top sextion  */}

                <div style={{ marginBottom: '10px ', }} className="flex items-center justify-between   rounded-lg">
                  {/* Left Section */}
                  <p style={{ font: '1px', fontSize: '13px', fontWeight: '700', }}
                    className="
                    text-[#342d2d]
                      font-large 
                      backgroundColor: '#fff9f9'">
                    Total No. of Records <span
                      style={{ font: '1px', fontSize: '12px', fontWeight: '400', }}
                      className="
                    text-black 
                      font-large 
                      // text-bold
                      backgroundColor: '#fff9f9', // ✅ Ensures each header cell also gets the color
                      hover:bg-[#f5ebeb] rounded-2xl">[16051]</span>
                  </p>

                  {/* Right Section */}
                  <div className="flex items-center space-x-4">
                    {/* Search Input */}
                    <div className="relative w-[260px]">
                      <input
                        style={{ margin: '2px', paddingLeft:'28px' }}
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 h-10 border border-[#fceeee] rounded-md bg-[#fff9f9] outline-none focus:border-black"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <SearchOutlinedIcon fontSize="small"/>
                      </div>
                    </div>


                    {/* Filters Button */}
                    <button
                      style={{ margin: '4px', padding: '4px', font: '1px', fontSize: '13px', fontWeight: '700', }}
                      className="
                    text-black 
                      font-large 
                      text-bold
                      backgroundColor: '#fff9f9', // ✅ Ensures each header cell also gets the color
                      hover:bg-[#f5ebeb] rounded-2xl">
                      <FilterListIcon />
                      Filters
                    </button>

                    {/* Export Button */}
                    <button style={{ margin: '4px', padding: '4px', fontSize: '13px', fontWeight: '700', }}
                      className="
                    text-black 
                      font-large 
                      text-bold
                    
                      backgroundColor: '#fff9f9', // ✅ Ensures each header cell also gets the color
                      hover:bg-[#f5ebeb] rounded-2xl">
                      <FileDownloadOutlinedIcon />
                      Export
                    </button>
                  </div>
                </div>
                {/* </div> */}


                {/* data grid box */}
                <DataGrid
                  {...data}
                  sx={{
                    border: 'none', // No outer border
                    '& .MuiDataGrid-cell': {
                      border: 'none', // No cell borders
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: '#fff9f9', // ✅ Header background
                      borderBottom: 'none',

                    },
                    '& .MuiDataGrid-columnHeader': {
                      backgroundColor: '#fff9f9', // ✅ Ensures each header cell also gets the color
                      fontFamily: 'Arial, sans-serif',
                      color: 'rgb(52, 45, 45)',
                      fontWeight: '700',
                      fontSize: '13px',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                      fontWeight: 700, // 👈 directly targets the title element
                    },
                    '& .MuiDataGrid-columnSeparator': {
                      display: 'none !important', // No column separators
                    },
                    '& .MuiDataGrid-row': {
                      border: 'none', // No row borders
                    },
                    '& .MuiDataGrid-virtualScroller': {
                      border: 'none',
                    },
                    '& .MuiDataGrid-footerContainer': {
                      borderTop: 'none',
                    },
                    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                      outline: 'none',
                    },
                  }}
                />


              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}