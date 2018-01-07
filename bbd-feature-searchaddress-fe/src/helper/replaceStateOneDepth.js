export default function replaceStateOneDepth(property, target, value) {
  return (prevState, _props) => ({
    [property]: { ...prevState[property], [target]: value }
  });
}
