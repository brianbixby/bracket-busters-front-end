import superagent from 'superagent';

export const userPickCreate = userPick => ({
  type: 'USER_PICK_CREATE',
  payload: userPick,
});

export const userPickUpdate = userPick => ({
  type: 'USER_PICK_UPDATE',
  payload: userPick,
});

export const userPicksFetch = userPick => ({
  type: 'USER_PICKS_FETCH',
  payload: userPick,
});

// ASYNC
export const userPickCreateRequest = userPick => (dispatch, getState) => {
  let { userAuth } = getState();

  return superagent.post(`${__API_URL__}/api/league/${userPick.leagueID}/userpick`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(userPick)
    .then( res => {
      console.log('userpick res.body: ', res.body);
      dispatch(userPickCreate(res.body));
      return res.body;
    });
};

export const userPickUpdateRequest = userPick => (dispatch, getState) => {
  let { userAuth } = getState();
  
  return superagent.put(`${__API_URL__}/api/userpick/${userPick._id}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(userPick)
    .then( res => {
      console.log('userpick res.body: ', res.body);
      dispatch(userPickUpdate(res.body));
      return res.body;
    });
};

export const userPicksFetchRequest = leagueID  => (dispatch, getState) => {
  let { userAuth } = getState();

  return superagent.get(`${__API_URL__}/api/userpicks/${leagueID}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      console.log('userpick res.body: ', res.body);
      dispatch(userPicksFetch(res.body));
      return res.body;
    });
};