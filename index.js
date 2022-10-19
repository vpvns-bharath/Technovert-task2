var searchText = document.getElementsByClassName("letter")[0];
var display = document.getElementById("display");

//our database
var database = {
    employees: [
        {
            image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F08%2Fgettyimages-138426899.jpg",
            firstName: "Chandler",
            lastName: "Bing",
            preferredName: "Chandler",
            email: "cbing@gmail.com",
            jobtitle: "SharePoint Practice Head",
            office: "Seattle",
            dept: "IT",
            phone: "4444444444",
            skype: "bing@skype.in"
        },

        {
            image: "https://media.glamourmagazine.co.uk/photos/6138cab73335302f7261d22f/4:3/w_1280,h_960,c_limit/ross-geller_glamour_10aug17_cbs-sky_p.jpg",
            firstName: "Ross",
            lastName: "Geller",
            preferredName: "Ross",
            email: "ross@gmail.com",
            jobtitle: ".Net Developer Lead",
            office: "India",
            dept: "IT",
            phone: "5555812357",
            skype: "ross@skype.in"
        },

        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcU0hLxCTOw1IJdJ3vTpIZ4gI9FVuskV9BYQ&usqp=CAU",
            firstName: "Rachel",
            lastName: "Green",
            preferredName: "Rachel",
            email: "rgreen@gmail.com",
            jobtitle: "BI Developer",
            office: "Seattle",
            dept: "Sales",
            phone: "5644456897",
            skype: "rachel@skype.in"
        },

        {
            image: "https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/monica_geller_1.jpg",
            firstName: "Monica",
            lastName: "Geller",
            preferredName: "Monica",
            email: "mon@gmail.com",
            jobtitle: "Business Analyst",
            office: "India",
            dept: "Sales",
            phone: "5787791247",
            skype: "monica@skype.in"
        },

        {
            image: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_26/1349761/matt-leblanc-joey-friends-today-180629-tease.jpg",
            firstName: "Joey",
            lastName: "Tribiaani",
            preferredName: "Joey",
            email: "joey@gmail.com",
            jobtitle: "Recruiting Expert",
            office: "Seattle",
            dept: "Human Resources",
            phone: "9999988888",
            skype: "joey@skype.in"
        },

        {
            image: "https://media1.popsugar-assets.com/files/thumbor/Jag4QheIiSRDyPige1c7d6J7X68/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/07/25/859/n/1922398/1bb1be5259779df9303e84.02388163_edit_img_image_43785815_1500923262/i/Phoebe-Buffay-Quotes-From-Friends.jpg",
            firstName: "Pheobe",
            lastName: "Buffay",
            preferredName: "Phoebe",
            email: "pheobe@gmail.com",
            jobtitle: "Recruiting Expert",
            office: "India",
            dept: "Human Resources",
            phone: "4747475454",
            skype: "buffay@skype.in"
        }
    ]
}


//applying filters on the data

var filters = document.querySelectorAll("#filter");
var tmp_database = { employees: new Set() };
var dept_filter = [];
var office_filter = [];
var jobtitle_filter = [];
var letter_filter =[];

var dummy_db1 = {employees:new Set()}; //for dept matches
var dummy_db2 = {employees:new Set()}; //for office matches
var dummy_db3 = {employees:new Set()}; // for jobtitle matches
var dummy_db4 = {employees:new Set()}; // for letter matches

for(let i=0;i<filters.length;i++){
    var filter = filters[i];
    filter.addEventListener("click", (e) => {
        let isClick = e.target.nodeName === 'BUTTON';
        if (!isClick) return;
        let key = e.target.name;
        let value = e.target.value;
        // console.log(key,value);
        e.target.style.color = "black";
        e.target.style.fontWeight = "700";
        var dummy_db = { employees: new Set() };
        if (key == "dept") {
            if (dept_filter.includes(value)) {
                let idx = dept_filter.indexOf(value);
                dept_filter.splice(idx, 1);
                e.target.style.color = "black";
                e.target.style.fontWeight = "100";
            }
            else {
                dept_filter.push(value);
            }
        }
    
        if (key == "office") {
            if (office_filter.includes(value)) {
                let idx = office_filter.indexOf(value);
                office_filter.splice(idx, 1);
                e.target.style.color = "black";
                e.target.style.fontWeight = "100";
            }
            else {
                office_filter.push(value);
            }
        }
    
        if (key == "jobtitle") {
            if (jobtitle_filter.includes(value)) {
                let idx = jobtitle_filter.indexOf(value);
                jobtitle_filter.splice(idx, 1);
                e.target.style.color = "black";
                e.target.style.fontWeight = "100";
            }
            else {
                jobtitle_filter.push(value);
            }
        }

        if (key == "letter") {
            if (letter_filter.includes(value)) {
                let idx = letter_filter.indexOf(value);
                letter_filter.splice(idx, 1);
                e.target.style.color = "white";
                e.target.style.fontWeight = "100";
                e.target.style.background = "#00b1fc";
            }
            else {
                e.target.style.background = "blue";
                letter_filter.push(value);
            }
        }
    
        dummy_db1 = filter_helper(database,"dept",dept_filter);
        dummy_db2 = filter_helper(database,"office",office_filter);
        dummy_db3 = filter_helper(database,"jobtitle",jobtitle_filter);
        dummy_db4 = filter_helper(database,"letter",letter_filter);
        
        //combining dept and office filter and obtaining result1
        const common1 = {employees:new Set()};
        if(dummy_db1.employees.size == 0 && dept_filter.length==0){
             common1.employees = dummy_db2.employees;
        }
        else if(dummy_db2.employees.size==0){
             common1.employees = dummy_db1.employees;
        }
        else{
            common1.employees = new Set(
                [...dummy_db1.employees].filter(element => dummy_db2.employees.has(element))
            );
        }

        //combining jobtitle and letter and obtaining result2
        const common2 = {employees:new Set()};
        if(dummy_db3.employees.size == 0){
             common2.employees = dummy_db4.employees;
        }
        else if(dummy_db4.employees.size==0){
             common2.employees = dummy_db3.employees;
        }
        else{
            common2.employees = new Set(
                [...dummy_db3.employees].filter(element => dummy_db4.employees.has(element))
            );
        }
        
        //combining both the results

        if(common1.employees.size ==0 && dept_filter.length==0){
            dummy_db.employees = common2.employees;
        }
        else if(common2.employees.size==0 && letter_filter.length==0){
            dummy_db.employees = common1.employees;
        }
        else{
            dummy_db.employees = new Set(
                [...common1.employees].filter(element => common2.employees.has(element))
            );
        }
        
        tmp_database = dummy_db;
        var tmp_database_list = convertToList(tmp_database);
        display.innerHTML = "";
        document.getElementById("created_modals").innerHTML="";
        

        if((dummy_db1.employees.size==0 && dept_filter.length==0) && (dummy_db2.employees.size==0 && office_filter.length==0) &&
        (dummy_db3.employees.size==0 && jobtitle_filter.length==0) && (dummy_db4.employees.size==0 && letter_filter.length==0)){
                show_emp(database);
        }
       
        else{
        show_emp(tmp_database_list);
        }        
        edit_details();
        save_details();
        count_param();
        create();
    })
    
}

function filter_helper(database, key, filter) {
    var dummy_db = { employees: new Set() };
    if(key!="letter"){
        for (let i = 0; i < filter.length; i++) {
            var val = filter[i];
            for (let j = 0; j < database.employees.length; j++) {
                if (database.employees[j][key] == val) {
                    dummy_db.employees.add(database.employees[j]);
                }
            }
        }
    }
    else{
        for (let i = 0; i < filter.length; i++) {
            var val = filter[i];
            var dummy_letter_db = {employees:new Set()};
            for (let j = 0; j < database.employees.length; j++) {
                if (database.employees[j].firstName.toUpperCase().startsWith(val)) {
                    dummy_letter_db.employees.add(database.employees[j]);
                }
            }

            if(dummy_letter_db.employees.size!=0){
                dummy_db.employees = new Set([...dummy_db.employees].concat([...dummy_letter_db.employees]))
            }
            else{
                dummy_db.employees = new Set();
            }
        }
    }
    // console.log(dummy_db);
    return dummy_db;
}

function convertToList(dummy_db) {
    var dummy_db_list = { employees: [] }
    dummy_db.employees.forEach(element => {
        dummy_db_list.employees.push(element);
    });
    return dummy_db_list;
}

//view more functionality
var view_more_btn = document.getElementsByClassName("view-btn")[0];
var isViewMore = false;
view_more_btn.addEventListener("click", () => {
    if (!isViewMore) {
        document.getElementsByClassName("view-more")[0].style.display = "block";
        view_more_btn.innerHTML = "View Less..";
        isViewMore = true;
    }

    else {
        document.getElementsByClassName("view-more")[0].style.display = "none";
        view_more_btn.innerHTML = "View More..";
        isViewMore = false;
    }
})


//searching functionality
var search = document.getElementById("inp");
search.addEventListener("keydown", (e)=>{
    if(e.key=="Enter")
    {
        let option = document.getElementById("drop").value;
        let search_value = search.value.toUpperCase();
    // console.log(search_value);
        let items = display.querySelectorAll(".emp-card");
        for (let i = 0; i < items.length; i++) {
            let item = items[i].querySelector('.emp-text');
            let tar = item.getElementsByClassName(option)[0].innerHTML.toUpperCase();
            // console.log(tar);
            if (!tar.startsWith(search_value)) {
                items[i].style.display = "none";
            }
            else {
                items[i].style.display = "initial";
            }
        }
    }
});


var clear = document.getElementById("clear");
clear.addEventListener("click",clear_data);

function clear_data(){
    search.value = "";
    display.innerHTML="";
    if(tmp_database.employees.size==0){
        show_emp(database);
    }
    else{
        var tmp_database_list = convertToList(tmp_database);
        show_emp(tmp_database_list);
    }
    create();
    edit_details();
    save_details();
    count_param();
    // location.reload();
}

//adding employee
var form = document.getElementById("form");
form.addEventListener("submit",add_emp);
//for creating temperory url for the image
var file = document.getElementById('file');
var tmppath="";
file.addEventListener('change',function(event){
  tmppath=URL.createObjectURL(event.target.files[0]);
  
});
var close_modal = document.getElementsByClassName("form-close")[0];
var all_inp = document.querySelectorAll(".form-control");
function add_emp(e){
    e.preventDefault();
    
    var data = Object.fromEntries(new FormData(form).entries());
    if(isValid(data['email'],data['phone']))
    {
        data['image'] = tmppath;
        database.employees.push(data);
        display.innerHTML = "";
        document.getElementById('created_modals').innerHTML="";
        show_emp(database);
        edit_details();
        save_details();
        for(let i=0;i<all_inp.length;i++){
            all_inp[i].disabled=true;
        }
        count_param();
        create();
        close_modal.style.display="block";
    }
    else{
        alert("Specified email or mobile is invalid form.Please re-enter");
    }
    //console.log(data);
}

close_modal.addEventListener("click",()=>{
    
    for(let i=0;i<all_inp.length;i++){
        all_inp[i].value="";
        all_inp[i].disabled=false;
    }

    close_modal.style.display = "none";
})

//showing the employees 
document.body.addEventListener("load", show_emp(database), false);

function show_emp(database) {
    if(database.employees.length==0){
        display.innerHTML = "No Matches Found:)"
    }
    else{
        for (let i = 0; i < database.employees.length; i++) {
            var element = document.createElement("div");
            element.setAttribute("data-bs-toggle", "modal");
            element.setAttribute("data-bs-target", "#display_fullDetails" + i);
            element.classList.add("emp-card");
            element.id = "card"+i;
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
            document.getElementById("created_modals").innerHTML = in_modal +
                `
                <div class="modal fade" id="display_fullDetails${i}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"  aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4>Employee Details</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="emp-det" id="emp-det${i}">
                                    <img class="modal-img" src="${database.employees[i].image}" alt="">
                                    <form action="" id="details${i}">
    
                                            <div class="d-flex emp-det">
                                                <label>Change Image:</label>
                                                <input type="file" name="image" class="form-control g1 image${i}" id="emp-data-inp${i}" placeholder="${database.employees[i].image}" disabled>
                                            </div>
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
                                <button type="submit" class="btn btn-outline-primary" name="${i}" id="save" >Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    
            display.appendChild(element);
    
        }
    }
}

//edit details function
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

//creating updated images path
var path="";
function create(){
path="";
for(let i=0;i<database.employees.length;i++){
    var obj = document.getElementsByClassName("image"+i)[0];
    
    obj.addEventListener("change",function(e){
        path = URL.createObjectURL(e.target.files[0]);
        
    })
}
}

document.body.addEventListener('load',create(),false);

//save details function

function save_details(){
    var save = document.querySelectorAll("#save");

    for(let i=0;i<save.length;i++){
        save[i].addEventListener('click',(e)=>{
            
            const val = e.target.name;
           // console.log(val);
            var form_name = "details"+val;
            var new_data = Object.fromEntries(new FormData(document.getElementById(form_name)).entries());
            if(isValid(new_data['email'],new_data['phone']))
            {
                if(Object.keys(new_data).length!=0){
                    new_data["image"]="";
                    for(var key in new_data){
                        if(new_data[key]==""){
                            new_data[key] = document.getElementsByClassName(key+i)[0].getAttribute('placeholder');
                        }
                    }
                    if(path!="")
                        new_data['image'] = path;
    
                    database.employees[val] = new_data;
                    var change_card = document.getElementById("card"+val);
                    change_card.innerHTML="";
                    change_card.innerHTML=`
                            <div class="emp-card-body  card-body    d-flex">
                            <div class="emp-image">
                            <img src="${database.employees[val].image}" alt="">
                            </div>
                            <div class="emp-text">
                                <h5 class="Preferred Name"><span class="First Name">${database.employees[val].firstName}</span> <span class="Last Name">${database.employees[val].lastName}</span></h5>
                                <p class="Job Title">${database.employees[val].jobtitle}</p>
                                <p class="Department">${database.employees[val].dept} department</p>
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
                    var change_modal = document.getElementById("emp-det"+val);
                    change_modal.innerHTML="";
                    change_modal.innerHTML = `
                    <img class="modal-img" src="${database.employees[val].image}" alt="">
                    <form action="" id="details${val}">
    
                            <div class="d-flex emp-det">
                                <label>Change Image:</label>
                                <input type="file" name="image" class="form-control g1 image${val}" id="emp-data-inp${val}" placeholder="${database.employees[val].image}" disabled>
                            </div>
                            <div class="d-flex emp-det">
                                <label>First Name:</label>
                                <input type="text" name="firstName" class="form-control g1 firstName${val}" id="emp-data-inp${val}" placeholder="${database.employees[val].firstName}" disabled>
                            </div>
                            <div class="d-flex emp-det">
                                <label>Last Name:</label>
                                <input type="text" name="lastName" class="form-control g1 lastName${val}" id="emp-data-inp${val}" placeholder="${database.employees[val].lastName}" disabled>
                            </div>
                            <div class="d-flex emp-det">
                                <label>Preffered Name:</label>
                                <input type="text" name="preferredName" class="form-control g1 preferredName${val}" id="emp-data-inp${val}" placeholder="${database.employees[val].preferredName}" disabled>
                            </div>
                            <div class="d-flex emp-det">
                                <label>Email: </label>
                                <input type="email" name="email" class="form-control g1 email${val}" id="emp-data-inp${val}" placeholder="${database.employees[val].email}" disabled>
                            </div>
                            <div class="d-flex emp-det">
                                <label>Job Title: </label>
                                <input type="text" name="jobtitle" class="form-control g1 jobtitle${val}" id="emp-data-inp${val}" placeholder="${database.employees[val].jobtitle}" disabled>
                            </div>
                            <div class="d-flex emp-det">
                                <label>Office: </label>
                                <input type="text" name="office" class="form-control g1 office${val}" id="emp-data-inp${val}" placeholder="${database.employees[val].office}" disabled>
                            </div>
                            <div class="d-flex emp-det">
                                <label>Department:</label>
                                <input type="text" name="dept" class="form-control g1 dept${val}" id="emp-data-inp${val}" placeholder="${database.employees[val].dept}" disabled>
                            </div>
                            <div class="d-flex emp-det">
                                <label>Phone: </label>
                                <input type="text" name="phone" class="form-control g1 phone${val}" id="emp-data-inp${val}" placeholder="${database.employees[val].phone}" disabled>
                            </div>
                            <div class="d-flex emp-det">
                                <label>Skype Id:</label> 
                                <input type="text" name="skype" class="form-control g1 skype${val}" id="emp-data-inp${val}" placeholder="${database.employees[val].skype}" disabled>
                            </div>
                    </form>
                    `;
                }
                $("#display_fullDetails"+val).modal("toggle"); 
                edit_details();
                // save_details();
                count_param();
                create(); 
                   
            }
            else{
                alert("Specified email or phone number is of invalid form. Please enter again");
                
            }
           // console.log(new_data);
                
        })

    }
}

document.body.addEventListener('load',save_details(),false);


//count the no of objects of each filter

function count_param() {
    var all_filters = document.querySelectorAll('.filter-btn');
    for (let i = 0; i < all_filters.length; i++) {
        var key = all_filters[i].name;
        var val = all_filters[i].value;
        var ans = "";
        if (key == "dept") {
            ans = helper_count_param("dept", val);
        }
        else if (key == "office") {
            ans = helper_count_param("office", val);
        }
        else {
            ans = helper_count_param("jobtitle", val);
        }

        all_filters[i].innerHTML = val + "(" + ans + ")";
    }
}

function helper_count_param(prop, val) {
    var c = 0;
    for (let i = 0; i < database.employees.length; i++) {
        if (database.employees[i][prop] == val) {
            c++;
        }
    }

    return c;
}

document.body.addEventListener("load", count_param(), false);

//displaying letter cards
document.body.addEventListener("load", show_char(), false);
function show_char() {
    for (let i = 0; i < 26; i++) {
        let code = 'A'.charCodeAt(0) + i;
        let text = String.fromCharCode(code);
        let existing = searchText.innerHTML;
        searchText.innerHTML = existing + `
        <button class="btn btn-primary search-btn" name="letter" value="${text}">${text}</button>
        `;
    }
}

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

function isValid(email,mobile){
    var b1 = true;
    var b2 = true;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email!="" && email.match(mailformat)==null){
        b1=false;
    }
    if(mobile!="" && mobile.length!=10){
        b2=false;
    }
    return b1&&b2;
}
