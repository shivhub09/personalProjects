import React from 'react'
import AdminLandingPage from '../AdminLandingPage/AdminLandingPage'
import { Routes, Route } from 'react-router-dom';
import AdminOverViewPage from '../AdminOverViewPage/AdminOverViewPage';
import './AdminPage.css'
import AdminCreateNewClient from '../AdminCreateNewClient/AdminCreateNewClient';
import AdminViewClientsPage from '../AdminViewClientsPage/AdminViewClientsPage';
import AdminCreateNewUser from '../AdminCreateNewUser/AdminCreateNewUser';
import AdminViewAttendance from '../AdminViewAttendance/AdminViewAttendance';
import AdminProfilePage from '../AdminProfilePage/AdminProfilePage';
import AdminViewCampaignsPage from '../AdminViewCampaignsPage/AdminViewCampaignsPage';
import AdminCampaignDetailsPage from '../AdminCampaignDetailsPage/AdminCampaignDetailsPage.jsx';
import AdminCreateNewCampaign from '../AdminCreateNewCampaign/AdminCreateNewCampaign.jsx';
import AdminFormDetails from '../AdminFormDetails/AdminFormDetails.jsx';
import AdminFormViewData from '../AdminFormViewData/AdminFormViewData.jsx';
import AdminListOfForms from '../AdminListOfForms/AdminListOfForms.jsx';
import FormBox from '../../../../../components/FormBox/FormBox.jsx';
import AdminFormItems from '../AdminFormItems/AdminFormItems.jsx';
import AdminNestedViewData from '../AdminNestedViewData/AdminNestedViewData.jsx'; 

const AdminPage = () => {
    return (
        <>
            <div className="vertical-navbar">
                <AdminLandingPage></AdminLandingPage>
            </div>
            <div className="admin-page-content">
            <Routes>
                    <Route path="" element={<AdminOverViewPage />} />
                    <Route path="newClient" element={<AdminCreateNewClient />} />
                    <Route path="viewClients" element={<AdminViewClientsPage />} />
                    <Route path="newUser" element={<AdminCreateNewUser />} />
                    <Route path="promoterAttendance" element={<AdminViewAttendance />} />
                    <Route path="profile" element={<AdminProfilePage />} />
                    <Route path="campaignDetailsPage/:campaignId" element={<AdminCampaignDetailsPage />} />
                    <Route path="viewClients/client-detail/:clientId" element={<AdminViewCampaignsPage />} />
                    <Route path="viewClients/client-detail/:clientId/AdminCreateNewCampaign" element={<AdminCreateNewCampaign />} />
                    <Route path="viewClients/client-detail/:clientId/campaignDetailsPage/:campaignId" element={< AdminCampaignDetailsPage/>} />
                    <Route path="viewClients/client-detail/:clientId/campaignDetailsPage/:campaignId/viewForms" element={<AdminFormDetails />} />
                    <Route path = "viewClients/client-detail/:clientId/campaignDetailsPage/:campaignId/viewForms/viewFormData/:formId" element={<AdminFormItems />} />
                    <Route path = "viewClients/client-detail/:clientId/campaignDetailsPage/:campaignId/viewForms/viewFormData/:formId/viewNestedFormData" element={<AdminNestedViewData />} />  
                </Routes>
            </div>

        </>
    )
}

export default AdminPage
