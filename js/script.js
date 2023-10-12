// destructure users object from data.js
import {users} from './data.js';

// display 10 user per page
const displayPerPage = 10;

// display each user one by one
// load all users data, then slice into selected page range
function displayUsers(users, page) {
    // starting index, starting by 0 (page1)
    const startIndex = (page - 1) * displayPerPage;
    // where to slice on users array
    const endIndex = startIndex + displayPerPage;
    const usersPerPage = users.slice(startIndex, endIndex);

    // debug use
    console.log("Users start: " + startIndex);
    console.log("Users end: " +endIndex);

    // Clear existing user list & set userList variable for later use
    const userList = document.querySelector('.contact-list');
    userList.innerHTML = '';

    // Loop each object in array and display into a li block
    usersPerPage.forEach(user => {
        // split User first and last name for email username
        const email = user.name.split(' ');
        let userHTML = `
            <li class="contact-item cf">
                <div class="contact-details">
                    <img class="avatar" src="${user.image}">
                    <h3>${user.name}</h3>
                    <span class="email">${email[0]}.${email[1]}@example.com</span>
                </div>
                <div class="joined-details">
                    <span class="date">Joined ${user.joined}</span>
                </div>
            </li>
        `;
        // adding each li block into contact list ul block
        userList.insertAdjacentHTML('beforeend', userHTML);
    });
}

// Function to handle pagination
function handlePagination(users) {
    //calculate the total page by using Math.ceil
    const totalPages = Math.ceil(users.length / displayPerPage);
    // set default page
    let currentPage = 1;
    //debug
    console.log("total page: " + totalPages);

    // update total contacts
    document.querySelector('.page-header h3').innerText = "Total: " + users.length; 

    // display the first page when webpage loaded
    displayUsers(users, currentPage);

    // selecting pagination class
    const pageBtn = document.querySelector('.pagination li');

    // generate the page button <a> element by number of total page
    for(let i=1; i <= totalPages; i++){
        pageBtn.insertAdjacentHTML('beforeend',`<a href="#">${i}</a>`);
    };

    // add event listern to each page button
    // get button text when user click into pageNum, then display as per request
    pageBtn.addEventListener('click', (event)=> {
        var pageNum = event.target.textContent;
        displayUsers(users, pageNum);

        //debug
        console.log("page: " + pageNum)
    }
    );


}

// Call the pagination function with the imported users data
handlePagination(users);

