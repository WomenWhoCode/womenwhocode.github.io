

$(function() {
  console.log('This would be the main JS file.');
    var orgName = 'womenwhocode';
  var requri   = 'https://api.github.com/orgs/'+orgName;
  var repouri  = 'https://api.github.com/users/'+orgName+'/repos';

  requestJSON(requri, function(json) {
    
    if(json.message == "Not Found" || orgName == '') {
      $('#ghapidata').html("<h2>No repositories found</h2>");
    }
    
    else {
      // else we have a repo and we display their info
      var fullname   = json.name;
      var orgName   = json.login;
      var aviurl     = json.avatar_url;
      var profileurl = json.html_url;
      var location   = json.location;
      var followersnum = json.followers;
      var followingnum = json.following;
      var reposnum     = json.public_repos;
      
      if(fullname == undefined) { fullname = orgName; }
      
      var outhtml = '<h3>Listing of repositories under <a href="'+profileurl+'" target="_blank">'+orgName+'</a> ('+reposnum+')</h3></span>';
      
      outhtml = outhtml + '<div class="repolist clearfix">';
      
      
      var repositories;
      $.getJSON(repouri, function(json){
        repositories = json;   
        outputPageContent();                
      });          
      
      function outputPageContent() {
        if(repositories.length == 0) { 
          outhtml = outhtml + '<p>No repos!</p></div>'; 
        }
        else {
          $.each(repositories, function(index) {
            outhtml = outhtml + '<li><h4><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a><h4></li>';
          });
          outhtml = outhtml + '</ul></div>'; 
        }
        $('#ghapidata').html(outhtml);
      } // end outputPageContent()
    } // end else statement
  }); // end requestJSON Ajax call
});

function requestJSON(url, callback) {
  $.ajax({
    url: url,
    complete: function(xhr) {
      callback.call(null, xhr.responseJSON);
    }
  });
}