import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import './App.css';
import MusicController from './componenst/controller';
import Tracklist from './componenst/tracklist';

import Somnus from "./music/Somnus.mp3"
import Hammerhead from "./music/Hammerhead.mp3"
import Blues from "./music/Blues de Chocobo.mp3"

const WallPaper = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
  background: 'linear-gradient(rgb(0, 150, 200) 0%, rgb(255, 155, 79) 100%)',
  transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
  '&:before': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-50%',
    background:
      'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
  },
  '&:after': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    bottom: '-50%',
    left: '-30%',
    background:
      'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
    transform: 'rotate(30deg)',
  },
});

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

export const appContext =React.createContext()

function App() {
  const [songs] = React.useState([
    {
      id:0,
      name:"Somnus (Instrumental Version)",
      src:Somnus
    },
    {
      id:1,
      name:"Hammerhead",
      src:Hammerhead
    },
    {
      id:2,
      name:"Blues de Chocobo",
      src:Blues
    },
   ])
   const playlist =songs.map(song=>song.src)
   const [index, setIndex] = React.useState(0)
   const [isPlaying, setisPlaying] = React.useState(false);
   const [toIndex,setToIndex] = React.useState()
   const [currenSong,setcurrenSong] = React.useState(playlist[index])
  
  return (
<appContext.Provider value={{songs, isPlaying, setisPlaying, index, setIndex, toIndex, setToIndex, currenSong, setcurrenSong ,playlist }}>
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Widget>
        <Tracklist/>
        <MusicController/>
      </Widget>
      <WallPaper />
    </Box>
  </appContext.Provider>
  );
}

export default App;
