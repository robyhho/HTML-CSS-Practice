//Setters
const filterList = [];

//Getters
const clear_btn = document.querySelector("#clear-btn");
const header = document.querySelector("#header");


//Event Listeners
document.addEventListener("click", function(e) {
  if (e.target.tagName == "P" && e.target.className == "tag") {
    sortJobs(e);
  };
})

//Fetching data from data.json
fetch("./data.json").then( response => response.json()).then(function(jobs) {
  Object.entries(jobs).forEach((job) => {
    createjobListing(job[1])
  })
})

// ---------   Functions  ------------

//Functions for Creating Job Listings

function createjobListing(job) {
    //Create elements
    let jobDiv = document.createElement("div");
    let img = document.createElement("img");
  
    //add classes
    jobDiv.classList.add("job-listing");
    img.classList.add("company-icon");

    let jobDataDiv = createJobData(job);

    img.src = job.logo;
    img.alt = "company-logo"

    jobDiv.append(img);
    jobDiv.append(jobDataDiv);
    document.body.append(jobDiv);
    

}

function createJobData(job) {
  let jobDataDiv = document.createElement("div");
  jobDataDiv.classList.add("job-data");
  
  //Create job top div
  let job_top = createJobTop(job);

  //Create job title
  let job_title = createJobTitle(job);
  
  //create job bottom div
  let job_bottom = createJobBottom(job);
  
  
  //Create job tag Div
  let tag_div = createJobTagDiv(job);
  
  //Append to jobDataDiv

  jobDataDiv.append(job_top);
  jobDataDiv.append(job_title);
  jobDataDiv.append(job_bottom);

  let hr = document.createElement("hr");

  jobDataDiv.append(hr);
  jobDataDiv.append(tag_div);

  return jobDataDiv;
}

function createJobTop(job) {

    //Create job top div
    let job_top = document.createElement("div");
    job_top.classList.add("job-top");
  
    //Create company name
    let company_name = document.createElement("p");
    company_name.innerText = job.company;
    company_name.classList.add("company-name");
  

    //Create new p
    let newP = "";
    if (job.new == true) {
       newP = document.createElement("p");
      newP.classList.add("new");
      newP.innerText = "NEW!";
    }
    
    //Create new f
    let newF = ""
    if(job.featured == true) {
       newF = document.createElement("p");
      newF.innerText = "Featured";
      newF.classList.add("featured")
    }
  
    //Append job-top elements into div
    job_top.append(company_name);
    if (newP !== "") {
      job_top.append(newP);
    }
    if(newF !== "") {
      job_top.append(newF);
    }
    return job_top;  
}

function createJobTitle(job) {
  let job_title = document.createElement("p");
  job_title.textContent = job.position;
  job_title.classList.add("job-title");
  
  return job_title;
}

function createJobBottom(job) {
  let job_bottom = document.createElement("div");
  job_bottom.classList.add("job-bottom");
  
  //Create day Span
  let day_span = document.createElement("span");
  day_span.textContent = job.postedAt;

  //Create time span
  let time_span = document.createElement("span");
  time_span.textContent = job.contract;

  let loca_span = document.createElement("span");
  loca_span.textContent = job.location;

  //Append job_bottom div
  job_bottom.append(day_span);
  job_bottom.append("·")
  job_bottom.append(time_span);
  job_bottom.append("·")
  job_bottom.append(loca_span);

  return job_bottom;
}

function createJobTagDiv(job) {
  let tag_div = document.createElement("div");
  tag_div.classList.add("job-tags");
  
  //Add stack
  let stackTag = document.createElement("p");
  stackTag.classList.add("tag");
  stackTag.textContent = job.role;
  stackTag.setAttribute("data-tag", stackTag.textContent);
  tag_div.append(stackTag);

  //Add level
  let levelTag = document.createElement("p");
  levelTag.classList.add("tag");
  levelTag.textContent = job.level;
  levelTag.setAttribute("data-tag", levelTag.textContent);
  tag_div.append(levelTag);

  //Loop Languages
  for (i = 0; i < job.languages.length; i++) {
    let tag = document.createElement("p");
    tag.classList.add("tag");
    tag.textContent = job.languages[i];
    tag.setAttribute("data-tag", tag.textContent);
    tag_div.append(tag);
  }
  //Loop tools

  for (i = 0; i < job.tools.length; i++) {
    let tag = document.createElement("p");
    tag.classList.add("tag");
    tag.textContent = job.tools[i];
    tag.setAttribute("data-tag", tag.textContent);
    tag_div.append(tag);
  }
  
  //Append to tag Div

  return tag_div;
}

//Functions for Filter Div and Filters

function createFilterDiv() {
  let div = document.createElement("div");
  div.classList.add("filters");
  let p = document.createElement("p");
  p.innerText = "Clear";
  p.classList.add("clear");
  p.id = "clear"
  div.append(p);
  header.after(div);
  p.addEventListener("click", ()=> {
    showAllJobs();
    filterList.length = 0;
    div.remove();
  })
}

function createFilterTags(){
  let filter_div = document.querySelector(".filters");
  
  while (filter_div.firstChild) {
    filter_div.removeChild(filter_div.firstChild);
  }

  filterList.forEach((filter) => {
    let div = document.createElement("div");
    div.classList.add("filter");
    let a = document.createElement("a");
    a.innerText = filter;
    let img = document.createElement("img");
    img.src = "images/cross.svg";
    img.classList.add("cross");
    div.append(a);
    div.append(img);
    
    
    filter_div.append(div);

    //Event on filters x
    img.addEventListener("click" , ()=> {
      //Remove tag from Filterlist
      let index = filterList.indexOf(filter);
      if(index > -1 ) {
        filterList.splice(index, 1);
        createFilterTags();
      }
    })
  })
  let p = document.createElement("p");
  p.innerText = "Clear";
  p.classList.add("clear");
  p.id = "clear"
  filter_div.append(p);
  p.addEventListener("click", ()=> {
    showAllJobs();
    filterList.length = 0;
    filter_div.remove();
  })
  
}

//Event Functions

function sortJobs (event) {
  //Get all Job articles
  const allJobs = Array.from(document.getElementsByClassName("job-listing"));
  
  //Get tagname of event
  let value = event.target.innerText;

  //Check if filterList already includes tagname
  if (!filterList.includes(value)) {
    filterList.push(value);
  };

  //Check each article for tagname
  // - True > go next
  // - False, style = hidden
  filterList.forEach((filter) => {
    let sortBy = `[data-tag='${filter}']`;
    for ( var i = 0; i < allJobs.length; i++) {

    allJobs.forEach(function (job) {
      let tagDiv = job.querySelector(".job-data").querySelector(".job-tags");
      if (!tagDiv.querySelector(sortBy)) {
        job.style.display = "none";
      }
    })
  }
  })


  //Create top part with ability to clear
  //Check if filter Div exists
  let exists = document.querySelector(".filters");
  if (!exists){
    createFilterDiv();
  } 
  createFilterTags();
}

//Function -- Takes no values --
//Gets all jobs (including hidden) 
//Sets display to 'flex'
function showAllJobs() {
  const allJobs = Array.from(document.getElementsByClassName("job-listing"));
  allJobs.forEach((job) => {
    job.style.display = "flex";
  })
}