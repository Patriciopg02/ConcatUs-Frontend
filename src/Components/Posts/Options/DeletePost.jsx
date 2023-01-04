import { useState } from "react";
import {
  Modal,
  IconButton,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { useUserAuth } from "../../../context/UserAuthContext";
import { banPost } from "../../../Redux/actions";
import { red } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';


export default function DeletePost({payload}) {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  // console.log(payload);
  const {user} = useUserAuth();
  const token = user.accessToken;
  const dispatch = useDispatch()

  const opencloseModal = () => {
    setModal(!modal);
  };
  const opencloseModal2 = () => {
    setModal2(!modal2);
  };
    
    const handleSubmit = () => {
      let data = {
        idPost: payload.id,
        action: 'delete',
      }
      // console.log(data.token);
      dispatch(banPost(data,token))
      setModal(false);
      setModal2(true);
    }

  const body = (
    <Card
      className="commentsList"
      sx={{
        borderRadius: "1vw",
        bgcolor: 'custom.main',
        fontFamily: "Nunito",
        color: 'primary.light',
      }}
    >
      <CardContent>
        <div className="headerModal">
          <h2>Are you sure to delete the post?</h2>
          <IconButton
            id='closeIcon'
            sx={{ width: "2vw", height: "2vw", top: "1vw",
            bgcolor:'custom.light' }}
            onClick={() => opencloseModal()}
          >
            <CloseIcon sx={{pr:'.1vw'}}/>
          </IconButton>
        </div>
        <Button onClick={handleSubmit} variant="outlined" color="error">
            Delete
            <DeleteIcon fontSize="1vw" />
        </Button>
        <Button onClick={opencloseModal} variant="outlined">Back</Button>
    </CardContent>
  </Card>
  );

  const body2 = (
    <Card
    className="commentsList"
    sx={{
        bgcolor: 'custom.main',
        fontFamily: "Nunito",
        color: 'primary.light',
    }}
    >
    <CardContent>
        <div className="headerModal">
        <h2>Post deleted successfully</h2>
        <IconButton
            id='closeIcon'
            sx={{ width: "2vw", height: "2vw", top: "1vw",
            bgcolor:'custom.light' }}
            onClick={() => opencloseModal2()}s
        >
            <CloseIcon sx={{pr:'.1vw'}}/>
        </IconButton>
        </div>
    </CardContent>
    </Card>
);

  return (
    <div className="container">
      <Button sx={{color:red[800], fontSize:'.8vw'}} onClick={() => opencloseModal()}>
        Delete
      </Button>
      <Modal open={modal} onClose={opencloseModal}>
        {body}
      </Modal>
      <Modal open={modal2} onClose={opencloseModal2}>
        {body2}
      </Modal>
    </div>
  );
}