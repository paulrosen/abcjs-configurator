#!/usr/bin/env bash

#The location that all of the deployments are on this server.
BASE_DIR=/var/www/html
# The folder that will contain this deployment (often the domain name)
DIR_NAME=my-project.com
# The SSH line (That is, "ssh $SSH" should work.)
SSH=me@myserver

ROOT=$BASE_DIR/$DIR_NAME
