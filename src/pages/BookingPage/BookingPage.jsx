import React, { useState } from "react";

const CarromBoardBooking = ({tableData}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState({
    A1: { name: "Rhine", disabled: true },
    B1: { name: "", disabled: false },
    B2: { name: "Shafayat", disabled: true },
    A2: { name: "", disabled: false },
  });

  const bookSeat = (seat) => {
    if (selectedSeats.length < 2) {
      const updatedSeats = { ...seats };
      updatedSeats[seat] = { ...updatedSeats[seat], disabled: true, name: "Demo Name" };
      setSeats(updatedSeats);
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="flex flex-col justify-center mt-10">
      {
        console.log(tableData)
      }
      <div className=" bg-gray-200 rounded-md p-4 w-full md:w-[435px]">
        <div className="text-lg font-bold mb-2 text-center ">Booking Details</div>
        <div className="p-2 bg-white border text-center border-gray-300 rounded-md">
          {selectedSeats.length === 2
            ? `You have booked ${selectedSeats.join(", ")}`
            : "Please select two seats to book."}
        </div>
      </div>

      <div className="p-4 bg-gray-200 mt-2 rounded-md">
        <div className="flex justify-center">
          <div className="grid grid-cols-3 grid-rows-3 gap-4">
            <div className="col-start-2 row-start-1">
              <Seat seat="A1" {...seats["A1"]} bookSeat={bookSeat} />
            </div>
            <div className="col-start-1 row-start-2">
              <Seat seat="B1" {...seats["B1"]} bookSeat={bookSeat} />
            </div>
            <div className="col-start-3 row-start-2">
              <Seat seat="B2" {...seats["B2"]} bookSeat={bookSeat} />
            </div>
            <div className="col-start-2 row-start-3">
              <Seat seat="A2" {...seats["A2"]} bookSeat={bookSeat} />
            </div>
            <div className="col-start-2 row-start-2 flex -mt-8 items-center justify-center">
              <img src="/images/carrom-board.webp" alt="Image" className="w-32 h-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Seat = ({ seat, name, disabled, bookSeat }) => (
  <div
    className={`p-2 border border-gray-400 text-center cursor-pointer ${
      disabled ? "bg-gray-400 text-gray-600" : "hover:bg-green-300 transition duration-300"
    }`}
    onClick={() => !disabled && bookSeat(seat)}
  >
    {seat}
    {disabled && <div className="text-xs">{name}</div>}
  </div>
);

export default CarromBoardBooking;
