import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Slika from '../../images/preuzmi.png';
import styles from '../../styles/profileItem.module.css';

const ProfileItem = ({ 
    profile: {
        user: {_id, name, avatar },
        bio,
        location
}}) => {
    return (      
        <div className = "container">
            <div className = {`${styles.cardRow} row`}>
                <div className="col-8 m-3">
                    <div className={`card ${styles.card}`}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-lg-4 col-md-6 text-center">
                                    <img src={Slika} alt="" style = {{maxWidth: "200px"}} className="mx-auto rounded-circle img-fluid"/>
                                </div>
                                <div className={`col-12 col-lg-8 col-md-6 ${styles.info}`}>
                                    <h2 className="mt-2 mb-1 text-truncated">{name}</h2>
                                    <div>
                                        <i className={`fas fa-map-marker-alt ${styles.marker}`}></i>
                                        <p className="lead">{location}</p>
                                    </div>
                                    <p>{bio && <span>{bio}</span>}</p>
                                    <Link to = {`/profile/${_id}`}><button className = "btn btn-primary">Više</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
;
ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem;   