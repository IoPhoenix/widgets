function get(url) {
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);
  
      req.onload = function() {
        if (req.status == 200) {
          resolve(req.response);
        }
        else {
          reject(Error(req.statusText));
        }
      };
  
      // Handle network errors
      req.onerror = function() {
        reject(Error("Network Error"));
      };
  
      // Make the request
      req.send();
    });
  }
  
  function getJSON(url) {
    return get(url).then(JSON.parse);
  }

  getJSON('quotes.json').then(function(response) {
    return response['quotes']['quote'];
  }).then(function(quote) {
    addHtmlToPage(quote);
  }).catch(function() {
    addTextToPage("Failed to show quote");
  }).then(function() {
    document.querySelector('.spinner').style.display = 'none';
  })