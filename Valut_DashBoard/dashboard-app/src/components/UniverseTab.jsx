import React from "react";
import UseState from "../hooks/useUniverseState";
import UseData from "../hooks/useUniverseData";
import UseOffline from "../hooks/useOfflineWriter";
import { useRef } from "react";
import { useEffect } from "react";



function UnviverseTab({id}) {
    let [ui,setUi]=UseState(id)
    const {item,pulse}=UseData(id,ui.freeze)
    let submit=UseOffline(id)

    let ref=useRef(null)


    useEffect(()=>{
        let c=ref.current
        if(c) {
            c.scrollTop=ui.scrollY||0
        }
    },[])


    let scrollS=()=>{
        let c=ref.current
         setUi(u=>({...u,scrollY:c.scrollTop}))
    }


    //pagination
    let pageSize=20
    let st=ui.page*pageSize
    let paginated=item.slice(st,st+pageSize)



    return(
        <>
        <div>
            <div>
                <div className="flex p-3 gap-4 text-2xl">
                    <label>
                        <input
                         type="checkbox" 
                         checked={ui.freeze}
                         onChange={e=>setUi(p=>({...p,freeze:e.target.checked}))}
                         />
                         Freeze
                    </label>
                </div>

               
                <div
                ref={ref}
                onScroll={scrollS}
                >  
                  <p className="bg-gray-400 m-4">{id.toUpperCase()}</p>
                    {paginated.map(i=>(
                        <div
                        className="border p-1"
                        key={i.id}
                        onClick={()=>setUi(s=>({...s,last:i.id}))}
                        >
                            {i.name}
                        </div>
                    ))}
                    
                </div>


                <div className="flex justify-around items-center">
                    <button
                    className="bg-black p-1 w-20 m-3 text-white"
                    disabled={ui.page==0}
                    onClick={()=>setUi(s=>({...s,page:s.page-1}))}
                    >
                        prev
                    </button>

                    <span>page{ui.page}</span>
                    
                     <button
                     className="bg-black p-1 w-20 m-3 text-white"
                   disabled={st + pageSize >= item.length}
                    onClick={()=>setUi(s=>({...s,page:s.page+1}))}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
        </>
    )

}

export default UnviverseTab