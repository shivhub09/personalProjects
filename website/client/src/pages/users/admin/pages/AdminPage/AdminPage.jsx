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
                    <Route path="viewClients/client-detail/:clientId/campaignDetailsPage/:campaignId/viewForms/viewFormData/:formId" element={<AdminFormItems />} />
{/* //http://localhost:3000/admin/67406afc89e4fd843760e7f6/viewClients/client-detail/id/campaignDetailsPage/675a9352d3d410bd8349b2da/viewForms/viewFormData/67600441d936ffd3766f3e27 */}

                    
                </Routes>
            </div>

        </>
    )
}

export default AdminPage
