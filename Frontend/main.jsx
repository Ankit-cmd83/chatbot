import React from 'react';
import ReactDom from 'react-dom/client';
import Chatapp from './chatapp';
const Main = () => {
    return (
        <div>
            <Chatapp/>
        </div>
    );
}
ReactDom.createRoot(document.getElementById("main")).render(<Main></Main>);

