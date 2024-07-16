import { useDraw } from "./hooks/useDraw";

function App() {
  // const [count, setCount] = useState(0)

  const { canvasRef } = useDraw();

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <canvas
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
