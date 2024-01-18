import {createRoot} from 'react-dom/client';
import "./index.scss";
import React from 'react';

const MyFlixApplication = () =>{
    return(
        <div className='my-flix'>
            <div>Good Morning</div>
        </div>
    );
}

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication/>);