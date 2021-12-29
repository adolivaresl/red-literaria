import {
  collection,
  addDoc,
  getFirestore,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../firebaseConfig";
import { getStorage } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

//import Post from "../vistas/Post.jsx";

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export const addPost = async (title, autor, pais, quote, image) => {
  const docRef = await addDoc(collection(db, "post"), {
    title: title,
    autor: autor,
    origen: pais,
    quote: quote,
    fecha: Timestamp.fromDate(new Date()),
    idPost: "",
    imageCover: "",
    userId: auth.currentUser.uid,
    userName: auth.currentUser.displayName,
  });

  if (!image) return;
  const storageRef = ref(storage, `/images/${image.name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(prog);
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
        // imageUrl= url;
        // console.log(1, imageUrl)
        const postRef = doc(db, "post", docRef.id);
        await updateDoc(postRef, {
          idPost: docRef.id,
          imageCover: url,
        });
      });
    }
  );
};
