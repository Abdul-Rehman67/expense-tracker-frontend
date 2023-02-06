import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransaction } from "../store/actions/transactions";

const ChartComponent = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
  });

  const transactionDetails = useSelector(
    (state) => state.getTransacion?.userInfo?.data.payload.transactions
  );
  console.log("transactionDetails", transactionDetails);

  const categories = {};
  if (transactionDetails?.length > 0) {

    transactionDetails.forEach(element => {
      element.transactionDetails.forEach(transaction => {
        if (categories[transaction.category]) {
          categories[transaction.category] += transaction.amount;
        } else {
          categories[transaction.category] = transaction.amount;
        }
      });
    });
    
  }
  console.log("categories",categories)
  const amounts = Object.values(categories);
const xaxisCategories = Object.keys(categories);
  useEffect(()=>{
    console.log("use effect chala chart la")
  if (transactionDetails?.length) {
   
    setData({
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories:xaxisCategories.length? [...new Set(xaxisCategories)]:[]
        },
      },
      series: [
        {
          name: "series-1",
          data: amounts.length?amounts:[],
        },
      ],
    });
  }
}, [transactionDetails]);
  
  console.log("categories,amounts", categories, amounts);
  return (
    <div className="mixed-chart ">
      {transactionDetails?.length?<Chart
        options={data.options}
        series={data.series}
        type="bar"
        width="330"
      />:<span className="flex justify-center items-center  font-bold">
      No transaction
    </span>}
    </div>
  );
};

export default ChartComponent;
