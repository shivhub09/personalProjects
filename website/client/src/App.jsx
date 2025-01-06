import "./App.css";
import LoginPage from "./pages/globals/LoginPage/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLandingPage from "./pages/users/admin/pages/AdminLandingPage/AdminLandingPage";
import AdminCreateForms from  "./pages/users/admin/pages/AdminCreateForm/AdminCreateForms";
import MisLandingPage from "./pages/users/mis/MisLandingPage";
import AdminAssignCreatedForm from "./pages/users/admin/pages/AdminAssignCreatedForm/AdminAssignCreatedForm";
import AdminFormViewData from "./pages/users/admin/pages/AdminFormViewData/AdminFormViewData";
import AdminAcceptedData from "./pages/users/admin/pages/AdminAcceptedData/AdminAcceptedData";
import AdminRejectedData from "./pages/users/admin/pages/AdminRejectedData/AdminRejectedData";
import RequiredAuth from "./components/RequiredAuth/RequiredAuth";
import { useAuth } from "./context/AuthContext";
import AdminPage from './pages/users/admin/pages/AdminPage/AdminPage';


const App = () => {
  const { isAuthenticated, user, loading } = useAuth();


  // If loading or not authenticated, render the login page
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
            <LoginPage />       
        }
      />
      <Route
        path="/admin/:id/*"
        element={
            <AdminPage />
        }
      />


<Route
  path="/admin/createNewForm/:campaignId"
  element={
    <RequiredAuth>
      <AdminCreateForms />
    </RequiredAuth>
  }
/>

      <Route
        path="/admin/createNestedForm/:campaignId"
        element={<AdminCreateForms />}
      />
      <Route
        path="/admin/viewFormData/:formId"
        element={<AdminFormViewData />}
      />
      <Route
        path="/admin/assignForm/:formId"
        element={<AdminAssignCreatedForm />}
      />
      <Route path="/admin/acceptData/:formId" element={<AdminAcceptedData />} />
      <Route path="/admin/rejectData/:formId" element={<AdminRejectedData />} />
      <Route
        path="/admin/viewPromoters/:formId"
        element={<AdminAssignCreatedForm />}
      />
      <Route path="/mis" element={<MisLandingPage />} />
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes >
  );
};


export default App;

