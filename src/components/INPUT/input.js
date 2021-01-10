import React from "react";
import './styles.css'
function input({handleChange}) {
  return (
    <div className="button-wrapper">
    <span className="label">
      choose File
    </span>
    
      <input type="file" name="upload" id="upload" className="upload-box" placeholder="Upload File" onClick={handleChange}/>
    
  </div>

  )
}


export default input;
