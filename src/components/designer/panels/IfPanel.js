import React from 'react';

import Panel from './Panel';
import PropertyGroup from './PropertyGroup';
import Columns from './Columns';

export default class IfPanel extends Panel {
  render() {
    let {object} = this.props;
    return (
      <PropertyGroup object={object}>
        <Columns label="Exists if">
          <input type="text" value={object.if}
            onChange={e => this.props.onChange('if', e.target.value)} />
        </Columns>
      </PropertyGroup>
    );
  }
}
