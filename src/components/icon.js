import React from "react";

export default function Icon(props) {
 return (
    <div className="mode-wrapper"  onClick={props.toggleRipple}  onMouseOut={props.toggleSuggestionOff} onMouseDown={props.toggleMouseDown} >
     <img  className="mode-icon" src={props.mode} onMouseEnter={props.toggleSuggestion} alt="theme icon"></img>
     <div id='wrap' ></div>
     </div>
     
 )
}