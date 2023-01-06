import { getAuth } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { follows } from "../../../Redux/actions";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { IconButton } from "@mui/material";

export default function Follow({userFinded}){
    const dispatch = useDispatch()
    const userEmail = getAuth().currentUser.email;
    let token = getAuth().currentUser.accessToken

    const info = {
        emailFollowed: userFinded.email,
        emailFollow: userEmail
    }

    const handleFollow = (e)=>{
        e.preventDefault()
        dispatch(follows(info,token))
    }
    
    // console.log(userFinded)
    if(userFinded?.followeds?.some(u => u.email === userEmail)) {
        return(
            <IconButton id='buttonsPost' onClick={handleFollow}>
                <PersonRemoveIcon style={{color:'#7b0d0d'}}/>
            </IconButton>
        )
    }
    else {
        return(
            <IconButton id='buttonsPost' onClick={handleFollow}>
                <PersonAddAlt1Icon style={{color:'#ffd000'}}/>
            </IconButton>
        )
    }
}