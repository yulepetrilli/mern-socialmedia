import React from 'react';
import { HashRouter as Router } from "react-router-dom";
import Routes from './routes/Routes';

//Auths
import { AuthProvider } from './context/auth';

//Components
import { Container} from 'semantic-ui-react';
import Navbar from './components/Navbar';

//Styles
import 'semantic-ui-css/semantic.min.css';
import './App.css';


export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Container style={{margin: '5px'}}>
                    <Navbar />
                    <Routes />  
                </Container>
            </Router>
        </AuthProvider>
    )
}
