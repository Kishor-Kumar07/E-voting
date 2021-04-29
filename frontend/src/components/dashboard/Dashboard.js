import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { updateVote } from "../../actions/voteActions"
import { president, vicepresident, gensec } from '../../config';
import { Row, Col } from 'reactstrap';
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    console.log(this.props.vote)
    return (
      <div style={{ margin: '5%' }}>
        <div className="header">
          <h1 >President</h1>
        </div>
        <Row style={{ marginTop: '50px', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
          {president.map((person, index) => {
            return <Col md={2} className="images offset-md-1" >
              <img style={{width:'100px',height:'100px'}} src={person.img} />
            </Col>
          })}
        </Row>
        <Row style={{ marginBottom: '50px', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
          {president.map((person, index) => {
            return <Col md={2} className="images offset-md-1" >

              <span style={{color:'white'}}><b>{person.name}
                <br />
                {person.regno}
              </b>
                <br />
                {person.Year}
                <br />
                {person.Dept}
              </span>
              <br /><br />
              <button className ={`btn btn-block ${this.props.vote.president === person ? "btn-success" : "btn-danger"}`} onClick={() => this.props.updateVote(
                {
                  user: person,
                  id: "president"
                })}>Vote</button>
            </Col>
          })}
        </Row>
        <div className="header">
          <h1 >Vice-President</h1>
        </div>
        <Row style={{ marginTop: '50px', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
          {vicepresident.map((person, index) => {
            return <Col md={2} className="images offset-md-1" >
              <img style={{width:'100px',height:'100px'}} src={person.img} />
            </Col>
          })}
        </Row>
        <Row style={{ marginBottom: '50px', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
          {vicepresident.map(person => {
            return <Col md={2} className="images offset-md-1" >
              <span style={{color:'white'}}><b>{person.name}
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
              <img  src={person.img} />
            </Col>
          })}
        </Row>
        <Row style={{ marginBottom: '50px', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
          {gensec.map(person => {
            return <Col md={2} className="images offset-md-1" >
              <span style={{color:'white'}}><b>{person.name}
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