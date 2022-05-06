import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import MoreDetails from "./MoreDetails";
import Tags from "./Tags";



const Students = ({ data, tagArray }) => {
    // State to handle more details view, and adding Tags
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState();
  
    
// More detail toggler
  const toggleOpen = () => {
    setOpen(!open);
  };


// Setting tag  
  const handleTag = (e) => {
    setTag(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    tagArray.push({tag, value: data.id});
    data.tags.push({tag, value: data.id})
    setTag("");
    console.log(tagArray)
  };

//   --- Return
  return (
    <div className="appBackground">
      <div className="appMain">
        <div className="imageBox">
          <img alt="student" src={data.pic} />
        </div>
        <div className="infoBox">
          {!open && (
            <AiOutlinePlus
              onClick={toggleOpen}
              className="expandSign"
              size={50}
            />
          )}
          {open && (
            <AiOutlineMinus
              onClick={toggleOpen}
              className="expandSign"
              size={50}
            />
          )}
          <h3>
            {data.firstName} {data.lastName}
          </h3>
          <ul>
            <li>Email: {data.email}</li>
            <li>Company: {data.company}</li>
            <li>Skill: {data.skill}</li>
            <li>
              Average: {(data.grades.reduce((a, b) => {
                return a - b;
              }, 0) /
                data.grades.length) *
                -1}
              %
            </li>
          </ul>
         <div>{<Tags data={data} tagArray={tagArray} tag={tag}/>}</div>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleTag}
              value={tag}
              className="tagInput"
              placeholder="Add a tag"
              type="text"
            />
          </form>
          <div>{open && <MoreDetails data={data} />}</div>
        </div>
      </div>
    </div>
  );
};

export default Students;
