import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';


import { appContext } from '../App';

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});


export default function MusicController() {
  const {isPlaying, setisPlaying, index, setIndex ,currenSong, playlist } =React.useContext(appContext)
    
  // playlist [Somnus,Hammerhead,Blues]

  const theme = useTheme();

  const [duration,setDuration] = React.useState(0)
  const [position, setPosition] = React.useState(0);


  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const audioPlayer = React.useRef()
  

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  

  React.useEffect(() => {
    if(isPlaying) {
        setInterval(() => {
            const _duration = Math.floor(audioPlayer?.current?.duration);
            const _position = Math.floor(audioPlayer?.current?.currentTime);
            setDuration(_duration);
            setPosition(_position);
        }, 100);
    }
  
  }, [isPlaying])
  
  const togglePlay = ()=>{
    if(!isPlaying) {
        audioPlayer.current.play()
    }else {
        audioPlayer.current.pause()
    }
    setisPlaying(prev => !prev)
  }

const skipToNextSong =()=>{
    if(index >= playlist.length-1){
        setIndex(0)
        audioPlayer.current.src =playlist[0]
        audioPlayer.current.play()
    }else {
        setIndex(prev => prev +1)
        audioPlayer.current.src=playlist[index+1]
        audioPlayer.current.play()
    }
}

const skipToPreviousSong =()=>{
    if(index > 0){
        setIndex(prev => prev -1)
        audioPlayer.current.src=playlist[index-1]
        audioPlayer.current.play()
    }else if( index === 0){
        setIndex(playlist.length-1)
        audioPlayer.current.src =playlist[playlist.length-1]
        audioPlayer.current.play()
    }

}

const changeRange =(e,value)=>{
    audioPlayer.current.currentTime = value
    setPosition(value)
}


  return (
    <Box>
        <audio src={currenSong} ref={audioPlayer} onEnded={skipToNextSong}/>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={changeRange}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -1,
          }}
        >
          <IconButton aria-label="previous song">
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} onClick={skipToPreviousSong}/>
          </IconButton>
          <IconButton
            aria-label={isPlaying ?   'pause':'play'}
            onClick={togglePlay}
          >
            {!isPlaying ? (
              <PlayArrowRounded
                sx={{ fontSize: '3rem' }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
            )}
          </IconButton>
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} onClick={skipToNextSong} />
          </IconButton>
        </Box>
        
    </Box>
  );
}
