import React, { Component } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { string } from "prop-types";

import { buttonClassName } from "./staticLanding";

class SearchButton extends Component {
  static propTypes = {
    searchButtonClassName: string.isRequired,
    queryString: string.isRequired
  };

  shouldComponentUpdate({ queryString: nextString }) {
    if (this.props.queryString !== nextString) return true;
    return false;
  }

  render() {
    const { queryString, searchButtonClassName } = this.props;

    return (
      <Link to={`/search/${queryString}`}>
        <Button
          className={classNames(buttonClassName, searchButtonClassName)}
          primary
          type="submit"
        >
          검색
        </Button>
      </Link>
    );
  }
}

export default SearchButton;
