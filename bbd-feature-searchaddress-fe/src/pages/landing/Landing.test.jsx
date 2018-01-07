import React from "react";
import { mount } from "enzyme";

import Store from "stores/Store";
import Landing from "./Landing";

describe("Landing Component >", () => {
  it.skip("renders without crashing", () => {
    // given
    const store = Store.create({}, {});

    // when
    const landing = mount(<Landing store={store} />);

    // then
    expect(landing).toBeDefined();
  });
});
