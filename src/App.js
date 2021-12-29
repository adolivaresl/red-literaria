import Profile from './components/vistas/Profile';
import Post from './components/vistas/Post.jsx';
import Login from './components/vistas/Login.jsx';
import Register from './components/vistas/Register.jsx';
//import { readPost } from './components/firebase/firebase-firestore';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  
  //readPost();
  return (
    <Router>
       <div>
        <Routes>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/post" element={<Post/>}/>
          <Route exact path="/" element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
