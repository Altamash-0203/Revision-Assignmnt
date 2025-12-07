import React from "react";


function Tab({curr,onChange}) {

    let tabs=["artifacts","creatures","logs"]


    return(
        <>
        <div className="flex justify-evenly border ">
            {tabs.map(t=>(
                <button
                 key={t}
                onClick={()=>onChange(t)}
                className="border p-1 m-1 capitalize bg-black text-white font-extralight"
                >
                    {t}
                </button>
            ))}
        </div>
        </>
    )
}

export default Tab