import { React, useState } from "react";
import Cards from "../components/Cards";
import Table from "../components/Table";
import ChartComponent from "../components/Chart";
import ModalComponent from "../components/modals/CreateTransactionModal";
import EditBalanceModal from "../components/modals/EditBalanceModal";
import { getUserData } from "../store/actions/user";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { getTransaction } from "../store/actions/transactions";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isBalanceOpen, setIsBalanceOpen] = useState(false);
  const [lastMonth, setLastMonth] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(false);
  const [data, setData] = useState({});
  const userData = useSelector((state) => state.userDataReducer);
  console.log(userData);
  // const memoizedValue = useMemo(
  //   () => {
  //    dispatch(getUserData())
  //    dispatch(getTransaction())
  //   },
  //   []
  // );

  const { loading, userInfo, error } = userData;
  let dataOfUser = userInfo?.data?.payload.data;

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  useEffect(() => {
    const isAmountZero = dataOfUser?.userHaveMoneyIn.every(
      (item) => item.amount === 0
    );
    console.log(isAmountZero);
    if (isAmountZero) {
      setIsBalanceOpen(true);
    }
  }, [dataOfUser]);
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleTransactionModalOpen = () => {
    setIsTransactionModalOpen(true);
  };
  const handleBalanceModalOpen = () => {
    setIsBalanceOpen(true);
  };
  const handleModalClose = () => {
    setIsTransactionModalOpen(false);
    setIsBalanceOpen(false);
  };
  const  handleGetTransactionCurrentMonth = () => {
    setCurrentMonth(true)

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
    dispatch(getTransaction(query)).then((res)=>{
      setCurrentMonth(false)
    })

  };
  const handleGetTransactionLastMonth = () => {
    setLastMonth(true)
    console.log("lastMonth")
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let query;
    query = {
      date: {
        $gte: new Date(year, currentMonth - 1, 1),
        $lt: new Date(year, currentMonth, 1),
      },
    };
    dispatch(getTransaction(query)).then((res)=>{
      setLastMonth(false)
    })

  };

  return (
    <>
      <div class="bg-gray-100 h-[100vh]">
        <div className="px-5">
          <div class="w-full bg-white rounded shadow-lg flex justify-end py-2 px-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 cursor-pointer"
              onClick={handleLogout}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </div>
        </div>
        <div>
          <div className="flex justify-between mt-5">
            <div>
              <h1 class="md:text-4xl text-xl font-normal leading-normal px-5">
                Expense Tracker
              </h1>
            </div>
            <div className="flex gap-1 mt-1 mr-[0.1px] sm:mr-5">
              <button
                type="button"
                onClick={handleTransactionModalOpen}
                class="bg-blue-500 rounded w-full md:text-md text-xs"
              >
                Create Transaction
              </button>
              <button
                type="button"
                onClick={handleBalanceModalOpen}
                class="bg-blue-500 rounded w-full md:text-md text-xs"
              >
                Edit Balance
              </button>
            </div>
          </div>
          {!loading ? (
            <div class="flex flex-wrap justify-between ">
              {dataOfUser && dataOfUser.userHaveMoneyIn
                ? dataOfUser.userHaveMoneyIn.map((item) => (
                    <Cards props={item} />
                  ))
                : ""}
            </div>
          ) : (
            <div className="flex justify-center">
              <Spin />
            </div>
          )}
          <h1 class="md:text-4xl text-xl mt-2 font-normal leading-normal  mb-2  px-5">
            All Transactions
          </h1>
          <div className="px-5 ">
            <button
              type="button"
              onClick={handleGetTransactionLastMonth}
              class="bg-blue-500 rounded  md:text-md text-xs px-5 py-3"
            >
              {!lastMonth?' Last Month':'Please wait...'}
            </button>
            <button
              type="button"
              onClick={handleGetTransactionCurrentMonth}
              class="bg-blue-500 rounded  md:text-md text-xs px-5 py-3 ml-2"
            >
              {!currentMonth?' Current Month':'Please wait...'}
            </button>
          </div>
          <div className="flex flex-col px-5  mt-5 md:flex-row gap-1 h-[500px]">
            <div className="w-full bg-white rounded shadow-lg">
              <Table />
            </div>
            <div className="bg-white rounded  shadow-lg justify-center w-[300px]">
              <ChartComponent />
            </div>
          </div>

          <div>
            <ModalComponent
              openModal={isTransactionModalOpen}
              handleClose={handleModalClose}
            />
          </div>

          {userInfo ? (
            <div>
              <EditBalanceModal
                openModal={isBalanceOpen}
                handleClose={handleModalClose}
                data={dataOfUser?.userHaveMoneyIn}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
