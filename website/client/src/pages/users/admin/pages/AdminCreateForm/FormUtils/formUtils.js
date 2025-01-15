import { v4 as uuidv4 } from "uuid";

export const handleFieldBlur = (event, componentId, fieldType, dataList, setData) => {
  const inputValue = event.target.value.trim();

  if (inputValue) {
    const existingEntry = dataList.find((entry) => entry.uniqueId === componentId);

    if (existingEntry) {
      // Update the existing entry
      setData(existingEntry.uniqueId, inputValue, fieldType);
    } else {
      // Create a new entry
      setData(componentId, inputValue, fieldType);
    }
  }
};
