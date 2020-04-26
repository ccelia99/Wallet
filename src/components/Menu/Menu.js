import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SettingsIcon from '@material-ui/icons/Settings';

function Menu(props){
    return(
      <div className='menu'>
        <Link to="/"><div className="menu__nappi"><HomeIcon style={{ color: "#fff"}} /></div></Link>
        <Link to="/stats"><div className="menu__nappi"><ViewListIcon style={{ color: "#fff"}} /></div></Link>
        <Link to="/graph"><div className="menu__nappi"><TrendingUpIcon style={{ color: "#fff"}} /></div></Link>
        <Link to="/settings"><div className="menu__nappi"><SettingsIcon style={{ color: "#fff"}} /></div></Link>
  
      </div>
    )
  }
export default Menu;