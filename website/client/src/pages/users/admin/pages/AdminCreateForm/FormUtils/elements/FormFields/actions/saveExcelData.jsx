// actions/excelActions.js
export const saveExcelData = (id, title, type, data) => async (dispatch) => {
    try {
      const response = await fetch('/api/saveExcelData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, title, type, data }),
      });
  
      const savedData = await response.json();
  
      dispatch({
        type: 'SAVE_EXCEL_DATA',
        payload: { id, title, type, data },
      });
    } catch (error) {
      console.error('Error saving Excel data:', error);
    }
  };
  