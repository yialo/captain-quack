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

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    if (selectList.classList.contains('status-select__list--js--opened')) {
      evt.preventDefault();
      selectList.classList.remove('status-select__list--js--opened');
      statusTip.classList.remove('status-select__tip--js--opened');
    }
  }
});

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 13) {
    if (selectList.classList.contains('status-select__list--js--opened')) {
      evt.preventDefault();
      selectList.classList.remove('status-select__list--js--opened');
      statusTip.classList.remove('status-select__tip--js--opened');
    } else if (!selectList.classList.contains('status-select__list--js--opened')) {
      evt.preventDefault();
      selectList.classList.add('status-select__list--js--opened');
      statusTip.classList.add('status-select__tip--js--opened');
    }
  }
});
