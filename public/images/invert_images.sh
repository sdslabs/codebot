#!/bin/bash
for i in *.gif
do
  echo $i
  convert $i -negate $i
done