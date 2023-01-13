import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import{appContext} from "../App"


export default function Tracklist() {
const {songs, setisPlaying, index, setIndex, setcurrenSong, playlist} = React.useContext(appContext)
const handleTracklistBnt =(id)=>{
    if(index!==id){
        setisPlaying(false)
        setIndex(id)
        setcurrenSong(playlist[id])
    }
    
}
  return (
    <Box>
        <List>
            {songs.map(song=>
                <ListItem key={song.id} onClick={()=>handleTracklistBnt(song.id)} >
                    <ListItemButton>
                        {song.id===index?<PlayArrowRounded/>:""}
                    <ListItemText primary={song.name}/>
                </ListItemButton>
            </ListItem>
            )}
            
        </List>
    </Box>
  )
}
