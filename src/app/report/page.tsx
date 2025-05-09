'use client'

import Image from 'next/image';
import * as React from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';

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
    <div className='min-h-screen'>
      <nav className='h-20 bg-white text-amber-900 border-b border-gray-200 flex items-center px-6'>
      <Image
                        src={"/image.png"}
                        alt="JJ Core Medtech Logo"
                        priority
                        width={165}
                        height={45}
                    />
        {/* <Image
                        src={"/image.png"}
                        alt="JJ Core Medtech Logo"
                        priority
                        width={165}
                        height={45}
                    /> */}
      </nav>

      <div className="bg-white h-[calc(100vh-80px)] p-4">
        <h2 className="text-black text-2xl mb-10">Dump Report:</h2>

        {/* grid box  */}
        <div className='border-2'>
          <div className="flex items-center justify-center h-[85%]">
            <div style={{ height: 400, width: '90%' }}>
              <DataGrid
                {...data}
                sx={{
                  border: 'none',
                  '& .MuiDataGrid-cell': { borderBottom: 'none' },
                  '& .MuiDataGrid-columnHeaders': { borderBottom: 'none' },
                }}
              />
            </div>
          </div>



        </div>
      </div>
    </div>
  );
}