#!/bin/bash

while [ 1 ];
do
	xdotool getmouselocation|sed 's/x:\(.*\) y:\(.*\) screen:.*/\1, \2/'
	
done