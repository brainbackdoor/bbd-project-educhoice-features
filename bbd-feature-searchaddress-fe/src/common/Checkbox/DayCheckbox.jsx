import React, { Component } from "react";
import { arrayOf, func, string } from "prop-types";

import { Checkbox } from "semantic-ui-react";

class DayCheckbox extends Component {
  static propTypes = {
    handleChange: func.isRequired,
    data: arrayOf(string).isRequired
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { data, handleChange } = this.props;

    return data.map(day => (
      <Checkbox
        className="ui checkbox"
        key={day}
        label={day}
        onChange={handleChange}
        value={day}
      />
    ));
  }
}

export default DayCheckbox;
