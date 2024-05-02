function input({ handleChange, value, ProductName, name, color }) {
  return (
    <label className="sidebar-label-container">
      <input onChange={handleChange} type="radio" value={value} name={name} />
      <span className="checkmark" style={{ backgroundColor: color }}></span>
      {ProductName}
  </label>  );
}
export default input;
