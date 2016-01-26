CKEDITOR.replace('essay-area');

window.editor = CKEDITOR.instances["essay-area"];

if (supportsLocalStorage()) {
  if(!localStorage.getItem('essay')) {
    populateStorage();
    loadEssay();
  } else {
    loadEssay();
  }

  editor.on('change', startTimer);
  window.storageTimeoutID = 0;
  window.savingActive = false;
}

function supportsLocalStorage() {
  if (typeof (Storage) === 'undefined') {
      return false;
  }

  try {
      localStorage.getItem("___test_key");
      return true;
  } catch (e) {
      return false;
  }
}

function populateStorage() {
  localStorage.setItem('essay', editor.getData());
}

function loadEssay() {
  var currentHTML = localStorage.getItem('essay');
  editor.setData(currentHTML);
}

function startTimer (event) {
  if (storageTimeoutID) {
    clearTimeout(storageTimeoutID);
  }
  storageTimeoutID = setTimeout(onTimer, 10000, event);
}

function onTimer (event) {
  if (savingActive) {
    startTimer(event);
  } else if (event.editor.checkDirty()) {
    savingActive = true;
    populateStorage();
    $("#save").removeClass("hidden");
    window.setTimeout(function () {
      $("#save").addClass("hidden");
    }, 3000);
    savingActive = false;
  }
};

$("form").on("submit", function (event) {
  event.preventDefault();
  // get all data from the form
  var essayHTML = editor.getData();
  // need to wrap html in a div to get the first level elements (in this case p's)
  var numParagraphs = $('<div>' + essayHTML + '</div>').find("p").length;
  var wordCount = editor.plugins.wordcount.wordCount;

  var name = $("#name").val();
  var year = $("#year").val();
  var email = $("#email").val();
  var semester = $('input[name=semester]:checked').val();
  var reading = $("#reading").val();
  // successful submission condition
  if (numParagraphs === 3 && wordCount === 300 && name && year && email &&
      typeof semester !== "undefined" && reading) {
    // needed so that the form successfully gets the latest editor data
    editor.updateElement();
    $("#subject").val(name + " [TAG] [" + semester + " " + year + "] [" + reading + "]");
    $("#cc").val(email);
    $.ajax({
      url: "//formspree.io/charlesjpratt@nyu.edu",
      method: 'POST',
      data: $(this).serialize(),
      dataType: 'json',
      success: function(data) {
        if (supportsLocalStorage()) {
          if (storageTimeoutID) { clearTimeout(storageTimeoutID); }
          localStorage.removeItem("essay");
        };
        window.location.href = window.location.href + "success.html";
      }
    });
  } else {
    // if the user submits with errors a second time before 7 seconds are up
    if (typeof window.timeoutID !== "undefined") {
      window.clearTimeout(timeoutID);
      $("#errors").empty();
    }
    // needed for IE 8 and 9
    if (!name || !year || !email || typeof semester === "undefined" || !reading) {
      $("#errors").append("<li>Please fill in all fields.</li>");
    }
    if (wordCount !== 300) {
      $("#errors").append("<li>Please make sure your essay is exactly 300 words.</li>");
    }
    if (numParagraphs !== 3) {
      $("#errors").append("<li>Please make sure your essay is exactly 3 paragraphs.</li>");
    }
    // show errors
    $("#errors").removeClass("hidden");
    window.timeoutID = window.setTimeout(function () {
      $("#errors").addClass("hidden").empty();
    }, 7000);
  }
});
