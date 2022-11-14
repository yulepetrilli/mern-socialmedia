import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/auth';

//Components
import { Menu } from 'semantic-ui-react'

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const { pathname } = useLocation();
    const path = pathname === '/' ? 'home' : pathname.substring(1);
    const [activeTab, setActiveTab] = useState(path);

    return(
        <>
            { user ? (
                 <Menu tabular color='purple' size='massive'>
                    <Menu.Item
                        name={user.username}
                        active
                        as={Link}
                        to="/"
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='sign out'
                            onClick={logout}
                        />
                    </Menu.Menu>
                </Menu>
            ) : (
                <Menu tabular color='purple' size='massive'>
                    <Menu.Item
                        name='home'
                        active={activeTab === 'home'}
                        onClick={() => setActiveTab('home')}
                        as={Link}
                        to="/"
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='sign in'
                            active={activeTab === 'signin'}
                            onClick={() => setActiveTab('signin')}
                            as={Link}
                            to='signin'
                        />
                        <Menu.Item
                            name='sign up'
                            active={activeTab === 'signup'}
                            onClick={() => setActiveTab('signup')}
                            as={Link}
                            to='signup'
                        />
                    </Menu.Menu>
                </Menu>
            )}
        
        </>
    )
};
