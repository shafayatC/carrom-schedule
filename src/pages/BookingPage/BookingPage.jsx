import React, { useContext, useEffect, useState } from "react";
import { dataContextManager } from "../../App";
import Modal from "../Modal/Modal";

const CarromBoardBooking = ({ tableData, bookingCallBack, lockTable }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [myTableData, setMyTableData] = useState(null);
  const [
    getUserInfo,
    setUserInfo,
    getApiBasicUrl,
    scheduleTable,
    setscheduleTable,
  ] = useContext(dataContextManager);
  const [getBl, setBl] = useState(false);

  const [seats, setSeats] = useState({
    A1: { name: "Rhine", disabled: true },
    B1: { name: "", disabled: false },
    B2: { name: "Shafayat", disabled: true },
    A2: { name: "", disabled: false },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [getMsg, setMsg] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  useEffect(() => {
    const dataToUpdate =
      scheduleTable &&
      tableData &&
      scheduleTable.find((item) => item.id == tableData.id);
    console.log(dataToUpdate);
    setMyTableData((dt) => dataToUpdate);
  }, [scheduleTable, tableData]);

  const tableDataExits = (userName) => {
    let quotaCount = 0;
    if (
      myTableData.a1_userId === userName ||
      myTableData.a2_userId === userName ||
      myTableData.b1_userId === userName ||
      myTableData.b2_userId === userName
    ) {
      quotaCount++;
    }

    return quotaCount;
  };
  const countQuotaLimit = (userName) => {
    let quotaCount = 0;

    scheduleTable.forEach((slot) => {
      if (
        slot.a1_userId === userName ||
        slot.a2_userId === userName ||
        slot.b1_userId === userName ||
        slot.b2_userId === userName
      ) {
        quotaCount++;
      }
    });

    return quotaCount;
  };

  const bookSeat = (seat, name) => {
    const mySeat =
      seat == "A1"
        ? "a1_userId"
        : seat == "A2"
        ? "a2_userId"
        : seat == "B1"
        ? "b1_userId"
        : "b2_userId";
    const nameOfUser =
      getUserInfo && getUserInfo.username === name ? "" : getUserInfo.username;

    const userData = {
      id: tableData.id,
      user_id: getUserInfo && getUserInfo.username,
      username: nameOfUser,
      table_name: mySeat,
    };

    console.log(userData);
    const quotaLimit = countQuotaLimit(getUserInfo.username);
    const userLimit = getUserInfo && parseInt(getUserInfo.limit);
    const tableDataExists = tableDataExits(nameOfUser);
    console.log(tableDataExists);


    const fetchData = () => {
      fetch(`${getApiBasicUrl}/carrom-schedule-update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          // Handle the result
          console.log(data.status_code);

          if (data.status_code == 200) {
            setBl(!getBl);
            bookingCallBack(getBl);
            updateData(tableData.id, mySeat, nameOfUser);

          } else {
            setMsg(data.message);
            openModal();
            // alert("table not added");
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    };

    if (nameOfUser.length == 0) {
      fetchData();
    } else if (quotaLimit > userLimit - 1) {
      // alert("You can not book more than 2 slots today");
      openModal();
      setMsg("Daily Limit Reached : Retry Tomorrow");
      return;
    } else {
      tableDataExists == 0 && fetchData();
    }
  };

  const updateData = (id, seat, name) => {
    // Find the index of the object with id equal to "2"
    const indexToUpdate = scheduleTable.findIndex((item) => item.id === id);

    // If the index is found
    if (indexToUpdate !== -1) {
      // Create a copy of the array
      const updatedData = [...scheduleTable];

      // Update the object properties
      updatedData[indexToUpdate][`${seat}`] = name;
      
      if (seat == "a1_userId") {
        updatedData[indexToUpdate]["a1_user_full_name"] = getUserInfo.user_full_name;
      }else if (seat == "a2_userId") {
        updatedData[indexToUpdate]["a1_user_full_name"] = getUserInfo.user_full_name;
      }else if (seat == "b1_userId") {
        updatedData[indexToUpdate]["b1_user_full_name"] = getUserInfo.user_full_name;
      }else if (seat == "b2_userId") {
        updatedData[indexToUpdate]["b2_user_full_name"] = getUserInfo.user_full_name;
      }

      updatedData[indexToUpdate][`${seat}`] = name;

      // Update the state with the modified array
      setscheduleTable(updatedData);
    } else {
      console.log("Object with id '2' not found");
    }
  };

  return (
    <div className="flex flex-col justify-center mt-10">
      {console.log(myTableData)}
      {console.log(scheduleTable)}
      {/* <div className=" bg-gray-200 rounded-md p-4 w-full md:w-[435px]">
        <div className="text-lg font-bold mb-2 text-center ">Booking Details</div>
        <div className="p-2 bg-white border text-center border-gray-300 rounded-md">
          {selectedSeats.length === 2
            ? `You have booked ${selectedSeats.join(", ")}`
            : "Please select two seats to book."}
        </div>
      </div> */}

      <div className="p-4 bg-gray-200 mt-2 rounded-md">
        <div className="flex justify-center">
          <div className="grid grid-cols-3 grid-rows-3 gap-4 mt-5">
            <div className="col-start-2 row-start-1 rounded-2xl">
              <Seat
                getUserInfo={getUserInfo}
                seat="A1"
                name={myTableData && myTableData.a1_userId}
                fullname={myTableData && myTableData.a1_user_full_name}
                disabled={myTableData && myTableData.a1_userId.length > 0}
                bookSeat={bookSeat}
                lockTable={lockTable}
              />
            </div>
            <div className="col-start-1 row-start-2">
              <Seat
                getUserInfo={getUserInfo}
                seat="B1"
                name={myTableData && myTableData.b1_userId}
                fullname={myTableData && myTableData.b1_user_full_name}
                disabled={myTableData && myTableData.b1_userId.length > 0}
                bookSeat={bookSeat}
                lockTable={lockTable}
              />
            </div>
            <div className="col-start-3 row-start-2">
              <Seat
                getUserInfo={getUserInfo}
                seat="B2"
                name={myTableData && myTableData.b2_userId}
                fullname={myTableData && myTableData.b2_user_full_name}
                disabled={myTableData && myTableData.b2_userId.length > 0}
                bookSeat={bookSeat}
                lockTable={lockTable}
              />
            </div>
            <div className="col-start-2 row-start-3">
              <Seat
                getUserInfo={getUserInfo}
                seat="A2"
                name={myTableData && myTableData.a2_userId}
                fullname={myTableData && myTableData.a2_user_full_name}
                disabled={myTableData && myTableData.a2_userId.length > 0}
                bookSeat={bookSeat}
                lockTable={lockTable}
              />
            </div>
            <div className="col-start-2 row-start-2 flex -mt-10 items-center justify-center">
              <img
                src="/images/carrom-board.webp"
                alt="Image"
                className="w-32 h-32"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center bg-white p-2 rounded-lg">
          <h1>Playtime : {myTableData && myTableData.start_at} - {myTableData && myTableData.end_at}</h1>
        </div>

      </div>
      <Modal isOpen={isOpen} onClose={closeModal} message={getMsg} />
    </div>
  );
};

const Seat = ({ seat, name, disabled, bookSeat, getUserInfo, fullname, lockTable }) =>


  getUserInfo && getUserInfo.username === name ? (
    
    <div
      className={`p-2 border border-gray-400  text-center cursor-pointer ${
        disabled
          ? "bg-gray-500 text-white rounded-3xl"
          : "hover:bg-green-600 transition duration-300"
      }`}
      onClick={() => lockTable && bookSeat(seat, name)}
    >
      {seat}
      {disabled && <div className="text-xs">{fullname}</div>}
    </div>
  ) : (
    <div
      className={`p-2 border border-gray-400 bg-[#ACCFCB] rounded-3xl text-center cursor-pointer ${
        disabled
          ? "bg-gray-400 text-gray-600 "
          : "hover:bg-green-600 hover:text-white transition duration-300"
      }`}
      onClick={() => lockTable && !disabled && bookSeat(seat, name)}
    >
      {seat}
      {disabled && <div className="text-xs">{fullname}</div>}
    </div>
  );
    
    
export default CarromBoardBooking;
