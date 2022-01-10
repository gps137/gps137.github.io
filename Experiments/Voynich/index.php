<?php
if (isset($_GET['query']) && $_GET['query'] != '') {
  $url = 'http://gpsmerge.great-site.net/api.php/records/users';
  $curl = curl_init($url . '/' . $_GET['query']);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $response = json_decode(curl_exec($curl), true);
  curl_close($curl);
  $news = $response['id'];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <title>News Searcher</title>
</head>
<body>
  <form action="" method="get">
          <label for="query">Enter your query string:</label>
          <input id="query" type="text" name="query" />
          <br />
          <button type="submit" name="submit">Search</button>
  </form>
  <br />
  <?php
  if (!empty($news)) {
          echo '<h3>' . $news . '</h3>';

  }
  ?>
</body>
</html>