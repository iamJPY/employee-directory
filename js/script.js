$(document).ready(function() {

  // Call to Random User Generator API to generate 12 employees
  $.ajax({
    url: 'https://randomuser.me/api/?results=12&seed=coffee',
    dataType: 'json',
    success: function(data) {
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
        profile += '</div></a></td>';
      });

      $('.employees').html(profile);

      $.each(data.results, function(i, employee) {
        let next = i + 1;
        let prev = i - 1;

        modal += '<div id="openModal' + i + '" class="modalDialog"><div>';
        modal += '<img src="' + employee.picture.large + '" class="employee-picture">';
        modal += '<div>';
        modal += '<p class="name">' + employee.name.first + ' ' + employee.name.last + '</p>';
        modal += '<p class="email">' + employee.email + '</p>';
        modal += '<p class="city">' + employee.location.city + '</p><hr>';
        modal += '<p>' + employee.cell + '</p>';
        modal += '<p>' + employee.location.street + ' ' + employee.location.city + ', ' + employee.location.state + ' ' + employee.location.postcode + '</p>';
        // Change format of DOB
        modal += '<p>' + employee.dob + '</p>';
        modal += '<div><a href="#close" title="Close" class="close">X</a></div>';

        // Employee gallery - next and previous links to navigate through employee detail windows
        if (i === 0) {
          modal += '<a href="#openModal' + next + '" class="next">></a></div>';
        } else if (i === 11) {
          modal += '<div><a href="#openModal' + prev + '" class="prev"><</a>';
        } else {
          modal += '<div><a href="#openModal' + prev + '" class="prev"><</a>';
          modal += '<a href="#openModal' + next + '" class="next">></a></div>';
        }

        modal += '</div></div>';
        modal += '</div>';

      });

      $('#modals').html(modal);

    }
  });

});
