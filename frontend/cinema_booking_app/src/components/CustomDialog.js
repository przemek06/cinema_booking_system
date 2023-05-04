import React from 'react';
import Dialog from '@mui/material/Dialog';

const CustomDialog = ({title, children, open}) => {

    return (
        <Dialog open = {open}>
            <div className="custom-dialog-div">
            <h3 className='text-3xl pb-2'>{title}</h3>
                {children}
            </div>
        </Dialog>
    )
}

export default CustomDialog