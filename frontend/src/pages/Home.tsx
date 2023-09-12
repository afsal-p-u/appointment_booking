import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimingItem from "../components/TimingItem";
import NotificationBar from "../components/NotificationBar";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import BookedItem from "../components/BookedItem";

const Home = () => {
  const [bookedItems, setBookedItems] = useState<any[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selected, setSelected] = useState("appointments");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sunday, setSunday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [changes, setChanges] = useState(false)

  const { token }: any = useAuthContext();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/booking/${token.user}`)
      .then((res) => {
        setBookedItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedDate, changes]);

  const isSaturday = (date: any) => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 6) {
      setSaturday(true);
    } else {
      setSaturday(false);
    }
    return dayOfWeek === 6;
  };

  const isSunday = (date: any) => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) {
      setSunday(true);
    } else {
      setSunday(false);
    }
    return dayOfWeek === 0;
  };

  // const isHoliday = (date: any) => {
  //   const holidays = [
  //     new Date("2023-12-25"), // Christmas
  //   ];
  //   return holidays.some(
  //     (holiday) => holiday.toDateString() === date.toDateString()
  //   );
  // };

  useEffect(() => {
    isSunday(selectedDate);
    isSaturday(selectedDate);
  }, [selectedDate]);

  return (
    <div className="w-full h-screen">
      <Navbar notification={setShowNotification} />

      <div className="px-[100px] flex h-[calc(100%-10vh)] mt-[100px] gap-3">
        <div className="w-[75%]">
          <ul className="flex gap-4">
            <li
              className="font-medium text-sm cursor-pointer flex flex-col items-center"
              onClick={() => setSelected("appointments")}
            >
              Appointments
              <div
                className={`w-[70%] h-[3px] bg-[var(--blue)] mt-1 group-hover:opacity-90
                ${selected === "appointments" ? "opacity-90" : "opacity-0"}`}
              ></div>
            </li>
            <li
              className="font-medium text-sm cursor-pointer flex flex-col items-center"
              onClick={() => setSelected("booked")}
            >
              Booked
              <div
                className={`w-[70%] h-[3px] bg-[var(--blue)] mt-1 group-hover:opacity-90
                ${selected === "booked" ? "opacity-90" : "opacity-0"}`}
              ></div>
            </li>
          </ul>

          <div className="mt-5">
            {selected === "appointments" ? (
              <>
                <h6 className="text-sm">Available:</h6>
                <div className="mt-3 flex flex-wrap gap-3">
                  {!sunday && (
                    <>
                      <TimingItem time="9 AM - 10 AM" date={selectedDate} change={setChanges} />
                      <TimingItem time="10 AM - 11 AM" date={selectedDate} change={setChanges} />
                      <TimingItem time="11 AM - 12 PM" date={selectedDate} change={setChanges} />
                      {!saturday && (
                        <>
                          <TimingItem time="2 PM - 3 PM" date={selectedDate} change={setChanges} />
                          <TimingItem time="3 PM - 4 PM" date={selectedDate} change={setChanges} />
                          <TimingItem time="4 PM - 5 PM" date={selectedDate} change={setChanges} />
                        </>
                      )}
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <h6 className="text-sm">Booked:</h6>
                <div className="mt-3 flex flex-wrap gap-3">
                  {bookedItems.map((item) => (
                    <BookedItem key={item.id} item={item} change={setChanges} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="w-[25%] flex justify-end ml-[-40px]">
          <div className="">
            <label htmlFor="date" className="text-sm font-medium">
              Select a date:{" "}
            </label>
            <DatePicker
              className="outline-none  p-1 text-[13px] border-[1px] focus:border-[var(--blue)]"
              selected={selectedDate}
              onChange={(date: any) => setSelectedDate(date)}
              open
            />
          </div>
        </div>
      </div>

      {showNotification && (
        <NotificationBar notification={setShowNotification} change={changes} changes={setChanges} />
      )}
    </div>
  );
};

export default Home;
