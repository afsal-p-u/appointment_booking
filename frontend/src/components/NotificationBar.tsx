import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAuthContext } from "../context/AuthContext";

const NotificationBar = ({ notification, change, changes }: { notification: any, change: any, changes: any }) => {
  const [data, setData] = useState<any []>([])
  const { token }: any = useAuthContext()

  const getNotifications = () => {
    axios.get(`http://localhost:8080/api/notification/${token.user}`).then((res) => {
      setData(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleDelete = (id: any) => {
    axios.delete(`http://localhost:8080/api/notification/${token.user}/${id}`).then(() => {
      changes((prev: any) => !prev)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getNotifications()
  }, [change])

  return (
    <div
      className="fixed right-0 top-[10vh] w-[350px] h-[calc(100%-10vh)] z-50 bg-white border-l-[1px]
      border-t-[1px] shadow-lg px-[25px] py-[10px]"
    >
      <div className="flex justify-end">
        <AiOutlineClose
          className="text-[25px] text-black cursor-pointer"
          onClick={() => notification(false)}
        />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        {data?.map((item) => (
          <div 
            key={item.id}
            className="w-full h-[50px] bg-[var(--blue)] rounded flex items-center px-3 text-white text-xs font-medium
            justify-between"
          >
            <h3>{item.message}</h3>
            
            <div className="flex gap-2">
              <AiOutlineClose className="text-[15px] cursor-pointer" onClick={() => handleDelete(item.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationBar;
