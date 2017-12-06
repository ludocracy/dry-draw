import React from 'react';

import Panel from './Panel';
import PropertyGroup from './PropertyGroup';
import Columns from './Columns';
import Column from './Column';

export default class IfPanel extends Panel {
  render() {
    let {object} = this.props;
    return (
      <PropertyGroup object={object}>
        <Columns label="Exists if">
          <Column value={object.if}
            onChange={this.props.onChange.bind(this, 'if')} />
        </Columns>
      </PropertyGroup>
    );
  }
}
