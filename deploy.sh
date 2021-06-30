#!/usr/bin/env bash
git checkout production
git merge development
git push
git checkout development
