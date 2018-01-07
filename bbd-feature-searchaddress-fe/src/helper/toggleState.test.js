import toggleState from "../../src/helper/toggleState";

// function stateToggle(property) {
//   return (prevState, _props) => ({ [property]: !prevState[property] });
// }

it("특정 프로퍼티를 toggle시켜준다", () => {
  // given
  const prevState = { carAvailable: false };

  // when
  const result = toggleState("carAvailable")(prevState);

  // then
  // Compared values have no visual difference. Looks like you wanted to test for object/array equality with strict `toBe` matcher. You probably need to use `toEqual` instead.
  expect(result).toEqual({ carAvailable: true });
});
