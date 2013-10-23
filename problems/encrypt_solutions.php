<?php
$solutions = file("solutions.txt");
foreach($solutions as &$sol)
{
    $sol = md5(sha1(trim($sol)));
}
$solutions = implode("\n", $solutions);
file_put_contents("solutions.txt",$solutions);