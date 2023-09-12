import { useState } from 'react'
import Book from './Book';

const TimingItem = ({ time, date, change }: { time: string, date: any, change: any }) => {
  const [showBook, setShowBook] = useState(false)

  return (
    <>
      <div 
        className="w-[350px] rounded h-[50px] shadow-md border-[1px] border-[var(--blue)] flex items-center px-[15px]
        justify-between"
      >
        <h3 className="text-[var(--blue)] font-semibold">{time}</h3>

        <button 
          className="px-5 py-1 rounded text-white bg-[var(--blue)] text-xs font-medium"
          onClick={() => setShowBook(true)}
        >
          Book
        </button>
      </div>

      {showBook && (
        <Book close={setShowBook} time={time} date={date} change={change} />
      )}
    </>
  );
};

export default TimingItem;
