var buildMonth = function(year, month) {
  let d = new Date(year, month, 1);
  let $table = $('<table/>', { 'class': 'month' });

  let $tr;
  let $td;

  $tr = $('<tr/>');
  $table.append($tr);

  for (let i = 0; i < 7; i++) {
    let $th = $('<th/>').text('SuMoTuWeThFrSa'.substring(i * 2, i * 2 + 2));
    $tr.append($th);
  }

  $tr = $('<tr/>');
  $table.append($tr);

  let dow = d.getDay();
  for (let i = 0; i < dow; i++) {
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
    for (let i = dow; i < 7; i++) {
      $td = $('<td/>');
      $tr.append($td);
    }
  }

  return $table;
};

var buildYear = function(year, monthsInRow) {
  let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
  let $table = $('<table/>', { 'class': 'year' });

  let $tr = $('<tr/>');
  $table.append($tr);

  let $th = $('<th/>', { 'colspan': monthsInRow }).text(year);
  $tr.append($th);

  for (let month = 0; month < 12; month++) {
    if (month % monthsInRow == 0) {
      $tr = $('<tr/>');
      $table.append($tr);
    }

    let $td = $('<td/>');
    $tr.append($td);
    $td.append($('<div/>', { 'class': 'month-name' }).text(monthNames[month]));
    $td.append(buildMonth(year, month));
  }

  return $table;
};

var buildGrid = function(fromYear, toYear, yearsInRow) {
  let $table = $('<table/>', { 'class': 'group' });

  let $tr;
  for (let year = fromYear; year <= toYear; year++) {
    if ((year - fromYear) % yearsInRow == 0) {
      $tr = $('<tr/>');
      $table.append($tr);
    }

    let $td = $('<td/>');
    $tr.append($td);
    $td.append(buildYear(year, 3));
  }

  return $table;
};

var getArgMap = function(url) {
  url = url || window.location.href;
  let map = [];
  $.each(url.slice(url.indexOf('?') + 1).split('&'), function() {
    let hash = this.split('=');
    map[hash[0]] = hash[1];
  });

  return map;
};

$(document).ready(function() {
  let map = getArgMap();
  let $cal = buildGrid(map['start'] || 1999, map['end'] || 2018, map['rows'] || 100000);
  $('body').append($cal);
});
