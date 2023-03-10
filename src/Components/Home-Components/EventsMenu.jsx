import { Button, Card, Typography } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";
import { Link } from "react-router-dom";
import './EventsMenu.css'

export default function EventsMenu() {
    return (

        window.location.href === `${process.env.REACT_APP_MY_FRONT_URL}/home` ? (
            <Card sx={{bgcolor:'custom.dark'}} id='ShowEventsMenu'>
            <div className="eventsMenu">
                <Typography sx={{fontFamily: 'Nunito', fontSize: '1vw',color:'primary.main'}} gutterBottom variant="h5" component="div">
                    - Events -
                </Typography>
            </div>
            <div className="buttons">
                <Link to={'/events'}><Button id='assistButton' sx={{minWidth:'10vw',maxWidth:'10vw', maxHeight:'3vw',minHeight:'3vw',bgcolor: 'secondary.main', color:grey[900], fontSize:'.8vw'}} variant="contained">
                    Show events
                </Button></Link>
            </div>
        </Card>
            ) : (
                <Card sx={{bgcolor:'custom.dark'}} id='ShowEventsMenu'>
                <div className="eventsMenu">
                    <Typography sx={{fontFamily: 'Nunito', fontSize: '1vw',color:'primary.main'}} gutterBottom variant="h5" component="div">
                        - Posts -
                    </Typography>
                </div>
                <div className="buttons">
                    <Link to={'/home'}><Button id='assistButton' sx={{minWidth:'10vw',maxWidth:'10vw', maxHeight:'3vw',minHeight:'3vw',bgcolor: 'secondary.main', color:grey[900], fontSize:'.8vw'}} variant="contained">
                        Show posts
                    </Button></Link>
                </div>
            </Card>
            ))}


    
