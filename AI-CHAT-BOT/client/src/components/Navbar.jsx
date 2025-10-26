import { MdOutlineSettings } from "react-icons/md";
import { TbWaveSawTool } from "react-icons/tb";



const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-center h-15 px-10 shadow-[0_05px_05px_rgba(0,0,0,0.05)]">
        <h1 className="text-2xl font-bold text-violet-800">💬 AI Chat</h1>
        <div className="flex flex-row justify-center items-center gap-4">
            <button className="flex gap-2 justify-center items-center border-2 border-gray-300 rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100">
                <TbWaveSawTool /> Upgrade now
            </button>
            <MdOutlineSettings className="text-xl cursor-pointer text-gray-700"/>
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-2 cursor-pointer">U</div>

        </div>
    </nav>
  )
}
export default Navbar