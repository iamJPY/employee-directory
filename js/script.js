$(document).ready(function() {

// Call to Random User Generator API to generate 12 employees
$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
    console.log(data);
    let photosHTML;

    $.each(data.results, function(i, employee) {
      photosHTML += '<td class="employee-profile">';
      photosHTML += '<a href="' + '">';
      photosHTML += '<img src="' + employee.picture.large + '" class="employee-picture">';
      photosHTML += '<div class="employee-info">';
      photosHTML += '<p class="name">' + employee.name.first + ' ' + employee.name.last + '</p>';
      photosHTML += '<p class="email">' + employee.email + '</p>';
      photosHTML += '<p class="city">' + employee.location.city + '</p>';
      photosHTML += '</a></td>';
    });

    $('.employees').html(photosHTML);
  }
});

});
