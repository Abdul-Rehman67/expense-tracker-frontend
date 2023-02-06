import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBalance, getUserData } from "../../store/actions/user";
const EditBalanceModal = ({ openModal, handleClose,data }) => {
  console.log(data);
  const dispatch = useDispatch();
  const updateBalance = useSelector((state) => state.updateBalanceDataReducer);
  let { loading } = updateBalance;
  const [disabled, setDisabled] = useState(null);
  const [formData, setFormData] = useState(data && data?.map((item) => ({ name: item.name, amount: item.amount })));

  const handleChange = (e, index) => {
    setFormData((prevState) => {
      const updated = [...prevState];
      updated[index] = { name: e.target.name, amount: e.target.value };
      return updated;
    });
  };
  
  
  
  const handleOk = () => {
    console.log(Object.keys(formData).length);

    console.log(formData);
    if (
      Object.keys(formData).some((key) => formData[key] === "") ||
      Object.keys(formData).length < 3
    ) {
      alert("all fields are required");
      return;
    }
    else {
      const convertedData = formData.map(item => ({...item, amount: parseInt(item.amount)}));

      dispatch(editBalance(convertedData))
        .then((response) => {
          console.log("response", response);
          if (response.data.success) {
            alert(response.data.message);
            dispatch(getUserData())
            handleClose()

          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
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

  

  return (
    <>
      <Modal
        title="Edit Balance"
        open={openModal}
        onOk={handleOk}
        onCancel={handleClose}
        okButtonProps={{
          style: { color: "#ffff", background: "#1D4ED8" },
          disabled: disabled,
        }}
        okText={!loading ? "Edit" : "Please wait..."}
      >
        {/* <label>Cash</label>
        <input
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="cash"
          placeholder={`Enter your cash amount `}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />

        <label>Savings</label>
        <input
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="savings"
          placeholder={`Enter your savings amount `}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />

        <label>Account</label>
        <input
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="account"
          placeholder={`Enter your account amount `}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        /> */}
       {data &&
      data.map((item, index) => (
        <div key={item.name}>
          <label>{item.name}</label>
          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name={item.name}
            placeholder={`Enter your ${item.name} amount`}
            onChange={(e) => handleChange(e, index)}
            onKeyPress={handleKeyPress}

            value={formData[index].amount}
            
          />
        </div>
      ))}
      </Modal>
    </>
  );
};
export default EditBalanceModal;
