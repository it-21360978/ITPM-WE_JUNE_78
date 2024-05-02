import PropTypes from "prop-types";
import "./Colors.css";
import Input from "../../components/input.jsx";
function Colors({ handleChg }) {
  return (
    <div>
      <h2 className="sidebar-title color-title">Colors</h2>
      <label className="sidebar-label-container">
        <input onChange={handleChg} type="radio" value="" name="test3" />
        <span className="checkmark all"></span>All
      </label>
      <Input
        handleChange={handleChg}
        value="black"
        ProductName="Black"
        name="test3"
        color="black"
      />
      <Input
        handleChange={handleChg}
        value="blue"
        ProductName="Blue"
        name="test3"
        color="blue"
      />
      <Input
        handleChange={handleChg}
        value="red"
        ProductName="Red"
        name="test3"
        color="red"
      />
      <Input
        handleChange={handleChg}
        value="green"
        ProductName="Green"
        name="test3"
        color="green"
      />
      <label className="sidebar-label-container">
        <input onChange={handleChg} type="radio" value="white" name="test3" />
        <span
          className="checkmark"
          style={{ background: "white", border: "2px solid black" }}
        ></span>
        White
      </label>
    </div>
  );
}
//for eslint
Colors.propTypes = {
  handleChg: PropTypes.func.isRequired,
};
export default Colors;
