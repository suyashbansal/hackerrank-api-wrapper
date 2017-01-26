<?php
if ( $_SERVER['REQUEST_METHOD'] == 'POST' && !empty($_POST)) {
	//echo "{\"hi\": \"Suyash\"}";
	$input = '10 8';

	$code = 'print 14';
	$key = '<HACKERRANK_API>';
	$fields_string = '';

	//extract data from the post
	extract($_POST);

	//set POST variables
	$url = 'http://api.hackerrank.com/checker/submission.json';
	$fields = array(
	'source' => urlencode($code),
	'testcases' => urlencode(json_encode(array($input))),
	'lang' => $lang,
	'api_key' => urlencode($key)
	);

	//url-ify the data for the POST
	foreach($fields as $key=>$value) {
		$fields_string .= $key.'='.$value.'&';
	}
	// Remove extra & from right end
	rtrim($fields_string, '&');

	//open connection
	$ch = curl_init();

	//set the url, number of POST vars, POST data
	curl_setopt($ch,CURLOPT_URL, $url);
	curl_setopt($ch,CURLOPT_POST, count($fields));
	curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

	//execute post
	$result = curl_exec($ch);

	//close connection
	curl_close($ch);

	print $result;

} else {
	echo "Go Away!";
}
