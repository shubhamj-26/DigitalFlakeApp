import React, {useState}  from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Images from './Images/logo.png';
import { MDBIcon } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
function Navbar() {
    
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleLogoutConfirmation = () => {
        
        navigate('/Login', { replace: true });
    };

    return (
        <div className="navbar navbar-div">
          <div className="logo">
            
            <a href=""><img src={Images} className="navbar-logo" alt="Logo" style={{ width: '120px', height: '80px' }}/></a>
          </div>
          <div className="profile-icon">

            <FontAwesomeIcon className="user-icon" icon={faUser} onClick={() => setShowPopup(true)} />
          </div>

          {showPopup && (
                <div className="popup-overlay popup-div" >
                    <div className="popup">
                        <div className="popup-inner">
                            <div className="popup-header">
                                <h3>Log Out</h3>
                            </div>
                            <div className="popup-content">
                                <p>Are you sure you want to log out?</p>
                            </div>
                            <div className="popup-actions">
                                <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleLogoutConfirmation}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

        
      );
      
}

export default Navbar;
