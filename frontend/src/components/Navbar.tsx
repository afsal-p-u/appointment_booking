import { BiMessageSquareDetail } from "react-icons/bi";
import { useState } from 'react'
import { useAuthContext } from "../context/AuthContext";

const Navbar = ({ notification }: { notification: any }) => {
  const [showMenu, setShowMenu] = useState(false)
  const { setToken } = useAuthContext()

  return (
    <div className="flex justify-between w-full h-[10vh] px-[100px] items-center shadow-md sticky top-0 z-[100]">
      <h3 className="text-2xl font-bold">
        A<span className="text-[var(--blue)]">B</span>
      </h3>
      <div className="flex items-center gap-5">
        <BiMessageSquareDetail
          className="text-2xl cursor-pointer hover:text-[var(--blue)]"
          onClick={() => notification(true)}
        />
        <div 
          className="w-[30px] cursor-pointer h-[30px] rounded-full border-[1px] relative"
          onClick={() => setShowMenu(prev => !prev)}  
        >
          {showMenu && (
            <button 
              className="px-5 text-[var(--red)] py-1 text-sm rounded absolute top-[40px] left-[-30px] bg-[#eee]
              font-medium cursor-pointer z-[999]"
              onClick={() => setToken(null)}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
