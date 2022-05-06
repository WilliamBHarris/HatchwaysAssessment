import React from "react";

const MoreDetails = ({ data }) => {
  return (
    <div className='moreDetails'>
      {data.grades.map((scores, i) => (
        <ul>
          <li className='scores'>
            Test {i + 1}: {scores}%
          </li>
        </ul>
      ))}
    </div>
  );
};

export default MoreDetails;
