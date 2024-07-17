import { useState } from 'react'
import { ChromePicker } from 'react-color'
import { useDraw } from './hooks/useDraw'

const App = () => {
  const [color, setColor] = useState('#000')
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine)

  function drawLine({ prevPoint, currentPoint, ctx }) {
    const { x: currX, y: currY } = currentPoint
    const lineColor = color
    const lineWidth = 5

    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()

    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx.fill()
  }

  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
      <div className='flex flex-col gap-10 pr-10'>
        <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        <button type='button' className='p-2 rounded-md border border-black' onClick={clear}>
          Clear canvas
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={450}
        height={450}
        className='border border-black rounded-md'
      />
    </div>
  )
}

export default App
