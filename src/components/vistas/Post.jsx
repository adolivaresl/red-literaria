import React, { useState, useEffect } from "react";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import Plus from "../../image/plus.png";
import { addPost } from "../firebase/firebase-firestore";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Container from "@mui/material/Container";
import { userOut } from "../firebase/firebase-auth.js";
import "../../style.css";
// import { DoorBackTwoTone } from "@mui/icons-material";
// import { deepCopy } from "@firebase/util";

function Post() {
  const [quote, setQuote] = useState("");
  const [title, setTitle] = useState("");
  const [pais, setPais] = useState("");
  const [autor, setAutor] = useState("");
  const [image, setImage] = useState("");
  const [posteos, setPosteos] = useState([]);

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const formPost = (e) => {
    e.preventDefault();
    if (!quote.trim() || !title.trim() || !pais.trim() || !autor.trim()) {
      console.log("Algún campo está vacío");
      return;
    }

    addPost(title, autor, pais, quote, image);
    setQuote("");
    setTitle("");
    setAutor("");
    setPais("");
    setImage("");
    setOpen(false);
  };

  const db = getFirestore(app);
  useEffect(
    () =>
      onSnapshot(collection(db, "post"), (snapshot) =>
        setPosteos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  const logout = () => {
    userOut();
  };
  console.log(posteos);
  return (
    <div className="">
      <Button onClick={() => openModal()}>
        <img src={Plus} alt="boton para agregar post" />
      </Button>
      <Button onClick={() => logout()} variant="outlined">
        Salir
      </Button>
      <Modal
        open={open}
        onClose={() => closeModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box component="form" noValidate onSubmit={formPost} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Título del libro"
                name="title"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="autor"
                label="Autor del libro"
                name="autor"
                autoFocus
                onChange={(e) => setAutor(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lugar"
                label="Lugar de la reseña"
                type="text"
                id="lugar"
                onChange={(e) => setPais(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="quote"
                label="Cita del libro"
                multiline
                rows={6}
                autoFocus
                onChange={(e) => setQuote(e.target.value)}
              />
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Añadir un post
              </Button>
            </Box>
          </Typography>
        </Box>
      </Modal>
      <Container id="container">
        {posteos.map((item) => (
          <Card
            key={item.idPost}
            sx={{ width: 345, minHeight: 490 }}
            className="cardPost"
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {item.userName == null
                    ? "A"
                    : item.userName.charAt(0).toUpperCase()}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={item.userName == null ? "Anonymous" : item.userName}
            />
            <CardMedia
              component="img"
              height="194"
              image={item.imageCover}
              alt="Cover Books"
            />
            <CardContent sx={{ height: 100 }}>
              <Typography variant="body2" color="text.secondary">
                {item.quote}
              </Typography>
            </CardContent>

            <Typography
              className="boldUser"
              sx={{
                fontSize: 14,
                fontWeight: 700,
                paddingLeft: 2,
                paddingTop: 2,
              }}
              color="text.secondary"
              gutterBottom
            >
              {item.title + " / " + item.autor}
            </Typography>

            <CardActions disableSpacing sx={{ alignSelf: "flex-end" }}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={() => handleExpandClick()}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>Me gusta</Typography>
                <Typography paragraph>me gusta este escritor</Typography>
                <Typography paragraph>esto no es un comentario</Typography>
                <Typography>Me gusta mucho este libro</Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </Container>
    </div>
  );
}
export default Post;