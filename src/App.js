import "./App.css";
import { useState, useEffect } from "react";
import Students from "./Components/Students";

let tagArray = [];


function App() {
  
  // Manage state - simple state, no need for Redux etc.
  const [data, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  // ----- API fetch
    async function fetchURL(url) {
    const response = await fetch(url);
    const data = await response.json();
    const students = data.students;
    students.forEach((student) => {
      student.tags = [];
    });
    setData(students);
  }

  // --- useEffect
  useEffect(() => {
    fetchURL(`https://api.hatchways.io/assessment/students`);
  }, []);


  // --- onChange Handlers for the Name, and Tag search inputs
  const handleChange = (e) => {
    e.preventDefault();
    setSearchFilter(e.target.value);
  };
  const handleTagChange = (e) => {
    e.preventDefault();
    setTagFilter(e.target.value);
  };


  //  --- Search for Tag
const searchTag = (tagInput) => {
  if (tagInput && tagInput.toLowerCase) {
    tagInput = tagInput.toLowerCase();
  }
  let searchTagsArray = [];
  data.forEach((student) => {
    let tagExists = false;
    student.tags.forEach((t) => {
      if(t.tag.includes(tagInput)){
        tagExists = true;
      }
    });
    if(!tagInput || tagExists) {
      searchTagsArray.push(student);
    }
  })
  return searchTagsArray
}

// --- Search for Name

const nameFilter = (filterString) => {
  if (filterString && filterString.toLowercase) {
    filterString = filterString.toLowerCase();
  }
  let filtered = [];
  data.forEach((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    if(!filterString || fullName.includes(filterString)){
      filtered.push(student);
    }
  });
  return filtered;
}


// --- Found solution for combining search filters

const filterTheTags = searchTag(tagFilter)
const filterTheNames = nameFilter(searchFilter);
const comboFilters = [];

filterTheNames.forEach((student) => {
  if(filterTheTags.includes(student)){
    comboFilters.push(student)
  }
});

// ----  Render
  return (
    <div className="App">
      <input
        placeholder="Search by name"
        type="text"
        onChange={handleChange}
      />
      <input
        placeholder="Search by tag"
        type="text"
        onChange={handleTagChange}
      />
      {comboFilters.map((tag) => (<Students data={tag} tagArray={tagArray} />))}
    </div>
  );
}

export default App;
