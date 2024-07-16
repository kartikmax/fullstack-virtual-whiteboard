import { useEffect,useRef , useState } from "react"


export const useDraw = (onDraw) =>{

    const [mouseDown,setMouseDown]= useState(false)
    const canvasRef = useRef()
    const prevPoint = useRef()

    const onMouseDown= ()=>setMouseDown(true)

    useEffect(()=>{

        if(!mouseDown) return 

        const handler = (e)=>{
            // console.log({x:e.clientX,y:e.clientY})
            const currentPoint = computePointInCanvas(e)

            const ctx = canvasRef.current?.getContext('2d')
            if(!ctx || currentPoint) return


        }


        const computePointInCanvas=(e)=>{

            const canvas = canvasRef.current

            if(!canvas) return
            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            return { x, y }

        }

        canvasRef.current?.addEventListener('mousemove',handler)

        return ()=>{
            canvasRef.current?.addEventListener('mousemove',handler)
        }

    },[])

    return {canvasRef, onMouseDown } ;
}

