import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { connect, useSelector } from "react-redux";
import DraggableItem from "./DraggableItem";
import "./DropArea.css";
import axios from "axios";
import { setFullNameData } from "./FormFields/actions/fullNameActions";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { RESET_FULL_NAME_DATA } from "./FormFields/actions/types";
const DropArea = ({ onDrop, setFullNameData }) => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [droppedItemNames, setDroppedItemNames] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formId, setFormId] = useState("");
  const [nested, setNested] = useState(false);
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch({ type: RESET_FULL_NAME_DATA });
  };


  const { formId: mainParentForm } = useParams();

  const fullNameDataList = useSelector(
    (state) => state.fullName.fullNameDataList
  );

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "item",
    drop: (item) => {
      onDrop(item);
      setDroppedItems((prevItems) => [...prevItems, item]);
      setDroppedItemNames((prevNames) => [...prevNames, item.text]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  useEffect(() => {
    const uri = window.location.pathname;
    if (uri.includes("createNestedForm")) {
      setNested(true);
    }
  }, []);

  if (nested) {
    console.log("this nest");

  }

  const handleBlur = (event) => {
    if (event.target.value.trim()) {
      const id = uuidv4(); // Generate a unique ID
      setFullNameData(id, event.target.value, "Form Title", null);
    }
  };

  const handleDelete = (id) => {
    setDroppedItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setDroppedItemNames((prevNames) =>
      prevNames.filter((name, index) => droppedItems[index].id !== id)
    );
  };

  function arrayToFormFields(array) {
    return array.map((item, index) => ({ id: index + 1, value: item }));
  }

  const handleSubmitForm = async () => {
    try {
      const formFieldsArray = arrayToFormFields(droppedItemNames);
      let response;
      if (!nested) {
        const formData = {
          campaignId,
          formFields: fullNameDataList,
        };

        console.log(
          "Full Name JSON from store:",
          JSON.stringify(fullNameDataList, null, 2)
        );

        response = await axios.post(
          "http://localhost:8000/api/v1/admin/createNewForm",
          formData
        );
      } else {

        const formData = {
          mainFormId: mainParentForm,
          formFields: fullNameDataList,
        };

        console.log(formData);


        response = await axios.post(
          "http://localhost:8000/api/v1/admin/createNestedForm",
          formData
        );
      }

      if (response.status === 200) {
        setSuccessMessage("Form submitted successfully!");
        setShowModal(true);
        setFormId(response.data.data._id); // Ensure you access the correct path in response
        handleReset();
      } else {
        console.error("Failed to submit form:", response.data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSuccessMessage("");
    navigate(`/admin/assignForm/${formId}`);
  };

  return (
    <div className="drop-area-container">
      <div className="drop-area" ref={dropRef}>
        <div className="drop-area-title">
          <input
            type="text"
            name="formTitle"
            className="formTitle"
            placeholder="Create Form Here"
            onBlur={handleBlur}
          />
          <input
            type="button"
            className="create-form-btn"
            value="Submit Form"
            onClick={handleSubmitForm}
          />
        </div>
        <div className="dropped-Item">
          {droppedItems.map((item, index) => (
            <DraggableItem
              key={index}
              id={item.id}
              text={item.text}
              dropped={true}
              onDelete={handleDelete}
              component={item.component}
            />
          ))}
        </div>
      </div>
      {showModal && (
        <Modal
          formId={formId}
          message={`Form Created Successfully.`}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  fullNameDataList: state.fullName.fullNameDataList,
});

const mapDispatchToProps = {
  setFullNameData
};

export default connect(mapStateToProps, mapDispatchToProps)(DropArea);