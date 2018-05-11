import React from 'react';
import { connect } from 'react-redux';
import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest } from '../../actions/userProfile-actions.js';
import { leaguesFetchRequest, leagueFetchRequest, leagueDeleteRequest, leagueUpdateRequest, topPublicLeaguesFetchRequest } from '../../actions/league-actions.js';
import { groupsFetchRequest, topPublicGroupsFetchRequest } from '../../actions/group-actions.js';
import { scoreBoardsFetchRequest, topScoresFetchRequest } from '../../actions/scoreboard-actions.js';
import { sportingEventsFetchRequest } from '../../actions/sportingEvent-actions.js';
import UserPickContainer from '../user-pick-container';
import MessageBoardContainer from '../message-board-container';
import Table from '../helpers/table';
import * as util from '../../lib/util.js';

class LeagueContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { maxHeight: true };
  }

  componentWillMount() {
    util.userValidation(this.props);
    this.props.scoreBoardsFetch(this.props.currentLeague._id);
  }

  handleComplete = league => {
    return this.props.leagueUpdate(league)
      .then(() => this.props.history.push(`/league/${this.props.league._id}`))
      .catch(util.logError);
  }

  handleMaxHeight = () => this.setState({ maxHeight:!this.state.maxHeight });

  render(){
    let scoreBoards = 'scores';
    let nbalogo = require('./../helpers/assets/nba-logo.png');
    let maxHeight = this.state.isHovered ? 'hovTransform homeTeamContent' : 'homeTeamContent';
    return (
      <div className='page-outer-div leagueContainer'>
        <div className='grid-container'>
          <div className='row'>
          <div className='col-md-8'>

            <div className='wideSectionWrapper'>
              <div className='outer'>
                <div className='outerLeft'>
                  <img src={nbalogo} />
                  <p className='headerText'>UNPICKED GAMES </p>
                  <p className='subheaderText'> </p>
                </div>
                <div className='outerRight'>
                  <p className='seeAll'>See All</p>
                </div>
              </div>
              <div className='gamesDiv'>
                <p> games that need picks </p>
                {this.props.games.map(game =>
                  <div key={game._id} className='margin16'>
                    <GameItem  game={game} onComplete={this.handleCreate}/>
                  </div>
                )}
              </div>
            </div>

            <div className='wideSectionWrapper'>
              <div className='outer'>
                <div className='outerLeft'>
                  <img src={nbalogo} />
                  <p className='headerText'>PICKS </p>
                  <p className='subheaderText'> </p>
                </div>
                <div className='outerRight'>
                  <p className='seeAll'>See All</p>
                </div>
              </div>
              <UserPickContainer sportingEventID={this.props.currentLeague.sportingEventID} leagueID={this.props.currentLeague._id} />
            </div>

            <div className={this.state.maxHeight ? 'wideSectionWrapper maxHeight' : 'wideSectionWrapper'}>
              <div className='outer messageboardHeader'>
                <div className='outerLeft'>
                  <i className="fa fa-comments"></i>
                  <p className='headerText'>MESSAGE BOARD </p>
                </div>
                <div className='outerRight'>
                  <p className='seeAll' onClick={this.handleMaxHeight}>See All</p>
                </div>
              </div>
              <MessageBoardContainer mBoardId={this.props.currentMessageBoard._id}/>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='leagueBoardsContainer'>
              <div className='leaguesContainerHeader'>
                <i className="fa fa-users"></i>
                <p className='leaguesBoardHeader'>LEADERBOARD</p>
              </div>
              <div className='container tableContainer'>
                <div>
                  <p className='tableHeadline hideMed'>LEADERBOARD</p>
                  <div className='tableColumnDiv'>
                    <p className='tableColumn columnUser'> USER NAME </p>
                    <p className='tableColumn columnScore'> SCORE </p>
                  </div>
                </div>
                {this.props.scoreBoards.map(scoreBoard => {
                  return <div className='rowColors' key={scoreBoard._id}>
                    <Table item={scoreBoard} type={scoreBoards} />
                  </div>
                })}
                <div className='spacerRow'> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
  currentLeague: state.currentLeague,
  currentMessageBoard: state.currentMessageBoard,
  scoreBoards: state.scoreBoards,
  sportingEvent: state.sportingEvent,
  topPublicLeagues: state.topPublicLeagues,
  topScores: state.topScores,
  topPublicGroups: state.topPublicGroups,
  games: state.games,
});

let mapDispatchToProps = dispatch => ({
  tokenSignIn: token => dispatch(tokenSignInRequest(token)),
  userProfileFetch: () => dispatch(userProfileFetchRequest()),
  leaguesFetch: leagueArr => dispatch(leaguesFetchRequest(leagueArr)),
  groupsFetch: groupArr => dispatch(groupsFetchRequest(groupArr)),
  sportingEventsFetch: () => dispatch(sportingEventsFetchRequest()),
  topPublicLeaguesFetch: (sportingEventID, leaguesIDArr) => dispatch(topPublicLeaguesFetchRequest(sportingEventID, leaguesIDArr)),
  topScoresFetch: sportingeventID => dispatch(topScoresFetchRequest(sportingeventID)),
  topPublicGroupsFetch: groupsIDArr => dispatch(topPublicGroupsFetchRequest(groupsIDArr)),
  leagueFetch: league => dispatch(leagueFetchRequest(league)),
  leagueUpdate: league => dispatch(leagueUpdateRequest(league)),
  scoreBoardsFetch: leagueID => dispatch(scoreBoardsFetchRequest(leagueID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeagueContainer);