import '../styles/loading.css'

export default function () {
  return (
    <div className='w-[800px] h-[400px] flex justify-center items-center flex-col gap-8'>
      <div className="loader-loading"></div>
      <div className='text-[15px] opacity-60 transition-all hover:rotate-6 hover:opacity-100 hover:scale-105'>🐱 等我会~</div>
    </div>
  )
}