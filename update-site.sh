#!/bin/sh

target=../longstandingbug-site
rm -rf $target/*
cp -r _site/* $target
cd $target
git add .
git commit -am "Site update from src branch."
git push
