import React, { useEffect } from 'react'
import CreateProject from './CreateProject'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getProject, setEditProject, setProject } from '../../redux/slices/projectSlice';

function EditProject() {
    const dispatch = useDispatch();
    const { projectId } = useParams();

    const { state } = useLocation();

    if (state) {
        dispatch(setEditProject(true));
        dispatch(setProject(state));
    }

    return (
        <CreateProject />
    )
}

export default EditProject