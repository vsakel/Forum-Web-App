import {Link} from "react-router-dom";
import './NavigationBar.css';

function NavigationBar(props){
    return (

<ul className="topnav">
  <li className="topnavleft"><Link to="/">Home</Link></li>
  <li className="topnavleft"><Link to="/inbox">Inbox</Link></li>
  <li className="topnavleft"><Link to="/outbox">Outbox</Link></li>
  <li className="topnavright"><Link to="/register">Register</Link></li>
  <li className="topnavright"><Link to="/login" className="right">Login</Link></li>
</ul>
  
)
};

export default NavigationBar;