import React from 'react'
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useHistory} from 'react-router-dom'
import { BaseUrl } from './BaseUrl';
import axiosInstance from '../AuthComp/AxiosInstance';
const DeleteQ = (props) => {
    const [open, setOpen] = React.useState(props.show);
    
    const handleClose = () => setOpen(false);
    const history = useHistory();
    const deleteQues = () => {
        axiosInstance.delete(`${BaseUrl}delete-question/${props.id}`, {
            id : props.id
        }).then((res) => {alert("Deleted :-)"); setTimeout(() => history.push('/questions'), 1000)} )
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Question 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Are You Sure You Want to Delete this Note?
          </Typography>
          <hr/>
          <button className='btn btn-outline-danger' style={{"width" : "48%", "marginRight" : "4%"}} onClick={deleteQues}>Delete</button>
          <button className='btn btn-outline-primary' style={{"width" : "48%"}} onClick={() => window.location.reload()}>Cancel</button>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteQ
