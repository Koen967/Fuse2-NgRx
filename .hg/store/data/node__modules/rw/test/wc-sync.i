         z   y        ��������>�f�c�g���5®ULƝ            u#!/usr/bin/env node

var rw = require("../").dash;

console.log(rw.readFileSync(process.argv[2] || "-", "utf8").length);
