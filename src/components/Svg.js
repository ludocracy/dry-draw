import React, { Component } from 'react';
import '../css/Svg.css';
import Parameters from './Parameters';
import Editor from './Editor';
import HistoryNav from './HistoryNav';
import axios from 'axios';
import initObjects from '../objects.json';
import { database, auth, firebaseListToArray } from '../utils/firebase';

const DUXML_URL = 'https://cors-anywhere.herokuapp.com/https://duxml.herokuapp.com/resolveJSON';

class Svg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      params: {},
      objects: initObjects,
      lastSavedObjects: [],
      timeStamp: 0,
      history: []
    }

    this._handleParamsChange = this._handleParamsChange.bind(this);
    this._handleOneParamChange = this._handleOneParamChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._getDefinedParams = this._getDefinedParams.bind(this);
    this._handleTimeTravel = this._handleTimeTravel.bind(this);
    this._updateHistory = this._updateHistory.bind(this);
    this._handleEdit = this._handleEdit.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.ref = database.ref(`users/${user.uid}/history`);
        this.ref.once('value', snapshot => {
          let history = firebaseListToArray(snapshot.val());
          this.setState({
            history: history
          });
          if (history.length > 0) {
            let latest = history[history.length-1];
            this.setState({
              objects: latest.objects,
              params: latest.params,
              timeStamp: latest.timeStamp
            });
          }
        });
        this.ref.on('child_added', snapshot => {
          let history = this.state.history.concat(snapshot.val());
          this.setState({
            history: history
          });
        })
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
      timeStamp: timeStamp,
      isEditing: false
    });
  }

  _getDefinedParams() { // filters params so only ones with values get sent to API
    let defined_params = {}
    for (let key in this.state.params) {
      let value = this.state.params[key];
      if (value && value !== '') {
        defined_params[key] = value;
      }
    }
    return defined_params;
  }

  _handleSubmit(requestObjects) {
    axios({
      method: 'post',
      url: DUXML_URL,
      responseType: 'json',
      params: this._getDefinedParams(),
      data: JSON.stringify({
        json: requestObjects
      })
    })
    .then(response => {
      this.setState({
        objects: response.data,
        timeStamp: Date.now(),
        isEditing: false
      }, () => {
        this._updateHistory(requestObjects, this.state.timeStamp, false)
      })
    })
    .catch(err => {
      console.log(err);
    });
  }

  _updateHistory(objects, timeStamp, isEditing) {
    let latestSavedObjects = this.state.history[this.state.history.length-1] || []
    let isDifferent = this._isDifferent(latestSavedObjects, objects);
    if (!this.state.isEditing && isDifferent) {
      this.setState({
        isEditing: isEditing
      });
      this.ref.push({
        objects: objects,
        params: this.state.params || {},
        timeStamp: timeStamp
      });
    }
  }

  _isDifferent(a, b) {
    if (a.length !== b.length) {
      return true;
    } else {
      a.forEach((obj_a, index) => {
        let obj_b = b[index];
        for (let key in obj_a) {
          if(obj_a[key] !== obj_b[key]) {
            return true;
          }
        }
      })
      return false;
    }
  }

  _handleParamsChange(newParams = {}) {
    for (let key in newParams) {
      let oldParams = this.state.params || {};
      let oldValue = oldParams[key];
      if(oldValue && oldValue !== '') {
        newParams[key] = oldValue;
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

  _handleEdit(objects) {
    this._updateHistory(objects, Date.now(), true)
  }

  render() {
    return (
      <div className="Svg">
        <div className="svg-container">
          <Editor _handleSubmit={this._handleSubmit} _handleEdit={this._handleEdit}
            _handleParamsChange={this._handleParamsChange}
            historyRef={this.ref} objects={this.state.objects} />
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
