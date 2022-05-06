import React from "react";

const Tags = ({ tagArray, tag, data }) => {
  return <div className="tagDiv">{tagArray.map((tag) => (tag.value === data.id ? <p className='tags'>{tag.tag}</p> : ''))}</div>;
};

export default Tags;
