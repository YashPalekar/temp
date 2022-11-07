import Menu from "../utilities/menu.js";
import Reservation from "../models/reservation.js"
import BaseImplementation from "../implementation/baseImplementaion.js"

let location = window.location.pathname;
let currentPage = '';
let navLinks = document.querySelectorAll('.nav-link');
let homeBody = document.getElementById('home-body');
let menuBody = document.getElementById('menu');
let reservationBody = document.getElementById('reservation');
let resModel = new Reservation();
let implementation = new BaseImplementation('reservation');

if(location.includes('index.html')) currentPage = 'home';
else if(location.includes('menu.html')) currentPage = 'menu';
else if(location.includes('reservation.html')) currentPage = 'reservation';

function homePage() {
}

function menuPage() {
   for (let i = 0; i < Menu.length; i++) {
      let div = document.createElement('div');
      div.classList.add('col-lg-4', 'col-md-6', 'col-sm-12');
      let card = `<div class="card border-secondary mb-3 m-auto" style="max-width: 20rem;">
                     <div class="card-header ${Menu[i].type}">
                        <div class="${Menu[i].type}-icon"><div class="${Menu[i].type}-icon-circle"></div></div>
                        <img class="card-img m-auto" src="${Menu[i].imgSrc}">
                     </div>
                     <div class="card-body">
                       <h4 class="card-title">${Menu[i].dishName}</h4>
                       <p class="card-text">Price : ${Menu[i].price}₹.</p>
                     </div>
                  </div>`;
      div.innerHTML += card;
      menuBody.append(div);
   }
}

function reservationPage() {
   let date = new Date();
   date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
   document.getElementById('res-save').addEventListener('click', () => {
      resModel.name = document.getElementById('res-name').value;
      let date = new Date(document.getElementById('res-date').value);
      date = date.toLocaleDateString('en-GB');
      resModel.date = date;
      resModel.arrivalTime = document.getElementById('res-time').value;
      resModel.numOfSeats = document.getElementById('res-num').value;
      implementation.Add(resModel);
   });
   implementation.populateTable(document.getElementById('res-table'));
}

/**
 * 
 * @param {*} currentPage whatever nav link is click is saved as current page
 * this function calls page function according to the current page
 */
function refreshPage(currentPage) {
   navLinks.forEach(e => e.classList.remove('active-text'));
   switch (currentPage) {
      case 'home':
         navLinks[0].classList.add('active-text');
         console.log('home')
         homePage();
         break;
      case 'menu':
         navLinks[1].classList.add('active-text');
         menuPage();
         console.log('menu')
         break;
      case 'reservation':
         navLinks[2].classList.add('active-text');
         reservationPage();
         break;
      default:
         navLinks[0].classList.add('active-text');
         homePage();
         break;
   }
}

// on load
refreshPage(currentPage);

//getting what is clicked from navbar
navLinks.forEach(e => {
   e.addEventListener('click', (e) => {
      currentPage = e.target.innerText.toLowerCase();
      currentPage = currentPage == 'home' ? 'index' : currentPage;
      window.location.assign(`${currentPage}.html`);
   })
});

document.querySelector('.navbar-brand').addEventListener('click', () => {
   currentPage = 'home';
   refreshPage(currentPage);
});