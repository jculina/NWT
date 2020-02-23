import axios from "axios";
import { setAlert } from "./alert";
import { 
  GET_PROFILE, 
  PROFILE_ERROR, 
  CLEAR_PROFILE, 
  GET_PROFILES,
  GET_PROFILE_SUCCESS,
  GET_PROFILES_SUCCESS,
  UPDATE_PROFILE
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch({ type: GET_PROFILE_SUCCESS});

  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update profile
export const createProfile = (
  formData,
  // redirect ater submit form, pass in the history object
  //which has a method puhs that will redirect to a client side route
  history,
  //edit da znamo jed edit, update ili create profile
  edit = false
) => async dispatch => {
  try {
    // saljemo podatke pa treba config objekt
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    
    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    //ako editamo ne redirect, ako kreiramo redirect na dashboard
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Svi profili
export const getProfiles = () => async dispatch => {
  // Kad pogledamo neciji profil da ne ostane profil iz statea
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });

    dispatch({ type: GET_PROFILES_SUCCESS });

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch({ type: GET_PROFILE_SUCCESS});

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const uploadAvatar = (image, history) => async dispatch => {
  try {
   
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let imageJSON = {
      image
    }
    const res = await axios.post("/api/profile/avatar", imageJSON, config);
    
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Profilna slika ažurirana', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};