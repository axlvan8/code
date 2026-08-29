#!/bin/bash

echo "Content-type: text/html"
echo ""

echo "<!DOCTYPE html>"
echo "<html><body bgcolor=\"white\"><h2>CGI Runtime Environment</h2>"
echo "<pre>"
env || printenv
echo "</pre>"
cat -
echo "(end of input stream)</pre></body></html>"

exit 0