import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import Social from './Social';
import Interests from './Interests';
import Bio from './Bio';
import About from './About';
import styles from '../../styles/profileInfo.module.css';
import Events from './Events';
import { getEvents } from '../../actions/event';

const Profile = ({ getProfileById, match, getEvents, profile: { profile, loading }, auth, event: {events} }) => {
    useEffect(() => {
        getProfileById(match.params.id);
        getEvents();
    }, [getProfileById, match.params.id, getEvents]);

    
    return ( loading || profile ? 
        (<div className = "container">
            <div className = "row">
            { profile === null || loading ? <Spinner></Spinner> :
                <Fragment>
                    <div className = "container">
                        <Link to = '/profiles'>
                            <button className = "btn btn-primary" style = {{marginRight: "10px", marginBottom: "10px"}}>
                                Natrag</button>
                        </Link>
                        {auth.isAuthenticated && auth.loading === false && 
                            auth.user._id === profile.user._id && 
                            (<Fragment>
                                <Link to = '/edit-profile'>
                                    <button className = "btn btn-light" style = {{marginRight: "10px", marginBottom: "10px"}}>Uredi profil</button>
                                </Link> 
                                <Link to="/edit-profile-picture" className="btn btn-light" style = {{marginBottom: "10px"}}>Uredi sliku profila</Link> 
                            </Fragment>)}
                    </div>
                    <div className = {`container ${styles.container}`}>
                        <div className = "row">
                            <About profile = { profile }></About>
                        </div>
                        <hr></hr>
                        <div className = "row">
                            <Social profile = { profile }></Social>
                        </div>
                        <div className = "row">
                            <Interests profile = { profile }></Interests>
                        </div>
                        <div className = "row">
                            <Bio profile = { profile }></Bio>
                        </div>
                        <div className="row">
                            <Events events = {events} profile = {profile}></Events>
                        </div>
                    </div>
                </Fragment>
            }</div>
        </div>
    ) : (<Spinner></Spinner>))
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getEvents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    event: state.event
})

export default connect(mapStateToProps, { getProfileById, getEvents })(Profile);