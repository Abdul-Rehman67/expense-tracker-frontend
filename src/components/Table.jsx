import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTransaction,
  getTransaction,
} from "../store/actions/transactions";
import { getUserData } from "../store/actions/user";
import UpdateModal from "./modals/UpdateTransactionModal";
import query from "../utils/transactionformfields";

const Table = () => {
  const [isUpdateTransactionModalOpen, setIsUpdateTransactionModalOpen] =
    useState(false);
  const [transactionData, setTransactionData] = useState([]);

  const handleTransactionModalOpen = (data) => {
    setIsUpdateTransactionModalOpen(true);
    setTransactionData(data);
  };
  const handleDeleteTransaction = (item) => {
    dispatch(deleteTransaction({id:item._id})).then(()=>{
        dispatch(getTransaction(query))
    })
  };

  const handleModalClose = () => {
    setIsUpdateTransactionModalOpen(false);
  };
  const dispatch = useDispatch();
  const tableData = useSelector(
    (state) => state.getTransacion?.userInfo?.data.payload.transactions
  );
  console.log("tableData", tableData);
  let headers;
  if (tableData?.length > 0) {
    console.log("tableData", tableData);

    headers = Object.keys(
      tableData && tableData[0]?.transactionDetails[0]
    )?.filter((header) => header !== "userEmail" && header !== "id");
  }

  console.log("tableData", tableData);
  useEffect(() => {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let query;
    query = {
      date: {
        $gte: new Date(year, currentMonth, 1),
        $lt: new Date(year, currentMonth + 1, 1),
      },
    };
    dispatch(getTransaction(query))

  }, [dispatch]);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          {tableData?.length > 0 ? (
            <div className="h-[25rem] overflow-y-scroll ">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    {/* <th>ID</th> */}
                    {headers?.map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="text-md font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        {header.toUpperCase()}
                      </th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData?.map((item) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item._id}
                    </td> */}
                      {headers?.map((header) => (
                        <td
                          key={header}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {" "}
                          {item?.transactionDetails &&
                          item.transactionDetails.length > 0
                            ? item.transactionDetails[0][header]
                            : ""}
                        </td>
                        // <td key={header}>hi</td>
                      ))}
                      <td>
                        <div className="flex px-2 gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            onClick={() => handleTransactionModalOpen(item)}
                            class="w-6 h-6 cursor-pointer"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                          </svg>

                          {/* <button
                        >
                          up
                        </button> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6 cursor-pointer"
                            onClick={() => handleDeleteTransaction(item)}

                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <span className="flex justify-center items-center  font-bold">
              No transaction
            </span>
          )}
        </div>
      </div>
      <div>
        <UpdateModal
          openModal={isUpdateTransactionModalOpen}
          handleClose={handleModalClose}
          data={transactionData}
        />
      </div>
    </div>
  );
};

export default Table;
