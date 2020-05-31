import React, { useState, useEffect, useRef } from "react";
import './styles.css';

export default function Table(props) {
  const [delimeter, setDelimeter] = useState(",");
  const [line, setLines] = useState(2);
  const [data, setData] = useState([]);
  const makeTable = (value ) => {
    debugger
    let arr = [];
    let data = (value || value == "") ?  props.fileText.split(value) :  props.fileText.split(delimeter);
    for (let i = 0; i < line; i++) {
      let item = data.splice(0, 4);
      arr.push(item);
    }
    if(data.length>0){
      arr.push(data)
    }
    setData(arr);
  };

  const handleDelimeter = (event)=>{
      setDelimeter(event.target.value);
      makeTable(event.target.value);
 
  }
  const handleLine = (event)=>{
    setLines(event.target.value);
}
  useEffect(() => {
    makeTable();
    return () => {
    };
  }, []);
  return (
    <div>
      <label>Delimiter</label> <input type="text" value={delimeter} onChange = {(event)=>handleDelimeter(event)} />
      <label className="ml-3">Lines</label> <input type="number" value={line} onChange = {(event)=>handleLine(event)} />
      <table>
        {data.map((item, index) => {
          return (
              index < line ?
            <tr key={index} >
              {item.map((each, i) => {
                return <td key={i}>{each}</td>;
              })}
            </tr> : null
          );
        })}
      </table>
    </div>
  );
}
