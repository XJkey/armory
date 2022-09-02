import React, { FC, useState,useEffect } from "react";

const Upload = (props: any) => {
    const [count, setCount] = useState(0);
    useEffect(() =>{
       document.title =  `You clicked ${count} times`;
       console.log(234)
    },[]);  
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

export default Upload;