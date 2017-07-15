$(document).ready(function() {

  let employeeList = {};
  // Call to Random User Generator API to generate 12 employees
  $.ajax({
    url: 'https://randomuser.me/api/?results=12&seed=coffee&nat=us',
    dataType: 'json',
    success: function(data) {
      employeeList = data.results;
      let profile ='';
      let modal = '';

      $.each(data.results, function(i, employee) {
        profile += '<td class="employee-profile" id=' + i + '>';
        profile += '<a href="#openModal' + i + '">';
        profile += '<img src="' + employee.picture.large + '" class="employee-picture">';
        profile += '<div class="employee-info">';
        profile += '<p class="name">' + employee.name.first + ' ' + employee.name.last + '</p>';
        profile += '<p class="email">' + employee.email + '</p>';
        profile += '<p class="city">' + employee.location.city + '</p>';
        profile += '</a></td>';
      });

      $('.employees').html(profile);

      $.each(data.results, function(i, employee) {
        // Format Birthdate
        let dobString = employee.dob.split('-');
        let dobDay = dobString[2].substring(0, 2);
        let birthday = 'Birthday: ' + dobString[1] + '/' + dobDay + '/' + dobString[0];

        modal += '<div id="openModal' + i + '" class="modalDialog"><div>';
        modal += '<img src="' + employee.picture.large + '" class="employee-picture-details">';
        modal += '<div>';
        modal += '<p class="name">' + employee.name.first + ' ' + employee.name.last + '</p>';
        modal += '<p class="email">' + employee.email + '</p>';
        modal += '<p class="city">' + employee.location.city + '</p><hr>';
        modal += '<p>' + employee.cell + '</p>';
        modal += '<p>' + employee.location.street + ' ' + employee.location.city + ', ' + employee.location.state + ' ' + employee.location.postcode + '</p>';
        modal += '<p>' + birthday + '</p>';
        modal += '<div><a href="#close" title="Close" class="close">X</a></div>';
        modal += '</div></div></div>';
      });

      $('#modals').html(modal);

    }
  });

    // Filter feature - allow to filter by name or username
    // Add input field and button
    let $filterContainer = $('<div id="filterSection">');
    let $searchInputField = $('<input type="search" id="search">');
    let $filterButton = $('<input type="button" id="button" value="Filter">');
    $($filterContainer).append($searchInputField);
    $($filterContainer).append($filterButton);
    $('header').append($filterContainer);

    // Filter button event handler
    $($filterButton).click(function() {
      let $searchValue = $('#search').val().toUpperCase();

    $.each(employeeList, function(i, employee) {
      let employeeName = employee.name.first + ' ' + employee.name.last;
      let employeeUsername = employee.login.username;

      // If search input matches an employee's name or username, show relevant results
      // If search input is blank when filter is performed, then reset grid
      if (employeeName.toUpperCase().indexOf($searchValue) > -1 && $searchValue !== '') {
        $('td').hide();
        $('#' + i).show();
      } else if (employeeUsername.toUpperCase().indexOf($searchValue) > -1 && $searchValue !== '') {
        $('td').hide();
        $('#' + i).show();
      } else if ($searchValue === '') {
        $('td').show();
      }
    })
  })

});
