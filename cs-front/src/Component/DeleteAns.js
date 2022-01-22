import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useHistory} from 'react-router-dom'
import { BaseUrl } from './BaseUrl';
import axiosInstance from '../AuthComp/AxiosInstance';


const DeleteAns = (props) => {
    const [open, setOpen] = React.useState(props.show);
    
    const handleClose = () => setOpen(false);
    const history = useHistory();
    const deleteAn = () => {
        axiosInstance.delete(`${BaseUrl}delete-answer/${props.id}`, {
            id : props.id
        }).then((res) => {alert("Answered Deleted.."); setTimeout(() => history.push('/questions'), 2000)} )
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
              Delete Answer 
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             Are You Sure You Want to Delete this Answer?
            </Typography>
            <hr/>
            <button className='btn btn-outline-danger' style={{"width" : "50%"}} onClick={deleteAn}>Delete Answer</button>
            <button className='btn btn-outline-primary' style={{"width" : "50%"}} onClick={() => window.location.reload()}>Cancel</button>
          </Box>
        </Modal>
      </div>
    )
}

export default DeleteAns

