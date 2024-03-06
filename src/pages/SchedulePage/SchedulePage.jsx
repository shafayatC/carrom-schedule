import React, { useEffect, useState } from "react";
import CarromBoardBooking from "../BookingPage/BookingPage";

const TimeSchedule = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [scheduleData, setScheduleData] = useState(null);

  const showBookingDetails = (time) => {
    setSelectedTime(time);
  };

  useEffect(() => {
    fetch("http://localhost/wordpress/wp-json/carrom/v1/carrom-schedule-today")
      .then(res => res.json())
      .then(data => setScheduleData(data));

  }, [])
  return (
    <div className="container mx-auto h-[100vh]">
      <div className="flex flex-col md:flex-row justify-items-center justify-center  items-center gap-6 md:gap-20 pt-5">
        <div className="flex flex-col justify-center  mt-10 ">
          <div className="p-4 bg-gray-100 rounded-md mb-2 w-full md:w-[570px]">
            <div className="p-2 bg-white border border-gray-300 rounded-md text-center">
              {selectedTime
                ? `You have booked ${selectedTime}`
                : "Please select a time slot to book."}
            </div>
          </div>

          <div className="w-full md:w-[570px]">
            <div className="p-4 bg-gray-100 rounded-md">
              <div className="text-lg font-bold mb-4 text-center">Time Schedule</div>
              <div className="grid grid-cols-2 md:grid-cols-3  gap-4">

                {
                  scheduleData && scheduleData.map((data, index) =>
                    <div
                      className={`p-2 border border-gray-300 cursor-pointer  hover:bg-green-400 transition duration-300 ${selectedTime === "10:00 AM - 10:40 AM" ? "bg-green-600 text-white" : ""
                        }`}
                      onClick={() => showBookingDetails(`${data.start_at} - ${data.end_at}`)}
                    >
                      {data.start_at} - {data.end_at}
                    </div>

                  )
                }

                {/* <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === " 10:40 AM - 11:20 AM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails(" 10:40 AM - 11:20 AM")}
                >
                  10:40 AM - 11:20 AM
                </div>
                <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === "11:20 AM - 12:00 PM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails("11:20 AM - 12:00 PM")}
                >
                  11:20 AM - 12:00 PM
                </div>
                <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === "12:00 PM - 12:40 PM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails("12:00 PM - 12:40 PM")}
                >
                  12:00 PM - 12:40 PM
                </div>
                <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === "12:40 PM - 1:20 PM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails("12:40 PM - 1:20 PM")}
                >
                  12:40 PM - 1:20 PM
                </div>
                <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === "1:20 PM - 2:00 PM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails("1:20 PM - 2:00 PM")}
                >
                  1:20 PM - 2:00 PM
                </div>
                <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === "2:00 PM - 2:40 PM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails("2:00 PM - 2:40 PM")}
                >
                  2:00 PM - 2:40 PM
                </div>
                <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === "2:40 PM - 3:20 PM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails("2:40 PM - 3:20 PM")}
                >
                  2:40 PM - 3:20 PM
                </div>
                <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === "3:20 PM - 4:00 PM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails("3:20 PM - 4:00 PM")}
                >
                  3:20 PM - 4:00 PM
                </div>
                <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === "4:00 PM - 4:40 PM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails("4:00 PM - 4:40 PM")}
                >
                  4:00 PM - 4:40 PM
                </div>
                <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === " 4:40 PM - 5:20 PM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails(" 4:40 PM - 5:20 PM")}
                >
                  4:40 PM - 5:20 PM
                </div>
                <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === "5:20 PM - 6:00 PM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails("5:20 PM - 6:00 PM")}
                >
                  5:20 PM - 6:00 PM
                </div>
                <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === "6:00 PM - 6:40 PM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails("6:00 PM - 6:40 PM")}
                >
                  6:00 PM - 6:40 PM
                </div>
                <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === " 6:40 PM - 7:20 PM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails(" 6:40 PM - 7:20 PM")}
                >
                  6:40 PM - 7:20 PM
                </div>
                <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === "7:20 PM - 8:00 PM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails("7:20 PM - 8:00 PM")}
                >
                  7:20 PM - 8:00 PM
                </div>
                <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === "8:00 PM - 8:40 PM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails("8:00 PM - 8:40 PM")}
                >
                  8:00 PM - 8:40 PM
                </div>
                <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === "8:40 PM - 9:20 PM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails("8:40 PM - 9:20 PM")}
                >
                  8:40 PM - 9:20 PM
                </div>
                <div
                  className={`p-2 border border-gray-300 cursor-pointer hover:bg-green-400 transition duration-300 ${
                    selectedTime === "9:20 PM - 10:00 PM" ? "bg-green-600 text-white"  : ""
                  }`}
                  onClick={() => showBookingDetails("9:20 PM - 10:00 PM")}
                >
                  9:20 PM - 10:00 PM
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div >
          <CarromBoardBooking />
        </div>
      </div>
    </div>
  );
};

export default TimeSchedule;
