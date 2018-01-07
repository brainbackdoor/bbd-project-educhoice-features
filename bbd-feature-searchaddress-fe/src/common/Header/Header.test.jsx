import React from "react";
import { shallow } from "enzyme";

import Header from "./Header";

describe("Header Component >", () => {
  it("renders without crashing", () => {
    // given

    // when
    const header = shallow(<Header />);

    // then
    expect(header).toBeDefined();
  });
});
