import React from 'react'
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminViewClientsPage.css'
import ViewClientsContainer from '../../../../../components/ViewClientsContainer/ViewClientsContainer';
const AdminViewClientsPage = ({setActiveTab}) => {
  return (
    <div className="adminViewClientsPage-container">
            <PageTitle title="View Clients" />
            <ViewClientsContainer setActiveTab={setActiveTab}></ViewClientsContainer>
    </div>
  )
}

export default AdminViewClientsPage
