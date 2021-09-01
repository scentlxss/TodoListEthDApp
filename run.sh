#!/bin/bash

set -m 
truffle develop &
npm run dev-front &
npm run dev-back
