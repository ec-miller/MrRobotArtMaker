
//grid creator
function makeGrid() {
  var user_height = inputHeight.value;
  var user_width = inputWidth.value;
  if (user_height > 50 || user_width > 50) {
    alert('Your corporate overlords suggest you use a smaller number');
  }
  else {
    $('tr').remove();
    $('td').remove();
    for (var row = 1; row <= user_height; row ++) {
      $('table').append('<tr id="row_' + row + '"></tr>');
    }
    for (var col = 1; col <= user_width; col ++) {
      $('tr').append('<td class="default" id="col_' + col + '"></td>');
    }
    return
  }
}

//random color generator
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//make default grid on page load
makeGrid();

//customize grid size
$('#submit').on('click', function(d) {
  d.preventDefault();
  makeGrid();
})

//apply color and monitor mousedown vs. mouseup
var mouseDown = false;

//change color on mousedown, enable drag mode
$('table').on('mousedown', 'td', function(e) {
  if (e.which==3) return;
  mouseDown = true;
  var clr = colorPicker.value;
  $(this).css('background-color',clr).removeClass('default');
});

//disable drag mode
$(document).on('mouseup', function() {
  mouseDown = false;
});

//this section allows drag to apply color only if mouse is down
$('table').on('mousemove', 'td', function() {
  if (mouseDown === false) return;
  var clr = colorPicker.value;
  $(this).css('background-color',clr).removeClass('default');
});

//randomizer for a bit of fun
$('#randomizer').on('click', function() {
  var max_random_row = inputHeight.value;
  var max_random_col = inputWidth.value;
  for (var rowFinder=1; rowFinder <= max_random_row; rowFinder++) {
    for (var colFinder=1; colFinder <= max_random_col; colFinder++) {
      //.default is a class that is removed from blocks when a color is entered
      //not('.default') makes it so that only previously
      $('tr#row_' + rowFinder).find('#col_' + colFinder).not('.default').css('background-color',getRandomColor());
    }
  }
});

//fake-out save option
$('#export').on('click', function() {
  alert("Ain't nobody got time to code that! \nTake a screenshot silly pants!");
});
