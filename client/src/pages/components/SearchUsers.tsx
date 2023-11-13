import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {searchUsers} from '../api/loadUsers';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Modal from '@mui/material/Modal';
import { Cancel } from '@mui/icons-material';
import { List, ListItem, TextField,ListItemAvatar,Avatar,ListItemText } from '@mui/material';


const style = {
    position: 'absolute' as 'absolute',
    top: '18%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const buttonStyle = {
    position: 'absolute',
    right: '12px'
}
export default function SearchUsers() {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState('')
    const [list,setList]=React.useState<any>()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }
    React.useEffect(()=>{
        searchUsers(username).then((data)=>{
            console.log(list);
            
            setList(data)
        })
    },[username])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant='outlined' onClick={handleOpen}>Contacts +</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Button sx={buttonStyle} onClick={handleClose}><Cancel /></Button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Connect with other users
                    </Typography>
                    <TextField value={username} onChange={handleChange} label='Username' />
                    {
                        list?.map((elem : any,key:number)=>{
                            return (<List key={key} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <Image alt='dp' src={elem.profilePicture} width={50} height={50}/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={elem.username} secondary={elem.createdAt} />
                        </ListItem>
                    </List>)
                        })
                    }
                </Box>
            </Modal>
        </div>
    );
}