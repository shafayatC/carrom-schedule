import React, { useState } from "react";
import CarromBoardBooking from "../BookingPage/BookingPage";

const TimeSchedule = () => {
  const [selectedTime, setSelectedTime] = useState("");

  const showBookingDetails = (time) => {
    setSelectedTime(time);
  };

  // Function to check if a time slot is selected
  const isTimeSlotSelected = (time) => {
    return selectedTime === time;
  };

  return (
    <div className="bg-2">
      <div className="container mx-auto h-[100vh]">
        <div className="flex flex-col md:flex-row justify-items-center justify-center  items-center gap-6 md:gap-20 pt-5">
          <div className="flex flex-col justify-center  mt-10 ">
            <div className="p-4 bg-gray-200 rounded-md mb-2 w-full md:w-[570px]">
              <div className="p-2 bg-white border border-gray-300 rounded-md text-center">
                {selectedTime
                  ? `You have booked ${selectedTime}`
                  : "Please select a time slot to book."}
              </div>
            </div>

            <div className="w-full md:w-[570px]">
              <div className="p-4 bg-gray-200 rounded-md">
                <div className="text-lg font-bold mb-4 text-center">Time Schedule</div>
                <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
                  {["9:00 AM - 10:40 AM", "10:40 AM - 11:20 AM", "11:20 AM - 12:00 PM", "12:00 PM - 12:40 PM", "12:40 PM - 1:20 PM", "1:20 PM - 2:00 PM", "2:00 PM - 2:40 PM", "2:40 PM - 3:20 PM", "3:20 PM - 4:00 PM", "4:00 PM - 4:40 PM", "4:40 PM - 5:20 PM", "5:20 PM - 6:00 PM", "6:00 PM - 6:40 PM", "6:40 PM - 7:20 PM", "7:20 PM - 8:00 PM", "8:00 PM - 8:40 PM", "8:40 PM - 9:20 PM", "9:20 PM - 10:00 PM"].map((time) => (
                    <div
                      key={time}
                      className={`p-2 border border-gray-400 rounded-lg cursor-pointer hover:bg-green-400 transition duration-300 ${
                        isTimeSlotSelected(time) ? "bg-green-600 text-white" : ""
                      }`}
                      onClick={() => showBookingDetails(time)}
                      disabled={isTimeSlotSelected(time)}
                      style={{ opacity: isTimeSlotSelected(time) ? 0.5 : 1 }}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <CarromBoardBooking />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSchedule;
