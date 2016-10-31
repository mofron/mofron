#!/bin/sh
SCRIPT_DIR=$(cd $(dirname $0);pwd);
php $SCRIPT_DIR/src/mofagg/ctrl.php $*;
