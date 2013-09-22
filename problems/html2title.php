<?php
include 'simple_html_dom.php';
$problem="";
for($i=1;$i<=430;$i++)
{
	$file_name="html/$i.html";
	$html = file_get_html($file_name);
	$problem .= $html->find("h2",0)->plaintext."\n";
}
file_put_contents("titles.md", $problem);