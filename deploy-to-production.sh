#!/usr/bin/env bash
. $(dirname "$0")/deploy-constants.sh

npm run generate

scp -r dist/* $SSH:$ROOT