import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";
import Inputs from "./Inputs";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { formatDate } from "../utils/formatDate";

type InputTypes = {
  name: string;
  number: number;
  age: number;
  gender: string;
  date: string;
  time: string;
};

const Book = ({
  close,
  date,
  time,
  change
}: {
  close: any;
  date: string;
  time: string;
  change: any
}) => {
  const [inputs, setInputs] = useState<InputTypes | null>(null);
  const { token }: object | any = useAuthContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: InputTypes | any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/booking", {
        ...inputs,
        time,
        user_id: token.user,
        date: formatDate(new Date(date)),
      })
      .then((res) => {
        close()
        change((prev: any) => !prev)
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-[calc(100%-10vh)] absolute top-[10vh] left-0 grid place-content-center z-50">
      <div className="shadow-lg rounded p-10 bg-[var(--blue)] relative">
        <div className="">
          <AiOutlineClose
            className="text-[25px] text-white absolute right-[10px] top-3 cursor-pointer"
            onClick={() => close()}
          />
        </div>
        <form
          className="w-[350px] flex flex-col mt-3 gap-4"
          onSubmit={handleSubmit}
        >
          <Inputs
            type="text"
            placeholder="Name"
            name="name"
            change={handleChange}
          />
          <Inputs
            type="number"
            placeholder="Number"
            name="number"
            change={handleChange}
          />
          <Inputs
            type="number"
            placeholder="Age"
            name="age"
            change={handleChange}
          />
          <Inputs
            type="text"
            placeholder="Gender"
            name="gender"
            change={handleChange}
          />

          <div className="flex justify-end mt-3 gap-3">
            <Button type="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Book;
