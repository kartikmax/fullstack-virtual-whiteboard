import { useDraw } from "./hooks/useDraw";

function App() {
  // const [count, setCount] = useState(0)

  const { canvasRef } = useDraw();

  function drawLine({prevPoint,currentPoint,ctx}){
    const {x:currX,y:currY} = currentPoint

    const lineColor = '#000'
    const lineWidth =  5

    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x , startPoint.y)
    ctx.lineTo(currX,currY)
    ctx.stroke()

    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y , 2,0,2*Math.PI)

  } 

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <canvas
          // onMouseDown={onMouseDown}
          width={450}
          height={450}
          ref={canvasRef}
          className="border border-black rounded-md"
        />
      </div>
    </>
  );
}

export default App;
