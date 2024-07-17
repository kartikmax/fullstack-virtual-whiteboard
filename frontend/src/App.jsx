import { useState,useEffect } from "react";
import { ChromePicker } from "react-color";
import { useDraw } from "./hooks/useDraw";
import {io} from 'socket.io-client'
import { drawLine } from "./utils/drawLine";
const socket = io('http://localhost:3001')

const App = () => {
  const [color, setColor] = useState("#000");
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);

  useEffect(() => {

    const ctx = canvasRef.current?.getContext('2d')

    socket.emit('client-ready')

    socket.on('get-canvas-state',()=>{
      if(!canvasRef.current?.toDataURL()) return
      console.log(canvasRef.current?.toDataURL())

      socket.emit('canvas-state',canvasRef.current.toDataURL())

    })

    socket.on('canvas-state-from-server',(state)=>{
      console.log('I recived the state ')
      const img = new Image()
      img.src = state
      img.onload = () =>{
        ctx?.drawImage(img,0,0)
      }
    })
    
    socket.on('draw-line',({prevPoint, currentPoint ,color})=>{

      if(!ctx) return
      drawLine({prevPoint,currentPoint,ctx,color})

    })
  
   socket.on('clear',clear)

   return ()=>{
    socket.off('get-canvas-state')
    socket.off('canvas-state-from-server')
    socket.off('draw-line')
    socket.off('clear')
   }

  }, [])
  

  function createLine({prevPoint,currentPoint, ctx }){
    socket.emit('draw-line',({prevPoint,currentPoint,ctx,color}))
    drawLine({prevPoint,currentPoint,ctx,color})
  }

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="flex flex-col gap-10 pr-10">
        <div>
          <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        </div>
        <button
          type="button"
          className="p-2 rounded-md border border-black"
          onClick={()=>{socket.emit('clear')}}
        >
          Clear canvas
        </button>
        <button
          type="button"
          className="p-2 rounded-md border border-black"
        >
         Save Scene
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={450}
        height={450}
        className="border border-black rounded-md"
      />
    </div>
  );
};

export default App;
