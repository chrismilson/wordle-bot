#!/bin/bash

files=("./src/*.ts")
for file in ${files[@]}; do
    name=$(basename $file)
    deno compile $@ --output "build/${name}" $file
done
