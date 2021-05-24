import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { updateVote } from "../../actions/voteActions"
import { president, vicepresident, gensec } from '../../config';
import { Row, Col } from 'reactstrap';
import Typing from 'react-typing-animation';
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Election from '../../build/contracts/Election.json'
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      candidates: [],
      hasVoted: false,
      loading: false,
      voting: false,
    };
    if (typeof web3 != 'undefined') {
      this.web3Provider = Web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    
    this.web3 = new Web3(this.web3Provider); 
    this.election = TruffleContract(Election);
    this.election.setProvider(this.web3Provider);

    this.castVote = this.castVote.bind(this);
    this.watchEvents = this.watchEvents.bind(this)
  }

  componentDidMount() {
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      console.log(this.state.account)
      this.election.deployed().then((electionInstance) => {
        this.electionInstance = electionInstance
        //this.watchEvents()
        this.electionInstance.candidatesCount().then((candidatesCount) => {
          for (var i = 1; i <= candidatesCount; i++) {
            this.electionInstance.candidates(i).then((candidate) => {
              const candidates = [...this.state.candidates]
              candidates.push({
                id: candidate[0],
                name: candidate[1],
                voteCount: candidate[2]
              });
              this.setState({ candidates: candidates })
            });
          }
        })
        this.electionInstance.voters(this.state.account).then((hasVoted) => {
          this.setState({ hasVoted, loading: false })
        })
      })
    })
  }
  watchEvents() {
    // TODO: trigger event when vote is counted, not when component renders
    this.electionInstance.votedEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ voting: false })
    })
  }

  castVote(candidateId) {
    this.setState({ voting: true })
    this.electionInstance.vote(candidateId, { from: this.state.account }).then((result) =>
      this.setState({ hasVoted: true })
    )
  }
  
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ margin: '5%' }}>
        <span style={{justifyContent:'center',alignItems:'center'}}>
        <Typing >
          <h1 style={{ color: 'white' }}>Have A Vision?Make The Right Decision!<br />Vote!</h1>
        </Typing>
        </span>
        <div className="header" style={{ margin: '5%' }}>
          <h1 >President</h1>
        </div>
        <Row style={{ marginTop: '50px', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
          {president.map((person, index) => {
            return <Col md={2} className="images offset-md-1" >
              <img style={{ width: '100px', height: '100px' }} src={person.img} />
            </Col>
          })}
        </Row>
        <Row style={{ marginBottom: '50px', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
          {president.map((person, index) => {
            return <Col md={2} className="images offset-md-1" >

              <span style={{ color: 'white' }}><b>{person.name}
                <br />
                {person.regno}
              </b>
                <br />
                {person.Year}
                <br />
                {person.Dept}
              </span>
              <br /><br />
              {
                !this.state.hasVoted?
                <button className={`btn btn-block ${this.props.vote.president === person ? "btn-success" : "btn-danger"}`} onClick={() => this.props.updateVote(
                {
                  ind:index+1,
                  user: person,
                  id: "president"
                })}>Vote</button>
              :
              <span style={{ color: 'white' }}>
                Votes : {this.props.vote.president.ind==index+1?"1":"0"}
              </span>
              }
            </Col>
          })}
        </Row>
        {/* <div className="header">
          <h1 >Vice-President</h1>
        </div>
        <Row style={{ marginTop: '50px', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
          {vicepresident.map((person, index) => {
            return <Col md={2} className="images offset-md-1" >
              <img style={{ width: '100px', height: '100px' }} src={person.img} />
            </Col>
          })}
        </Row>
        <Row style={{ marginBottom: '50px', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
          {vicepresident.map(person => {
            return <Col md={2} className="images offset-md-1" >
              <span style={{ color: 'white' }}><b>{person.name}
                <br />
                {person.regno}
              </b>
                <br />
                {person.Year}
                <br />
                {person.Dept}
              </span>
              <br /><br />
              <button className={`btn btn-block ${this.props.vote.vicepresident === person ? "btn-success" : "btn-danger"}`} onClick={() => this.props.updateVote(
                {
                  user: person,
                  id: "vicepresident"
                })}>Vote</button>
            </Col>
          })}
        </Row>
        <div className="header">
          <h1 >General Secretary</h1>
        </div>
        <Row style={{ marginTop: '50px', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
          {gensec.map((person, index) => {
            return <Col md={2} className="images offset-md-1" >
              <img src={person.img} />
            </Col>
          })}
        </Row>
        <Row style={{ marginBottom: '50px', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
          {gensec.map(person => {
            return <Col md={2} className="images offset-md-1" >
              <span style={{ color: 'white' }}><b>{person.name}
                <br />
                {person.regno}
              </b>
                <br />
                {person.Year}
                <br />
                {person.Dept}
              </span>
              <br /><br />
              <button className={`btn btn-block ${this.props.vote.gensec === person ? "btn-success" : "btn-danger"}`} onClick={() => this.props.updateVote(
                {
                  user: person,
                  id: "gensec"
                })}>Vote</button>
            </Col>
          })}
        </Row> */}
          <Row style={{ alignItems: 'center', paddingBottom: '50px' }}>
          <Col md={2} className="offset-md-5">
          {
          !this.state.hasVoted?
            <button className="btn btn-block btn-success" onClick={() =>
              {
              console.log(this.props.vote)
              this.castVote(this.props.vote.president.ind)
            }}>Submit</button>
            :
      <span></span> 
          }
          </Col>
        </Row> 

      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  vote: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  vote: state.vote
});
export default connect(
  mapStateToProps,
  { logoutUser, updateVote }
)(Dashboard);