import React, { Component } from "react";
import { arrayOf, func, string } from "prop-types";
import classNames from "classnames";
import { Dropdown } from "semantic-ui-react";

class CategorySelector extends Component {
  static propTypes = {
    selectorData: arrayOf(string).isRequired,
    selectorPlaceholderData: arrayOf(string).isRequired,
    handleClick: func.isRequired,
    value: string.isRequired,
    type: string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.value !== nextProps.value) return true;
    return false;
  }

  render() {
    const {
      selectorData,
      selectorPlaceholderData,
      handleClick,
      type,
      value
    } = this.props;

    return (
      <Dropdown
        pointing
        className={classNames({ hadValue: value })}
        key={type}
        placeholder={selectorPlaceholderData[type]}
        text={value}
        options={Object.keys(selectorData[type]).map(v => (
          <Dropdown key={v} item text={v}>
            <Dropdown.Menu>
              {selectorData[type][v].map(({ key, text }) => (
                <Dropdown.Item key={key} text={text} onClick={handleClick} />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        ))}
      />
    );
  }
}

export default CategorySelector;
