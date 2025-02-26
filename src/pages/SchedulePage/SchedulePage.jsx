import React, { useContext, useEffect, useState } from "react";
import CarromBoardBooking from "../BookingPage/BookingPage";
import { dataContextManager } from "../../App";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

const TimeSchedule = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [lockTable, setLockTable] = useState(false);
  const [getTableData, setTableData] = useState(null);
  const [refreshBool, setRefreshBool] = useState(false);
  const [getUserInfo, setUserInfo, getApiBasicUrl, scheduleTable, setscheduleTable] = useContext(dataContextManager);
  const [isOpen, setIsOpen] = useState(false);
  const [getMsg, setMsg] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  const showBookingDetails = (data) => {

    console.log(data);
    let getServerTime = '';

    fetch(`${getApiBasicUrl}/carrom-current-time`)
      .then(res => res.json())
      .then(dataResult => {

        // console.log("current time : "+ dataResult  + " end time: " + data.end_at)

        const compareTime = compareTimes(dataResult, data.end_at);

        setLockTable(compareTime);
        setSelectedTime(`${data.start_at} - ${data.end_at}`);
        setTableData(data);

        if (!compareTime) {
          setMsg("Previous Time-Locked");
          openModal();
        }
        console.log(compareTime);
      })

    const compareTimes = (currentTime, scheduleTime) => {
      { console.log(currentTime + ' ' + scheduleTime) }

      const currentDate = new Date();

      let scheduleDateTime = new Date(currentDate.toDateString() + " " + scheduleTime);
      let currentDateTime = new Date(currentDate.toDateString() + " " + currentTime);

      console.log(scheduleDateTime);
      return scheduleDateTime >= currentDateTime;
    }


  };
  const bookingCallBack = (bl) => {
    console.log(bl)
    setRefreshBool(bl);
  }

  useEffect(() => {
    fetch(`${getApiBasicUrl}/carrom-schedule-today`)
      .then(res => res.json())
      .then(data => {
        const dataSort = data.sort((a, b) => {
          return parseInt(a.sch_time_range) - parseInt(b.sch_time_range);
        });
        console.log(data); setscheduleTable(dt => dataSort)

      });
  }, [refreshBool]);


  const navigate = useNavigate();
  const logoutFunc = () => {
    setUserInfo(null);
    navigate("/");
  }

  return (


    <>
      <div className="bg-2">

        {
          // console.log(scheduleTable)
        }
        <div className="container mx-auto h-[100vh] relative">
          <div className="flex flex-col md:flex-row justify-items-center justify-center  items-center gap-6 md:gap-20 pt-5">
            <div className="flex flex-col justify-center  mt-10 ">
              <div className="p-4 bg-gray-100 rounded-md mb-2 w-full ">
                <div className="p-2 bg-white border border-gray-300 rounded-md text-center">
                  {/* {selectedTime */}
                  {/* ? `You have booked ${selectedTime}` */}
                  <h1>Carrom Booking : Choose Your Playtime</h1>
                </div>
              </div>

              <div className="w-full ">
                <div className="p-4 bg-gray-100 rounded-md">
                  <div className="text-lg font-bold mb-4 text-center uppercase">Time Schedule</div>
                  <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
                    {scheduleTable &&
                      scheduleTable.map((data, index) => (
                        <div
                          key={index}
                          className={`p-2 border border-gray-300 cursor-pointer  hover:bg-green-400 transition duration-300 ${selectedTime === `${data.start_at} - ${data.end_at}` ? "bg-green-600 text-white" : ""
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
              <CarromBoardBooking tableData={getTableData} bookingCallBack={bookingCallBack} lockTable={lockTable} />
            </div>
          </div>

          <div className="absolute right-[-12px] top-1 md:top-4">
            <button onClick={logoutFunc} className="bg-red-600 text-white font-semibold px-6 py-2 rounded-md ">Logout</button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} message={getMsg} />

    </>
  );
};

export default TimeSchedule;
