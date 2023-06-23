import './App.css';
import React from "react";
import Navbar from './components/navbar';
import Home from './components/home';
import About from './components/about';
import Login from './components/Login';
import Signup from './components/Signup';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/alert';
import { useState } from 'react';


function App() {
	const [alert, setAlert] = useState(null);
	const showalert = (message, type) => {
		console.log(message, type)
		setAlert({
			msg: message,
			type: type
		})
		setTimeout(() => {
			setAlert(null);
		}, 2000);
	}
	return (
		// everything defined in notesate will be passed to all the components wrapped inside NoteState
		<NoteState>
			<Router>
				<Navbar />
				<Alert alert={alert}  />
				<div className="container">
					<Routes>
						<Route exact path="/" element={<Home showalert={showalert}/>} />
						<Route exact path="/about" element={<About />} />
						<Route exact path="/login" element={<Login showalert={showalert} /> } />  
						<Route exact path="/signup" element={<Signup  showalert={showalert}/>} />
					</Routes>
				</div>
			</Router>
		</NoteState>
	);
}

export default App;
