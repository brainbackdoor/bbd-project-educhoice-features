export default function toggleState(property) {
  return (prevState, _props) => ({ [property]: !prevState[property] });
}
