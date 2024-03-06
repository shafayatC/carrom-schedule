import React, { useEffect, useState } from "react";
import CarromBoardBooking from "../BookingPage/BookingPage";

const TimeSchedule = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [scheduleData, setScheduleData] = useState(null);
  const [getTableData, setTableData] = useState(null);

  const showBookingDetails = (data) => {
    setSelectedTime(`${data.start_at} - ${data.end_at}`);
    setTableData(data); 
  };

  useEffect(() => {
    fetch("http://localhost/wordpress/wp-json/carrom/v1/carrom-schedule-today")
      .then(res => res.json())
      .then(data => setScheduleData(data));
  }, []);

  return (
    <div>
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
                  {scheduleData &&
                    scheduleData.map((data, index) => (
                      <div
                        key={index}
                        className={`p-2 border border-gray-300 cursor-pointer  hover:bg-green-400 transition duration-300 ${
                          selectedTime === `${data.start_at} - ${data.end_at}` ? "bg-green-600 text-white" : ""
                        }`}
                        onClick={() => showBookingDetails(data)}
                      >
                        {`${data.start_at} - ${data.end_at}`}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <CarromBoardBooking  tableData={getTableData}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSchedule;
