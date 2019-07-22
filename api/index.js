const express = require('express');
const Router = express.Router({mergeParams : true});
const TempratureController = require('./tempratureProcessor');

// definign the end points for apis
Router.get('/api/processtemprature', TempratureController.processTemprature);

module.exports = Router;
