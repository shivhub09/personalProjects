import React from 'react';
import './AdminOverViewPage.css';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import OverViewTileOne from '../../../../../components/OverViewTile1/OverViewTileOne';
import OverViewTileTwo from '../../../../../components/OverViewTile2/OverViewTileTwo';
const AdminOverViewPage = ({setActiveTab}) => {
  return (
    <div className="admin-overview-container">
      <PageTitle title="Overview" />
      <OverViewTileOne />
      <OverViewTileTwo  setActiveTab= {setActiveTab}/>
    </div>
  );
}

export default AdminOverViewPage;