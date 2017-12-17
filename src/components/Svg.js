import React, { Component } from 'react';
import '../css/Svg.css';
import Parameters from './Parameters';
import Editor from './Editor';
import HistoryNav from './HistoryNav';
import axios from 'axios';
import objects from '../objects.json';
import { database, auth, firebaseListToArray } from '../utils/firebase';

const DUXML_URL = 'https://cors-anywhere.herokuapp.com/https://duxml.herokuapp.com/resolveJSON';

class Svg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {},
      objects: objects,
      timeStamp: Date.now(),
      history: []
    }

    this._handleParamsChange = this._handleParamsChange.bind(this);
    this._handleOneParamChange = this._handleOneParamChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._getDefinedParams = this._getDefinedParams.bind(this);
    this._handleTimeTravel = this._handleTimeTravel.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.ref = database.ref(`users/${user.uid}/history`);
        this.ref.on('value', snapshot => {
          let history = firebaseListToArray(snapshot.val()) || this.state.history;
          this.setState({
            history: history
          });
        });
      } else {
        auth.signInAnonymously().catch(function(error) {
            console.log(error);
        });
      }
    });
  }

  componentWillUnmount() {
    if(this.ref) {
      this.ref.off();
    }
  }

  _handleTimeTravel({objects, params, timeStamp}) {
    this.setState({
      objects: objects,
      params: params,
      timeStamp: timeStamp
    });
  }

  _getDefinedParams() {
    let defined_params = {}
    for (let key in this.state.params) {
      let value = this.state.params[key];
      if (value && value !== '') {
        defined_params[key] = value;
      }
    }
    return defined_params;
  }

  _handleSubmit(objects) {
    axios({
      method: 'post',
      url: DUXML_URL,
      responseType: 'json',
      params: this._getDefinedParams(),
      data: JSON.stringify({
        json: this.state.objects
      })
    })
    .then(response => {
      let timeStamp = Date.now();
      this.ref.push({
        params: this.state.params,
        objects: this.state.objects,
        timeStamp: timeStamp
      })
      .then(() => {
        this.setState({
          objects: response.data,
          timeStamp: timeStamp
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  _handleParamsChange(newParams) {
    for (let param in newParams) {
      let oldValue = this.state.params[param];
      if(oldValue && oldValue !== '') {
        newParams[param] = oldValue;
      }
    }
    this.setState({
      params: newParams
    });
  }

  _handleOneParamChange(param, value) {
    let newParams = this.state.params;
    newParams[param] = value === '' ? null : value;
    this.setState({
      params: newParams
    });
  }

  render() {
    return (
      <div className="Svg">
        <div className="svg-container">
          <Editor _handleSubmit={this._handleSubmit}
            _handleParamsChange={this._handleParamsChange} objects={this.state.objects} />
          <Parameters params={this.state.params}
            _handleOneParamChange={this._handleOneParamChange} />
        </div>
        <HistoryNav history={this.state.history} timeStamp={this.state.timeStamp}
          _handleTimeTravel={this._handleTimeTravel}/>
      </div>
    );
  }
}

export default Svg;
