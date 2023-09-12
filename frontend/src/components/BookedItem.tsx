import axios from 'axios'
import { useAuthContext } from '../context/AuthContext';

const BookedItem = ({ item, change }: { item: any, change: any }) => {
  const { token }: any = useAuthContext()

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/booking/${token.user}/${item.id}`).then((res) => {
      change((prev: any) => !prev)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <div 
        className="w-[350px] rounded h-[50px] shadow-md border-[1px] border-[var(--blue)] flex items-center px-[15px]
        justify-between"
      >
        <div className="flex gap-3 items-baseline">
          <h3 className="text-[var(--blue)] font-semibold">{item.time}</h3>
          <p className="text-black text-xs font-semibold">{item.date}</p>
        </div>

        <button 
          className="px-5 py-1 rounded text-white text-xs bg-[var(--red)] font-medium"
          onClick={handleDelete}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default BookedItem;
