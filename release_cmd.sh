#!/bin/sh

set -e

make static PY3=python3

make migrate PY3=python3