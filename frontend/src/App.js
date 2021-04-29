import React, { Component } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter as Router, Route , Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
  
import { Provider } from "react-redux"; 
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing"; 
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Migrations from '../../build/contracts/Migrations.json';
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {

  // constructor(props) {
  //   super(props)


  //   if (typeof Web3 != 'undefined') {
  //     this.web3Provider = Web3.currentProvider
  //   } else {
  //     this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
  //   }

  //   this.web3 = new Web3(this.web3Provider)

  //   //this.election = TruffleContract(Migrations)
  //   this.election.setProvider(this.web3Provider)

  //   this.castVote = this.castVote.bind(this)
  //   this.watchEvents = this.watchEvents.bind(this)
  // }

  // componentDidMount() {
  //   // TODO: Refactor with promise chain
  //   this.web3.eth.getCoinbase((err, account) => {
  //     this.setState({ account })
  //     this.election.deployed().then((electionInstance) => {
  //       this.electionInstance = electionInstance
  //       this.watchEvents()
  //       this.electionInstance.candidatesCount().then((candidatesCount) => {
  //         for (var i = 1; i <= candidatesCount; i++) {
  //           this.electionInstance.candidates(i).then((candidate) => {
  //             const candidates = [...this.state.candidates]
  //             candidates.push({
  //               id: candidate[0],
  //               name: candidate[1],
  //               voteCount: candidate[2]
  //             });
  //             this.setState({ candidates: candidates })
  //           });
  //         }
  //       })
  //       this.electionInstance.voters(this.state.account).then((hasVoted) => {
  //         this.setState({ hasVoted, loading: false })
  //       })
  //     })
  //   })
  // }

  // watchEvents() {
  //   // TODO: trigger event when vote is counted, not when component renders
  //   this.electionInstance.votedEvent({}, {
  //     fromBlock: 0,
  //     toBlock: 'latest'
  //   }).watch((error, event) => {
  //     this.setState({ voting: false })
  //   })
  // }

  // castVote(candidateId) {
  //   this.setState({ voting: true })
  //   this.electionInstance.vote(candidateId, { from: this.state.account }).then((result) =>
  //     this.setState({ hasVoted: true })
  //   )
  // }
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div>
        <Navbar />
        <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
      </div>
      </Router>
      </Provider>
    );
  }
}
export default App;
