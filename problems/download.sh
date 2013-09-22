#!/bin/bash

for i in {1..430}
	do
		wget -q  "https://projecteuler.net/problem=$i" -O "html/$i.html" > /dev/null 2>&1
		echo "Problem $i done"
done