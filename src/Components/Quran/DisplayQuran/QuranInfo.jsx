import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Box, Typography, IconButton } from "@mui/material";
import { Paper, Drawer, Button } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Stack, Divider } from "@mui/material";
import { Grow } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import LinearProgress from "@mui/material/LinearProgress";

function QuranInfo({ quraninfo, quraninf, onChange, Ayahs, val }) {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handlePlayPause = () => {
    setPlaying(!playing);
  };
  const handleProgress = (progress) => {
    setPlayed(progress.played);
  };

  return (
    <Box position="sticky" sx={{ mb: 3 }}>
      <Paper
        sx={{
          color: "white",
          backgroundColor: "black",
          borderBottom: 1,
          borderColor: "white",
        }}
      >
        <Button
          sx={{
            color: "white",
            mb: 3,
            fontSize: { xs: "1rem", md: "1.3rem" },
            borderColor: "white",
          }}
          onClick={toggleDrawer(true)}
          variant="outlined"
        >
          Choose Surahs
        </Button>

        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Box
            sx={{
              width: "100%",
              typography: "body1",
              bgcolor: "black",
            }}
          >
            <Box
              sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "black" }}
            >
              <List>
                {quraninf.map((text, index) => (
                  <ListItem key={index} disablePadding>
                    <Grow in={true} timeout={1000}>
                      <Paper
                        elevation={20}
                        sx={{
                          p: 1,
                          width: 250,
                          bgcolor: "black",
                          color: "white",
                        }}
                      >
                        <ListItemButton onClick={() => onChange(index)}>
                          <ListItemText
                            primary={
                              <Typography variant="h6">
                                {text.number}
                              </Typography>
                            }
                          />
                          <ListItemText
                            primary={
                              <Typography variant="h5">
                                {text.englishName}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="h5">{text.name}</Typography>
                            }
                          />
                        </ListItemButton>
                      </Paper>
                    </Grow>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Drawer>
        <Grow in={true} timeout={2000}>
          <Typography align="center" variant="h2">
            {quraninfo.name}
          </Typography>
        </Grow>
        <Grow in={true} timeout={2000}>
          <Typography align="center" variant="h4">
            {quraninfo.englishName}
          </Typography>
        </Grow>
        <Divider />
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            p: 3,
            gap: { xs: 5, sm: 30, md: 30, xl: 36, lg: 37 },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Ayahs:
            <Divider sx={{ display: { xs: "flex", md: "none" } }} />
            {Ayahs}
          </Typography>
          <Typography sx={{ pl: { xs: 15, md: 60 } }} gutterBottom variant="h6">
            Revelation Place:
            <Divider sx={{ display: { xs: "flex", md: "none" } }} />
            {quraninfo.revelationType}
            <Divider sx={{ display: { xs: "flex", md: "none" } }} />
            <Typography
              gutterBottom
              variant="h6"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              English Translation:
              <Divider sx={{ display: { xs: "flex", md: "none" } }} />
              {quraninfo.englishNameTranslation}
            </Typography>
          </Typography>
        </Stack>
      </Paper>
      <Box
        sx={{
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <ReactPlayer
          url={`https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${
            val + 1
          }.mp3`}
          playing={playing}
          onProgress={handleProgress}
          width="0"
          onEnded={() => setPlaying(!playing)}
          height="0"
        />
        <IconButton size="large" color="primary" onClick={handlePlayPause}>
          {playing ? (
            <PauseIcon sx={{ fontSize: "3rem", color: "white" }} />
          ) : (
            <PlayArrowIcon sx={{ fontSize: "3rem", color: "white" }} />
          )}
        </IconButton>
        {/* <Slider
          value={played * 100}
          onChange={(event, newValue) => setPlayed(newValue / 100)}
        /> */}
        <LinearProgress
          color="secondary"
          onChange={(event, newValue) => setPlayed(newValue / 100)}
          variant="determinate"
          value={played * 100}
        />
      </Box>
    </Box>
  );
}

export default QuranInfo;
