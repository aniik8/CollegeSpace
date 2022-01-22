import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axiosInstance from '../../AuthComp/AxiosInstance';
import { BaseUrl } from '../BaseUrl';
import { useHistory } from 'react-router-dom'

const DeleteN = (props) => {
    const [open, setOpen] = React.useState(props.del);
    
    const handleClose = () => setOpen(false);
    const history = useHistory();
    const deleteNote = () => {
        axiosInstance.delete(`${BaseUrl}delete-note${history.location.pathname}`, {
            id : props.id
        }).then((res) => {alert("Deleted"); history.push('/Notes')} )
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
            Delete Note 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Are You Sure You Want to Delete this Note?
          </Typography>
          <hr/>
          <button style={{"width" : "48%"}} className='btn btn-outline-danger' onClick={deleteNote}>Delete</button>
          <button style={{"width" : "48%", "marginLeft" : "4%"}} className='btn btn-outline-primary' onClick={() => window.location.reload()}>Cancel</button>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteN
