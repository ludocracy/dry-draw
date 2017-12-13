import React from 'react';

import Panel from './Panel';
import PropertyGroup from './PropertyGroup';
import Columns from './Columns';

export default class IfPanel extends Panel {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.object.if || ''
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    }, () => (
      this.props.onChange('if', this.state.value)
    ));
  }

  render() {
    let {object} = this.props;
    let value = object.if || '';
    return (
      <PropertyGroup object={object}>
        <Columns label="Exists if">
          <input type="text" value={value}
            onChange={this.onChange} />
        </Columns>
      </PropertyGroup>
    );
  }
}
