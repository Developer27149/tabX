import "../styles/loading.css"

export default function () {
  return (
    <div className="w-[800px] h-[400px] flex justify-center items-center flex-col gap-8">
      <div id="loader">
        <div id="shadow"></div>
        <div id="box"></div>
      </div>
      <div className="text-[15px] relative top-32 text-blue">
        LOADING...
      </div>
    </div>
  )
}
