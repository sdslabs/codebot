<?php
include 'simple_html_dom.php';
foreach(glob("html/*") as $file)
{
	echo $file."\n";
	$html = file_get_html($file);
	$problem = $html->find(".problem_content",0);
	$problem = strip_tags($problem,"<br>,<img>,<p>");
	$file_name = basename($file,".html").".md";
	file_put_contents($file_name, $problem);
}
exit;