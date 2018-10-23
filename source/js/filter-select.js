var selectList = document.querySelector('.status-select__list');
var statusTip = document.querySelector('.status-select__tip');
var optionInStock = document.querySelector('.status-select__label--in-stock');
var optionPending = document.querySelector('.status-select__label--pending');
var optionNotAvailable = document.querySelector('.status-select__label-not-available');

statusTip.addEventListener('click', function(evt) {
  evt.preventDefault();
  selectList.classList.toggle('status-select__list--js--opened');
  statusTip.classList.toggle('status-select__tip--js--opened');
});

optionInStock.addEventListener('click', function(evt) {
  selectList.classList.toggle('status-select__list--js--opened');
  statusTip.classList.toggle('status-select__tip--js--opened');
  statusTip.innerHTML = '';
  statusTip.innerHTML = optionInStock.innerHTML;
});

optionPending.addEventListener('click', function(evt) {
  selectList.classList.toggle('status-select__list--js--opened');
  statusTip.classList.toggle('status-select__tip--js--opened');
  statusTip.innerHTML = '';
  statusTip.innerHTML = optionPending.innerHTML;
});

optionNotAvailable.addEventListener('click', function(evt) {
  selectList.classList.toggle('status-select__list--js--opened');
  statusTip.classList.toggle('status-select__tip--js--opened');
  statusTip.innerHTML = '';
  statusTip.innerHTML = optionNotAvailable.innerHTML;
});
