$(document).ready(function() {

  let employeeList = [];

  // Get employee data results from API call to Random User Generator and display directory
  let getEmployeeData = (employeeData) => {
    employeeList = employeeData;
    displayEmployeeDirectory(employeeList); // Call function to display employeeList data
  }

  // Display current listing of employees in the main employee directory
  let displayEmployeeDirectory = (list) => {
    let profile ='';

    $.each(list, function(i, employee) {
      profile += '<td class="employee-profile" id=' + i + '>';
      profile += '<a href="#openModal' + i + '">';
      profile += '<img src="' + employee.picture.large + '" class="employee-picture">';
      profile += '<div class="employee-info">';
      profile += '<p class="name">' + employee.name.first + ' ' + employee.name.last + '</p>';
      profile += '<p class="email">' + employee.email + '</p>';
      profile += '<p class="city">' + employee.location.city + '</p>';
      profile += '</div></a></td>';
    });

    $('.employees').html(profile);
    loadModals(list); // Call function to load/update modal windows with employee data
  }

  // Load modal containers with employee details from the current employee listing
  let loadModals = (list) => {
    let modal = '';

    $.each(list, function(i, employee) {
      let prev = i-1;
      let next = i+1;

      modal += '<div id="openModal' + i + '" class="modalDialog"><div>';
      modal += '<img src="' + employee.picture.large + '" class="employee-picture-details">';
      modal += '<div class="employee-info-details">';
      modal += '<p class="name">' + employee.name.first + ' ' + employee.name.last + '</p>';
      modal += '<p class="email">' + employee.email + '</p>';
      modal += '<p class="city">' + employee.location.city + '</p><hr>';
      modal += '<p>' + employee.cell + '</p>';
      modal += '<p>' + employee.location.street + ' ' + employee.location.city + ', ' + employee.location.state + ' ' + employee.location.postcode + '</p>';
      modal += '<p>' + formatBirthdate(employee.dob) + '</p>';
      modal += '<div><a href="#close" title="Close" class="close">X</a></div>';
      modal += '<div><a href="#openModal' + prev + '" class="prev"><</a><a href="#openModal' + next + '" class="next">></a></div>';
      modal += '</div></div>';
      modal += '</div>';

    });

    $('#modals').html(modal);

    // If there is only one result, remove previous/next buttons from modal window
    if (list.length === 1) {
      $('.prev').hide();
      $('.next').hide();
    } else if (list.length > 1) {
      $('.prev').get(0).remove(); // Remove previous button link from first modal window
      $('.next').get(list.length-1).remove(); // Remove next button link from last modal window
    }
  }

  // Format birthdate
  let formatBirthdate = (dob) => {
    let dobString = dob.split('-');
    let dobDay = dobString[2].substring(0, 2);
    let birthday = 'Birthday: ' + dobString[1] + '/' + dobDay + '/' + dobString[0];
    return birthday;
  }

  // Filter feature - allow to filter by employee name or username
  let $filterContainer = $('<div id="filterSection">');
  let $filterInputField = $('<input type="search" id="filter" placeholder="Filter">');
  $($filterContainer).append($filterInputField);
  $('header').append($filterContainer);

  // Filter function displays employee info based on query
  let filter = () => {
    let $filterValue = $('#filter').val().toUpperCase();
    let filteredList = [];

    $.each(employeeList, function(i, employee) {
      let employeeName = employee.name.first + ' ' + employee.name.last;
      let employeeUsername = employee.login.username;

      if (employeeName.toUpperCase().indexOf($filterValue) > -1 || employeeUsername.toUpperCase().indexOf($filterValue) > -1) {
        filteredList.push(employee);
      }
    });

    displayEmployeeDirectory(filteredList); // Call function to display filteredList data

    // Display No Results message if filteredList is empty
    if (filteredList.length === 0) {
      let noResults = '<p>No Results Found</p>';
      $('.employees').append(noResults);
    }
  }

  $('#filter').on('keyup', filter); // Filter field event handler

  // AJAX Call to Random User Generator API to generate 12 employees
  $.ajax({
    url: 'https://randomuser.me/api/?results=12&seed=lovers&nat=us',
    dataType: 'json',
    success: function(data) {
      getEmployeeData(data.results);
    }
  });

});
