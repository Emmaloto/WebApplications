<!doctype html>
<!-- https://www.youtubescreenshot.com/ -->
<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Hyperlinked Text Generator</title>
  <link rel="shortcut icon" href="https://cdn.icon-icons.com/icons2/1626/PNG/512/3775736-backlink-chain-connection-link-multimedia_108983.png" />

  <!-- Styling -->
  <!--link href="bootstrap/css/bootstrap.min.css" rel="stylesheet"-->
  <!--link href="myStyle.css" rel="stylesheet"-->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

  <style type="text/css">
    .jumbotron {
      margin: 80px 0;
      text-align: center;
      background-color: #a6a6a6;
    }
    .jumbotron h1 {
      font-size: 80px;
      line-height: 1;
    }
    .jumbotron .lead {
      font-size: 24px;
      line-height: 1.25;
    }

    .results {
      padding: 1.5rem;
      margin-right: 0;
      margin-left: 0;
      border-width: .2rem;
      position: relative;
      padding: 1rem;
      margin: 1rem -15px 0;
      border: solid #202020;
      border-width: .3rem 0 0;

      background-color: #e9ecef;
    }

    .screenshots {display:none;}
    
    .hd {text-align:center;}
    
    ul.thumbnails {padding-top:30px;}
    
    .footer {text-align:center; font-weight: bold}

    .pointer {
      cursor: pointer;
    }

  </style>
</head>

<body>


<!-- AJAX -->

<script>
function getTitleWithPHP() {
  var url_with_title = document.getElementById("url-to-parse").value;

if(url_with_title !== undefined && url_with_title !== ""){
    var proxyurl = "getTitle.php?url=" + url_with_title;
  $.ajax({
    url: proxyurl,
    async: true,
    success: function(response) {
      // alert(response);
      // console.log(response);
      // console.log(JSON.parse(response).title);
      var titleObject = JSON.parse(response);
      console.log(titleObject);
      setHTMLValues(titleObject);
      // document.getElementById("demo").innerHTML = titleObject.title;
    },   
    error: function(e) {
      alert("Error! " + e);
    }
  });
}
}

function setHTMLValues(titleObject){
  if(titleObject.title !== null){
   $("#created-link").html("<a href='"+titleObject.url+"'> " + titleObject.title + " </a>");
   $("#html-code").html("&lt;a href='"+titleObject.url+"'&gt; " + titleObject.title + " &lt;/a&gt;");
  }else{
       $("#created-link").html("<a href='#'> Title Unavailable </a>");
   $("#html-code").html("&lt;a href='#'&gt; Title Unavailable &lt;/a&gt;");
  }

}
</script>


<!-- Jumbotron -->
<div class="jumbotron">
  <h1 class="">Create Hyperlinked Header Text for URL</h1>
  <p class="lead">Paste your url and click the button to create some hyperlinked text for the url you enter. The text content will be the header of the page at the url which will link back to the url. </p>
  <!-- <form action=""> -->
  <div class="input-group mb-3">
    <input type="text" class="form-control" name="url" id="url-to-parse" placeholder="http://www.">
    <div class="input-group-append">
      <button id="url-submit" class="btn btn-primary btn-lg" type="button" onclick="getTitleWithPHP()"><b>Generate Hyperlink</b></button>
    </div>
  </div>
<!-- </form> -->
  <hr>

  <!-- Linked Text -->
  <div class="results"> 
    <h3><div>Linked Text: </div></h3> 
    <h4> <pre class="link" id="created-link"> <a href="#"> Page Header </a> </pre>  </h4>
  </div>

  <!-- HTML Link -->
  <div class="results">
    <h3><div>HTML: </div></h3>
    <h4> <code data-lang="html"> <pre id="html-code" class="link"> &lt;a&gt; Page Header &lt;/a&gt; </pre> </code> </h4>
  </div>

</div>





</body>
</html>

