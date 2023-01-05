import {
  Button,
} from "@mui/material";

import { useDispatch} from "react-redux";
import { useUserAuth } from "../../../context/UserAuthContext";
import { favorite } from "../../../Redux/actions";


export default function Favorite({payload}) {
  const sessionUser = useUserAuth();
  const userP = JSON.parse(window.localStorage.getItem("user"))
  let token = sessionUser.user.accessToken;
  const dispatch = useDispatch()  
  const handleSubmit = (r) => {
      r.preventDefault()
        let data = {
            id: payload.id,
            email: sessionUser.user.email,
        }
        if(userP?.liked?.some((p) => p._id === payload.id)) {
          alert('We remove the post from favorites');
        }else {
          alert('Post added to favorites');
        }
        dispatch(favorite(data,token));
    }

  return (
    <div className="container">
      {
        userP?.liked?.some((p) => p._id === payload.id) ? 
        <Button sx={{color:'custom.dark', fontSize:12}} onClick={handleSubmit}>
          Remove favorite
        </Button> :

        <Button sx={{color:'custom.dark', fontSize:12}} onClick={handleSubmit}>
          Add favorite
        </Button>

      }
    </div>
  );
}