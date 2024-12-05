import React from "react";

const DropDown = ({ title, option, func }) => {
  return (
    <div className="select">
      <select defaultValue="0" name="format" id="format" onChange={(e)=>func(e)}>
        <option value="0" disabled>
          {title}
        </option>
        {option.map((o, i) => (
          <option value={o} key={i}>{o.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
