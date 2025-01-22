import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminFormItems.css'
import FormDetailsBox from '../../../../../components/FormDetailsBox/FormDetailsBox'; import { useParams } from 'react-router-dom';
;
const AdminFormItems = ({ setActiveTab }) => {

    const { formId } = useParams();

    return (
        <div className="form-items">
            <PageTitle title="Form Items"></PageTitle>
            <div className="form-items-container">
                <div className="row">
                    <FormDetailsBox
                        imgSrc="https://cdn-icons-png.flaticon.com/512/3329/3329465.png"
                        title="Nested Form"
                        formId={formId}
                        url="createNestedForm"
                    />
                    <FormDetailsBox
                        imgSrc="https://cdn-icons-png.flaticon.com/512/993/993762.png"
                        title="VIEW DATA"
                        formId={formId}
                        url="viewFormData"
                        setActiveTab={setActiveTab}
                    />
                    <FormDetailsBox
                        imgSrc="https://cdn-icons-png.flaticon.com/512/58/58679.png"
                        title="ACCEPTED DATA"
                        formId={formId}
                        url="acceptData"
                        setActiveTab={setActiveTab}

                    />
                </div>
                <div className="row">
                    <FormDetailsBox
                        imgSrc="https://cdn-icons-png.flaticon.com/512/7134/7134152.png"
                        title="REJECTED DATA"
                        formId={formId}
                        url="rejectData"
                        setActiveTab={setActiveTab}

                    />

                    <FormDetailsBox
                        imgSrc="https://cdn-icons-png.flaticon.com/512/9942/9942497.png"
                        title="VIEW PROMOTERS"
                        formId={formId}
                        url="viewPromoters"
                        setActiveTab={setActiveTab}

                    />
                    <FormDetailsBox
                        imgSrc="https://cdn-icons-png.flaticon.com/512/993/993762.png"
                        title="VIEW NESTED FORM DATA"
                        formId={formId}
                        url="viewNestedFormData"
                        setActiveTab={setActiveTab}
                    />
                </div>
            </div>
        </div>
    );
}


export default AdminFormItems;
