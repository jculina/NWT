import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
// importamo connect jer ima puno akcija (add like, remove like, delete event)
import Slika from "../../images/preuzmi.png";
import { addLike, removeLike, deleteEvent } from "../../actions/event";
import styles from '../../styles/eventItem.module.css';

const EventItem = ({
  addLike,
  removeLike,
  deleteEvent,
  auth,
  event: { 
    _id, 
    text, 
    name, 
    user, 
    likes, 
    comments, 
    eventDate, 
    location,
    category,
    eventImg,
    profileImg,
    date,
    title
  }
}) => (
  <Fragment>
    <div className = {`${styles.cardRow} row m-auto`}>
      <div className="col-12 m-1">
        <div className={`card ${styles.card}`}> 
          <div className="card-header d-flex align-items-center" style = {{backgroundColor: "rgba(148, 148, 148, 0.05)"}}>
            <figure className="mb-0 mr-2" style={{maxWidth:"75px"}}>
              {profileImg ? (
                <img
                  src={profileImg}
                  alt=""
                  style={{ height: '75px', width: '75px' }}
                  className="mx-auto rounded-circle img-fluid"
                />
              ) : (
                <img
                  src={Slika}
                  alt=""
                  style={{ height: '75px', width: '75px' }}
                  className="mx-auto rounded-circle img-fluid"
                />
              )}
            </figure>
            <div>
              <Link to={`/profile/${user}`}><h5 className="mb-0">{name}</h5></Link>
              <p className="mb-0">Objavljeno: <Moment format="DD.MM.YYYY.">{date}</Moment></p>
            </div>
          </div>
          <div className="mb-0" style={{position:"relative"}}>
            {eventImg ? (<img className="card-img" alt= '' src={eventImg} style={{ height: '250px', width: '100%' }}/>) :
              (<img className="card-img" alt= '' src={profileImg} style={{ height: '250px', width: '100%' }}/>)}
          </div>
          <div className={`card-body ${styles.cardBody}`}>
            <Link to={`/events/${_id}`}><h4>{title ? (title) : ('Događaj')}</h4></Link>
            <p className="card-text">{text}</p>
            <hr></hr>
            <p>{category}</p>
            <p>Mjesto: {location}</p>
            <p>
              Datum: <Moment format="DD.MM.YYYY.">{eventDate ? (eventDate) : (date)}</Moment>
            </p>
          </div>
          <div className={`card-footer ${styles.footer}`} style = {{backgroundColor: "rgba(148, 148, 148, 0.05)"}}>
            <div>
              <button
                  onClick={() => addLike(_id)}
                  type="button"
                  className="btn btn-light"
                >
                  <i className="fas fa-thumbs-up"></i>
                  <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
              </button>
              <button
                  onClick={() => removeLike(_id)}
                  type="button"
                  className="btn btn-light"
                >
                <i className="fas fa-thumbs-down"></i>
              </button>
              <Link to={`/events/${_id}`} className="btn btn-primary">
                Komentari
                {comments.length > 0 && (
                  <span className="comment-count">{comments.length}</span>
                )}
              </Link>
            </div>
            <div>
              {!auth.loading && user === auth.user._id && (
              <button
                  onClick={() => deleteEvent(_id)}
                  type="button"
                  className="btn btn-danger"
                >
                <i className="fas fa-times" />
              </button>)}
            </div>
        </div>
      </div>
    </div>
    </div>
  </Fragment>
);

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

// auth state kako bi se delete button prikazao samo onom korisniku ciji je to event
export default connect(mapStateToProps, { addLike, removeLike, deleteEvent })(
  EventItem
);