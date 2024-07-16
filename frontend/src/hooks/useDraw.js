import { useEffect,useRef } from "react"


export const useDraw = () =>{


    const canvasRef = useRef()

    useEffect(()=>{

        const handler = (e)=>{
            console.log({x:e.clientX,y:e.clientY})

        }

        canvasRef.current?.addEventListener('mousemove',handler)

        return ()=>{
            canvasRef.current?.addEventListener('mousemove',handler)
        }

    },[])

    return {canvasRef} ;
}

