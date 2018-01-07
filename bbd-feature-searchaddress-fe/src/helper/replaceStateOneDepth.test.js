import replaceStateOneDepth from "../../src/helper/replaceStateOneDepth";

// function replaceStateOneDepth(property, target, value) {
//   return (prevState, _props) => ({
//     [property]: { ...prevState[property], [target]: value }
//   });
// }

it("객체의 특정 프로퍼티 안에 있는 타겟의 값을 인수로 변경한다", () => {
  // given
  const obj = {
    location: {
      address: "",
      latitude: null,
      longitude: null
    }
  };

  // when
  let result = replaceStateOneDepth("location", "address", "Seoul")(obj);
  result = replaceStateOneDepth("location", "latitude", 37.5326)(result);
  result = replaceStateOneDepth("location", "longitude", 127.024612)(result);

  // then
  expect(result).toEqual({
    location: {
      address: "Seoul",
      latitude: 37.5326,
      longitude: 127.024612
    }
  });
});
