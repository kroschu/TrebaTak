var DEBUG = false;

var _ = require('underscore'),
    kanboardApi = require('./kanboard-api');

var srv_addr = process.env.KANBOARD_ADDR || 'https://kanboard.treba.ml/kanboard' ; // set our server address
var srv_key = process.env.KANBOARD_APIKEY || '4ca502e72b4df83e49ca4071819d9ef485e60dcb9e078e0a9f3182e6efa6' ; // set our API key

// Enter the API-URL and API-Token of your Kanboard here.
kanboardApi.configureServer('https://' + srv_addr + '/jsonrpc.php', srv_key);

module.exports = function (app) {

    // server routes ===========================================================

    app.get('/api/kanboard/projects', function (req, res) {
        kanboardApi.getAllProjects().then(function (projects) {
            if(DEBUG) console.log('projects: ', projects);
            res.json(projects);
        },function(err){
            res.status(500).json(err);
        });
    });

    app.get('/api/kanboard/projects/:id/members', function (req, res) {
        kanboardApi.getMembersByProject(req.param("id")).then(function (members) {
            console.log('members: ', members);
            res.json(members);
        },function(err){
            res.status(500).json(err);
        });
    });

    app.get('/api/kanboard/users/:id/projects', function (req, res) {
        var userId = req.param("id");
        kanboardApi.getProjectsByUser(userId).then(function (projects) {
            if(DEBUG) console.log('projects for userid: ' + userId, projects);
            res.json(projects);
        },function(err){
            res.status(500).json(err);
        });
    });

    app.get('/api/kanboard/projects/:id/board', function (req, res) {
        var projectId = req.param("id");
        kanboardApi.getBoard(projectId).then(function (projects) {
            if(DEBUG) console.log('board for project: ' + projectId, projects);
            res.json(projects);
        },function(err){
            res.status(500).json(err);
        });
    });

    app.get('/api/kanboard/categories', function (req, res) {
        kanboardApi.getAllCategories().then(function (categories) {
            if(DEBUG) console.log('categories: ', categories);
            res.json(categories);
        },function(err){
            res.status(500).json(err);
        });
    });

};
