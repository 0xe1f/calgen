var namesOfMonth = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var buildMonth = function(year, month) {
  var d = new Date(year, month, 1);
  var $table = $('<table/>', { 'class': 'month' });

  var $tr;
  var $td;

  $tr = $('<tr/>');
  $table.append($tr);

  for (var i = 0; i < 7; i++) {
    var $th = $('<th/>').text('SuMoTuWeThFrSa'.substring(i * 2, i * 2 + 2));
    $tr.append($th);
  }

  $tr = $('<tr/>');
  $table.append($tr);

  var dow = d.getDay();
  for (var i = 0; i < dow; i++) {
    $td = $('<td/>');
    $tr.append($td);
  }

  while (true) {
    if (d.getMonth() != month) break;
    if (dow == 0) {
      $tr = $('<tr/>');
      $table.append($tr);
    }
    $td = $('<td/>').text(d.getDate());
    $tr.append($td);

    d.setDate(d.getDate() + 1);
    dow = d.getDay();
  }

  if (dow != 0) {
    for (var i = dow; i < 7; i++) {
      $td = $('<td/>');
      $tr.append($td);
    }
  }

  return $table;
};

var buildYear = function(year, monthsInRow) {
  var $table = $('<table/>', { 'class': 'year' });

  var $tr = $('<tr/>');
  $table.append($tr);

  var $th = $('<th/>', { 'colspan': monthsInRow }).text(year);
  $tr.append($th);

  for (var month = 0; month < 12; month++) {
    if (month % monthsInRow == 0) {
      $tr = $('<tr/>');
      $table.append($tr);
    }

    var $td = $('<td/>');
    $tr.append($td);
    $td.append($('<div/>', { 'class': 'month-name' }).text(namesOfMonth[month]));
    $td.append(buildMonth(year, month));
  }

  return $table;
};

var buildGrid = function(fromYear, toYear, yearsInRow) {
  var $table = $('<table/>', { 'class': 'group' });

  var $tr;
  for (var year = fromYear; year <= toYear; year++) {
    if ((year - fromYear) % yearsInRow == 0) {
      $tr = $('<tr/>');
      $table.append($tr);
    }

    var $td = $('<td/>');
    $tr.append($td);
    $td.append(buildYear(year, 3));
  }

  return $table;
};

$(document).ready(function() {
  var $cal = buildGrid(1999,2018,3); //buildYear(2018, 3);
  $('body').append($cal);
});
