<?php 
// echo "Hello I am testing PHP run server-side! <br> ";


// 1

// function file_get_contents_curl($url){
//     $ch = curl_init();
//     curl_setopt($ch, CURLOPT_HEADER, 0);
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//     curl_setopt($ch, CURLOPT_URL, $url);
//     curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
//     $data = curl_exec($ch);
//     curl_close($ch);
//     return $data;
// }

// $url = $_REQUEST["url"];
// $html = file_get_contents_curl($url);

// preg_match('/<title>(.+)<\/title>/',$html,$matches);
// $title = $matches[1];

// echo  json_encode(array("url" => $url, "title" => $title));
 

// 2

function get_title($url_to_parse){
  $str = file_get_contents($url_to_parse);
  if(strlen($str) > 0){
    $str = trim(preg_replace('/\s+/', ' ', $str)); // supports line breaks inside <title>
    preg_match("/\<title\>(.*)\<\/title\>/i", $str, $title); // ignore case
    return $title[1];
  }
}

$url = $_REQUEST["url"];
$title = get_title($url);

// echo get_title($url);
echo json_encode(array( "url" => $url, "title" => $title ));

?>
