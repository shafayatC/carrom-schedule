import React, { useState } from "react";

const CarromBoardBooking = () => {
  const [selectedSeat, setSelectedSeat] = useState("");

  const bookSeat = (seat) => {
    setSelectedSeat(seat);
  };

  return (
    <div className="flex flex-col justify-center mt-10">
      <div className=" bg-gray-100 rounded-md p-4 w-full  md:w-[435px]">
        <div className="text-lg font-bold mb-2 text-center ">Booking Details</div>
        <div className="p-2 bg-white border text-center border-gray-300 rounded-md">
          {selectedSeat
            ? `You have booked ${selectedSeat}`
            : "Please select a seat to book."}
        </div>
      </div>
    
      <div className="p-4 bg-[#f5f5f5] mt-2 rounded-md" >
        
      <div className="grid grid-cols-3 grid-rows-3 gap-4 h-full w-[400px]">
  <div className="col-start-2 row-start-1">
    <div
     className={`p-2  border border-gray-300 text-center cursor-pointer hover:bg-green-300 transition duration-300 ${
        selectedSeat === "A1" ? "bg-green-700 text-white" : ""
      }`}
      onClick={() => bookSeat("A1")}
    >
      A1
    </div>
  </div>
  <div className="col-start-1 row-start-2">
    <div
     className={`p-2  border border-gray-300 text-center cursor-pointer hover:bg-green-300 transition duration-300 ${
        selectedSeat === "B1" ? "bg-green-700 text-white" : ""
      }`}
      onClick={() => bookSeat("B1")}
    >
      B1
    </div>
  </div>
  <div className="col-start-3 row-start-2">
    <div
    className={`p-2  border border-gray-300 text-center cursor-pointer hover:bg-green-300 transition duration-300 ${
        selectedSeat === "B2" ? "bg-green-700 text-white" : ""
      }`}
      onClick={() => bookSeat("B2")}
    >
      B2
    </div>
  </div>
  <div className="col-start-2 row-start-2">
    {/* <div
      className={`p-2 bg-white border border-gray-300 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ${
        selectedSeat === "Center Seat" ? "bg-green-200" : ""
      }`}
      onClick={() => bookSeat("Center Seat")}
    >
      Center Seat
    </div> */}
  </div>
  <div className="col-start-2 row-start-3">
    <div
      className={`p-2  border border-gray-300 text-center cursor-pointer hover:bg-green-300 transition duration-300 ${
        selectedSeat === "A2" ? "bg-green-700 text-white" : ""
      }`}
      onClick={() => bookSeat("A2")}
    >
      A2
    </div>
  </div>
  <div className="col-start-2 row-start-2 -mt-10 flex items-center justify-center">
    <img src="/images/carrom-board.webp" alt="Image" className="w-32 h-32" />
  </div>
</div>

      </div>
    </div>
  );
};

export default CarromBoardBooking;
