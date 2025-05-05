import React, { useState } from 'react';
//import { createRoot } from 'react-dom/client';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { AgGridReact } from 'ag-grid-react';
import { useFetchJson } from './useFetchJson';
ModuleRegistry.registerModules([AllCommunityModule]);

 
interface IRow {
    id: string;
    name: string;
    username: string;
    email: string; 
}
export default function MyApp() {

    const { data, loading } = useFetchJson<IRow>(
        "https://jsonplaceholder.typicode.com/users",
    );
      
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs]: any[] = useState([
        { field: "id" },
        { field: "name" },
        { field: "username" },
        { field: "email" }
    ]);

    return (
        <div style={{ height: 500 }}>
            <AgGridReact
                rowData={data}
                columnDefs={colDefs}
            />
        </div>
    );
}
document.addEventListener('DOMContentLoaded', async () => {
    const gridContainer = document.getElementById('grid-container');
    if (!gridContainer) {
        console.error('Could not find grid container element!'); 
    } 

    console.log('MyApp'); 
    //const root = createRoot(gridContainer);
   // root.render(<MyApp />); 
});
