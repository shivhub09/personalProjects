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

                    http://localhost:3000/admin/67406afc89e4fd843760e7f6/viewClients/client-detail/677bc7917315c1d0c04e167f/campaignDetailsPage/677ccace37687a9517a32006/viewForms/viewFormData/67862d9d26c3c9e75030c3a5
                    <Route path = "viewClients/client-detail/:clientId/campaignDetailsPage/:campaignId/viewForms/viewFormData/:formId" element={<AdminFormItems />} />


                    
                </Routes>
            </div>

        </>
    )
}

export default AdminPage
