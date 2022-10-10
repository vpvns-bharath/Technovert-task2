var searchText = document.getElementById("letters");
var display = document.getElementById("display");
var form = document.getElementById("form");
var search = document.getElementById("inp");
var clear = document.getElementById("clear");



document.body.addEventListener("load",show_char(),false);

var database = {
    employees:[
        {
        image:"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F08%2Fgettyimages-138426899.jpg",
        firstName:"Chandler",
        lastName:"Bing",
        preferredName:"Chandler",
        email:"cbing@gmail.com",
        jobtitle:"SharePoint Practice Head",
        office:"Seattle",
        dept:"IT",
        phone:"444444",
        skype:"bing@skype.in"
    },

    {
        image:"https://media.glamourmagazine.co.uk/photos/6138cab73335302f7261d22f/4:3/w_1280,h_960,c_limit/ross-geller_glamour_10aug17_cbs-sky_p.jpg",
        firstName:"Ross",
        lastName:"Geller",
        preferredName:"Ross",
        email:"ross@gmail.com",
        jobtitle:".Net Developer Lead",
        office:"India",
        dept:"IT",
        phone:"55558",
        skype:"ross@skype.in"
    },

    {
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcU0hLxCTOw1IJdJ3vTpIZ4gI9FVuskV9BYQ&usqp=CAU",
        firstName:"Rachel",
        lastName:"Green",
        preferredName:"Rachel",
        email:"rgreen@gmail.com",
        jobtitle:"BI Developer",
        office:"Seattle",
        dept:"Sales",
        phone:"56444",
        skype:"rachel@skype.in"
    },

    {
        image:"https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/monica_geller_1.jpg",
        firstName:"Monica",
        lastName:"Geller",
        preferredName:"Monica",
        email:"mon@gmail.com",
        jobtitle:"Business Analyst",
        office:"India",
        dept:"Sales",
        phone:"578779",
        skype:"monica@skype.in"
    },

    {
        image:"https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_26/1349761/matt-leblanc-joey-friends-today-180629-tease.jpg",
        firstName:"Joey",
        lastName:"Tribiaani",
        preferredName:"Joey",
        email:"joey@gmail.com",
        jobtitle:"Recruiting Expert",
        office:"Seattle",
        dept:"Human Resources",
        phone:"99999",
        skype:"joey@skype.in"
    }
]
}


//adding employee to database
form.addEventListener("submit",add_emp);

var file = document.getElementById('file');
var tmppath="";
file.addEventListener('change',function(event){
  tmppath=URL.createObjectURL(event.target.files[0]);
  
})

function add_emp(e){
    e.preventDefault();
    var data = Object.fromEntries(new FormData(form).entries());
    data['image'] = tmppath;
    database.employees.push(data);
    display.innerHTML = "";
    document.getElementById('created_modals').innerHTML="";
    show_emp(database);
    edit_details();
    save_details();
    count_param();
    //console.log(data);
}

//display employees
document.body.addEventListener("load",show_emp(database),false);

//applying filter 

var filter = document.getElementById("filter");
var dummy_db = {employees:new Set()};
var prev_event = "";
filter.addEventListener("click",(e)=>{
    let isClick = e.target.nodeName === 'BUTTON';
    if(!isClick)
        return;
    
    
    let key = e.target.name;
    let value = e.target.value;
    
    // console.log(key,value);
    //console.log(prev_event);
    
    if(prev_event=="" || key==prev_event){
        filter_helper(database,key,value);
    }
    else{
        var dummy_db_list = {employees:[]};
        dummy_db.employees.forEach(element => {
        dummy_db_list.employees.push(element);
        });
        dummy_db.employees.clear();
        filter_helper(dummy_db_list,key,value);
    }
    prev_event = key;
})


//helper function for filter
function filter_helper(database,key,value){
    for(let i=0;i<database.employees.length;i++){
        let obj = database.employees[i];
        if(obj[key] == value){
            dummy_db.employees.add(database.employees[i]);
        }
    }
    display.innerHTML="";
    var dummy_db_list = {employees:[]};
    dummy_db.employees.forEach(element => {
        dummy_db_list.employees.push(element);
    });
    show_emp(dummy_db_list);
}


//searching functionality
search.addEventListener("keyup",show_search);

function show_search(){
    let option = document.getElementById("drop").value;
    let search_value = search.value.toUpperCase();
    // console.log(search_value);
    let items = display.querySelectorAll(".emp-card");
    for(let i=0;i<items.length;i++){
        let item = items[i].querySelector('.emp-text');
        let tar = item.getElementsByClassName(option)[0].innerHTML.toUpperCase();
        // console.log(tar);
        if(tar.indexOf(search_value)==-1)
        {
            items[i].style.display="none";
        }
        else
        {
            items[i].style.display="initial";
        }
    }

}

//clear the search

clear.addEventListener("click",clear_data);

function clear_data(){
    search.value = "";
    display.innerHTML="";
    show_emp(database);
}


//obtain alphabet buttons
function show_char(){
    for(let i=0;i<26;i++)
    {
        let code = 'A'.charCodeAt(0) + i;
        let text = String.fromCharCode(code);
        let existing = searchText.innerHTML;
        searchText.innerHTML =existing+ `
        <button class="btn btn-primary search-btn">${text}</button>
        `;
    }
}

//functionality of the letter buttons

searchText.addEventListener("click",(e)=>{
    let isClick = e.target.nodeName === 'BUTTON';
    if(!isClick){
        return;
    }

    let value = e.target.innerHTML;
    let items = display.querySelectorAll(".emp-card");
    for(let i=0;i<items.length;i++){
        let item = items[i].querySelector('.emp-text');
        let tar = item.getElementsByClassName('First Name')[0].innerHTML.toUpperCase();
        // console.log(tar);
        if(tar.startsWith(value)==false)
        {
            items[i].style.display="none";
        }
        else
        {
            items[i].style.display="initial";
        }
    }

})

//obtain all the employees function
function show_emp(database){
    for(let i=0;i<database.employees.length;i++){
        var element = document.createElement("div");
        element.setAttribute("data-bs-toggle","modal"); 
        element.setAttribute("data-bs-target","#display_fullDetails"+i);
        element.classList.add("emp-card");
        element.innerHTML = `
                <div class="emp-card-body  card-body    d-flex">
                    <div class="emp-image">
                    <img src="${database.employees[i].image}" alt="">
                    </div>
                    <div class="emp-text">
                        <h5 class="Preferred Name"><span class="First Name">${database.employees[i].firstName}</span> <span class="Last Name">${database.employees[i].lastName}</span></h5>
                        <p class="Job Title">${database.employees[i].jobtitle}</p>
                        <p class="Department">${database.employees[i].dept} department</p>
                        <div class="card-icons">
                            <i class="fa-solid fa-square-phone"></i>
                            <i class="fa-solid fa-envelope"></i>
            
                            <i class="fa-solid fa-comment"></i>
            
                            <i class="fa-solid fa-star"></i>
            
                            <i class="fa-solid fa-heart"></i>
                        </div>
                    
                    </div>
                </div>
                
        `;

        var in_modal = document.getElementById("created_modals").innerHTML;
        document.getElementById("created_modals").innerHTML=in_modal+
        `
            <div class="modal fade" id="display_fullDetails${i}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"  aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4>Employee Details</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="emp-det">
                                <img class="modal-img" src="${database.employees[i].image}" alt="">
                                <form action="" id="details${i}">
                                        <div class="d-flex emp-det">
                                            <label>First Name:</label>
                                            <input type="text" name="firstName" class="form-control g1 firstName${i}" id="emp-data-inp${i}" placeholder="${database.employees[i].firstName}" disabled>
                                        </div>
                                        <div class="d-flex emp-det">
                                            <label>Last Name:</label>
                                            <input type="text" name="lastName" class="form-control g1 lastName${i}" id="emp-data-inp${i}" placeholder="${database.employees[i].lastName}" disabled>
                                        </div>
                                        <div class="d-flex emp-det">
                                            <label>Preffered Name:</label>
                                            <input type="text" name="preferredName" class="form-control g1 preferredName${i}" id="emp-data-inp${i}" placeholder="${database.employees[i].preferredName}" disabled>
                                        </div>
                                        <div class="d-flex emp-det">
                                            <label>Email: </label>
                                            <input type="text" name="email" class="form-control g1 email${i}" id="emp-data-inp${i}" placeholder="${database.employees[i].email}" disabled>
                                        </div>
                                        <div class="d-flex emp-det">
                                            <label>Job Title: </label>
                                            <input type="text" name="jobtitle" class="form-control g1 jobtitle${i}" id="emp-data-inp${i}" placeholder="${database.employees[i].jobtitle}" disabled>
                                        </div>
                                        <div class="d-flex emp-det">
                                            <label>Office: </label>
                                            <input type="text" name="office" class="form-control g1 office${i}" id="emp-data-inp${i}" placeholder="${database.employees[i].office}" disabled>
                                        </div>
                                        <div class="d-flex emp-det">
                                            <label>Department:</label>
                                            <input type="text" name="dept" class="form-control g1 dept${i}" id="emp-data-inp${i}" placeholder="${database.employees[i].dept}" disabled>
                                        </div>
                                        <div class="d-flex emp-det">
                                            <label>Phone: </label>
                                            <input type="text" name="phone" class="form-control g1 phone${i}" id="emp-data-inp${i}" placeholder="${database.employees[i].phone}" disabled>
                                        </div>
                                        <div class="d-flex emp-det">
                                            <label>Skype Id:</label> 
                                            <input type="text" name="skype" class="form-control g1 skype${i}" id="emp-data-inp${i}" placeholder="${database.employees[i].skype}" disabled>
                                        </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-outline-danger" name="${i}" id="edit">Edit</button>
                            <button type="submit" class="btn btn-outline-primary" name="${i}" id="save" data-bs-dismiss="modal">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        display.appendChild(element);
        
    }
}

//employee details modals

function edit_details(){
    var edit = document.querySelectorAll("#edit");
    
    for(let i=0;i<edit.length;i++){
        edit[i].addEventListener('click',(e)=>{
            const val=e.target.name;
            var fields = document.querySelectorAll("#emp-data-inp"+val);
            for(let j=0;j<fields.length;j++){
                fields[j].disabled = false;
            }

        })
    }

}

document.body.addEventListener('load',edit_details(),false);


function save_details(){
    var save = document.querySelectorAll("#save");

    for(let i=0;i<save.length;i++){
        save[i].addEventListener('click',(e)=>{
            // e.preventDefault();
            const val = e.target.name;
            var form_name = "details"+val;
            var new_data = Object.fromEntries(new FormData(document.getElementById(form_name)).entries());
        
            if(Object.keys(new_data).length!=0){
                for(var key in new_data){
                    if(new_data[key]==""){
                        new_data[key] = document.getElementsByClassName(key+i)[0].getAttribute('placeholder');
                    }
                }
                
                new_data.image = database.employees[val].image;
                database.employees[val] = new_data;
                display.innerHTML="";
                 document.getElementById("created_modals").innerHTML="";
                show_emp(database);
                edit_details();
                save_details();
                count_param();
            }            
        })
    }
}

document.body.addEventListener('load',save_details(),false);

//count the no of objects of each filter

function count_param(){
    var all_filters = document.querySelectorAll('.filter-btn');
    for(let i=0;i<all_filters.length;i++){
        var key = all_filters[i].name;
        var val = all_filters[i].value;
        var ans="";
        if(key=="dept"){
           ans =  helper_count_param("dept",val);
        }
        else if(key=="office"){
            ans =  helper_count_param("office",val);
        }
        else{
            ans =  helper_count_param("jobtitle",val);
        }

        all_filters[i].innerHTML = val+"("+ans+")";
    }
}

function helper_count_param(prop,val){
    var c=0;
    for(let i=0;i<database.employees.length;i++){
        if(database.employees[i][prop] == val) {
            c++;
        }
    }

    return c;
}

document.body.addEventListener("load",count_param(),false);


//responsive toggle

var toggle = document.getElementsByClassName("toggle")[0];
var hide = document.getElementById("inp1");
var bool = true;
toggle.addEventListener('click',()=>{
    var tar = document.getElementsByClassName('body-left')[0];
    if(bool){
    tar.style.display="block";
    tar.style.position = "absolute";
    tar.style.background = "white";
    hide.style.display = "none";
    bool = false;
    }

    else{
        tar.style.display = "none";
        hide.style.display = "flex";
        bool = true;
    }

})