$(document).ready(function() {
  $(function() {
    $("#datepicker").datepicker({
      minDate: 0, // Set the minimum date to today
      dateFormat: 'yy-mm-dd', // Set the date format as desired
      beforeShow: function() {
        // Add the placeholder class to the date input field
        $("#datepicker").addClass("date-placeholder");
      },
      onSelect: function() {
        // Remove the placeholder class when a date is selected
        $("#datepicker").removeClass("date-placeholder");
      }
    });
  });
  $("#datepicker").val("Select Date");
  $(function() {
      $("#timepicker").timepicker();
  });

  var bnum, bnam, btime, bcost, classname;
  var from, to, date;
  var availableCities = [
      "kollam", "pala", "kottayam", "aalapuzha", "thiruvananthapuram", "idukki", "thiruvalla", "thrissur", "palakkad", "sulthan bathery", "adoor", "kannur", "kozhikode", "malappuram", "thiruvalla", "", "iritty", "kalpetta", "kattappana", "Kochi", "kasargod", "kothamangalam", "kumily", "banglore", "mavelikara", "munnar", "ettumanoor", "erumeli", "ernakulam", "vytilla", "cherthala", "changanassery", "Angamaly", "aluva", "mananthavady"
  ];

  $("#from-input").on("input", function() {
      var val = this.value;
      showAutocompleteList(val, "#from-list");
  });

  $("#to-input").on("input", function() {
      var val = this.value;
      showAutocompleteList(val, "#to-list");
  });

  function showAutocompleteList(val, listId) {
      $(listId).empty();
      if (!val) return;
      var matchingCities = availableCities.filter(function(city) {
          return city.toLowerCase().includes(val.toLowerCase());
      });
      if (matchingCities.length === 0) {
          $(listId).append("<div>No matching cities found</div>");
      } else {
          matchingCities.forEach(function(city) {
              $(listId).append("<div>" + city + "</div>");
          });
      }
      $(listId).css({
        'position': 'absolute',
        'top': '100%',
        'left': '0',
        'z-index': '999',
        'background-color': '#fff',
        'border': '1px solid #ccc',
        'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.2)',
        'max-height': '200px',
        'overflow-y': 'auto'
    });
  }

  $("#from-list, #to-list").on("click", "div", function() {
      var inputId = $(this).parent().attr("id") === "from-list" ? "#from-input" : "#to-input";
      $(inputId).val($(this).text());
      $(this).parent().empty();
  });

  $(".invis").hide();
  $("#page2").hide();
  $(".final").hide();

  $("#search").click(function() {
      from = $("#from-input").val();
      to = $("#to-input").val();
      date = $("#datepicker").val();

      
      if (!(from && to)) {
          alert("Please Select All Fields !");
          return false;
      }
      else if (!date) {
        alert("Please select a date!");
        return false;
      } 
      else if (from === to) {
          alert("From and To can't be same");
          return false;
      }
      $("#page1").hide();
      $("#page2").show();
      $("#busname1").html(" Superfast");
      $("#busname2").html(" Super Delux Air bus");
      $("#busname3").html(" Swift Delux");
      $("#busname4").html(" Fast Passenger");
      $("#busname5").html( " Low floor AC");
      $("#busname5").html( " AC multiaxle");
      $("tbody > tr").mouseover(function() {
          $(this).css("backgroundColor", "rgba(41, 103, 182, 0.89)");
      }).mouseout(function() {
          $(this).css("backgroundColor", "");
      });
      const tableRows = document.querySelectorAll('.bus-table-body tr');

// Add click event listener to each row
tableRows.forEach(row => {
  row.addEventListener('click', () => {
    // Remove the "selected" class from all rows
    tableRows.forEach(r => r.classList.remove('selected'));

    // Add the "selected" class to the clicked row
    row.classList.add('selected');
  });
});
      $("tbody > tr").click(function() {
          $(this).parent().children().removeClass("selected");
          $(this).addClass("selected");
      });
      $(".book").click(function() {
          bcost = $(".selected").find(".bcost").text();
          bnum = $(".selected").find(".bnum").text();
          bnam = $(".selected").find(".bnam").text();
          btime = $(".selected").find(".btime").text();
          if (!bnum) {
              alert("Please Select Your Bus !");
              return false;
          }
          $(".invis").show();
          $(".booknow").click(function() {
              classname = $('input[name="toggle"]:checked+span').text();
              $(".invis").hide(function() {
                  $("#page2").hide();
              });
              $(".index").hide();
              $(".final").show();
          });
          $(".bookcancel").click(function() {
              $(".invis").hide();
          });
          $("#From").html(from);
          $("#To").html(to);
          $(".busname").html(bnam);
          $("#number").html(bnum);
          var d = new Date();
          var n = d.toLocaleDateString();
          $("#date").html(n);
          var code = '1101001000010011101100101110111101101000111010111001100110111001001011110111011100101100100100001101100011101011';
          var table = $('#barcodes tr');
          table.empty();
          for (var i = 0; i < code.length; i++) {
              if (code[i] === '1') {
                  table.append('<td bgcolor="black"></td>');
              } else {
                  table.append('<td bgcolor="white"></td>');
              }
          }
      });
  });
}); 