import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction,getTransaction, updateTransaction } from "../../store/actions/transactions";
import { getUserData } from "../../store/actions/user";
import query from "../../utils/transactionformfields";
const UpdateModal = ({ openModal, handleClose, data }) => {
  console.log("data===", data);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [disabled, setDisabled] = useState(false);
  const userData = useSelector((state) => state.userDataReducer);
  const { loading, userInfo, error } = userData;
  let dataOfUser = userInfo?.data?.payload.data;
  

  const categoryOptions = [
    { name: "Cash", value: "cash" },
    { name: "Savings", value: "savings" },
    { name: "Account", value: "account" },
  ];
  useEffect(() => {
    console.log("use effcet chhala")
    if(openModal){


        setFormData({
            
          amount: data?.transactionDetails[0].amount,
          email: data?.transactionDetails[0].email,
          category: data?.transactionDetails[0].category,
          customCategory: data?.transactionDetails[0].customCategory,
          description: data?.transactionDetails[0].description          ,
          type: data?.transactionDetails[0].type,
        });
    }
  }, [openModal]);
  

  const handleOk = () => {
    console.log(formData);

    if (
      Object.keys(formData).some(
        (key) =>
          formData[key] === "" ||
          Object.keys(formData).length < (formData.category === "other" ? 6 : 5)
      )
    ) {
      alert("all fields are required");
    } else {
      let parsedData = {
        ...formData,
        amount: parseInt(formData.amount, 10),
      };
      if (
        parsedData.type === formData.type &&
        parsedData.amount >
          dataOfUser?.userHaveMoneyIn.find((e) => e.name === formData.type)
            .amount
      ) {
        alert("insufficient balance");
        return;
      }
      parsedData = { ...parsedData, ["id"]: data._id };

      dispatch(updateTransaction(parsedData)).then(()=>{
        dispatch(getTransaction(query))
        dispatch(getUserData())
        handleClose()
        
      })
    }
  };
  //for making text field to enter only number
  const handleKeyPress = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);

    if (!/^\d+$/.test(keyValue)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "category" && e.target.value === "other") {
      setShowCustomCategory(true);
      console.log("in if ");
    } else {
      setShowCustomCategory(false);
      console.log("in else");
    }
    if (e.target.name === "customCategory") {
      setShowCustomCategory(true);
      console.log("e.target.value",e.target.value)
      const lowerCaseValue = e.target.value?.toLowerCase();
      const matchingOption = dataOfUser?.userCategory.find(
        (option) =>
        console.log(option)
        // option.value.toLowerCase() === lowerCaseValue ||
        //   option.name.toLowerCase() === lowerCaseValue
      );
      console.log("matchingOption",matchingOption)
      if (matchingOption) {
        alert("This category already exists in the dropdown");
        setDisabled(true);
        return;
      } else {
        setDisabled(false);
      }
    }
  
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
    // setFormData(updatedValue);
  };
//   useEffect(() => {
//     if()
//     dispatch(getUserData());
//   }, [openModal]);

  return (
    <>
      <Modal
        title="Create Transaction"
        open={openModal}
        onOk={handleOk}
        onCancel={handleClose}
        okButtonProps={{
          style: { color: "#ffff", background: "#1D4ED8" },
          disabled: disabled,
        }}
        okText={!loading?"Create":"Please wait..."}
      >
        <input
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="amount"
          placeholder="Amount"
          pattern="[0-9]*"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={formData?.amount}
        />

       
        <input
          type="textarea"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData?.description}
        />
        <select
          name="type"
          onChange={handleChange}
          value={formData?.type}

          
          class="block border border-grey-light w-full p-3 rounded mb-4"
        >
          <option value="">Select Type</option>
          {dataOfUser?.userHaveMoneyIn.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <select
          name="category"
          onChange={handleChange}
          value={formData?.category==="other"?formData?.customCategory:formData?.category}

          class="block border border-grey-light w-full p-3 rounded mb-4"
        >
          <option value="">Select Category</option>
          {dataOfUser?.userCategory.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
          <option value="other">Other</option>
        </select>

        {showCustomCategory && (
          <input
            placeholder="Enter Category"
            type="text"
            name="customCategory"
            onChange={handleChange}
            defaultValue={currentData.category}
            class="block border border-grey-light w-full p-3 rounded mb-4"
          />
        )}
      </Modal>
    </>
  );
};
export default UpdateModal;
