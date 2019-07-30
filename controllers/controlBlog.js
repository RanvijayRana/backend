const express = require('express');
require('./../models/BlogModel');
const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('./../libs/responseLib');
const timeSet = require('./../libs/timeZone');
const check = require('./../libs/check');
const loggera = require('./../libs/loggerLib');

const BlogModel = mongoose.model('blogs');

let getAllBlog = (req, res) =>{
    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                loggera.error(err.message,'Blog Controller: getAllBlog',10);
                let apiResponse = response.generate(true, 'Failed to find Blog details', 500, null);
                res.send(apiResponse);
            }
            else if(check.isEmpty(result)){
                loggera.info('No Blog found','Blog Controller: getAllBlog',9);
                let apiResponse = response.generate(true, 'No blog found', 404, null);
                res.send(apiResponse);
            } else {
                loggera.info('Blog found','Blog Controller: getAllBlog',0);
                let apiResponse = response.generate(false, 'All blog details', 200, result);
                res.send(apiResponse);
            }
        });
}

let createBlog = (req, res) =>{
    var today = Date.now();
    let blogId = shortid.generate();

    let newBlog = new BlogModel({
        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        blogCategory: req.body.blogCategory,
        price: req.body.price,
        author: req.body.author  
    })

    let tags = (req.body.tags != undefined || req.body.tags == null 
        || req.body.tags == '') ? req.body.tags.split(',') : [];
    newBlog.tags = tags;
    newBlog.createdOn = timeSet.now();

    newBlog.save((err, result) => {
        if (err) {
            console.log(err);
            loggera.error(err.message,'Blog Controller: create Blog',10);
            let apiResponse = response.generate(true, 'Error in creating blog', 500, null);
            res.send(apiResponse);
        }
        else {
            loggera.info('Blog created','Blog Controller: createBlog',0);
            let apiResponse = response.generate(false, 'Blog creation success', 200, result);
            res.send(apiResponse);
        }
    });
}

let viewByBlogId = (req, res) => {
    console.log(req.user);
    BlogModel.findOne({ 'blogId': req.params.blogId }).
        exec((err, result) => {
            if (err) {
                console.log(err);
                let apiResponse = response.generate(true, 'Failed to find Blog details', 500, null);
                res.send(apiResponse);
            }
            else if(check.isEmpty(result)){
                let apiResponse = response.generate(true, 'No blog found', 404, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, 'Searched blog details', 200, result);
                res.send(apiResponse);
            }
        })
}

let viewByCategory = (req, res) =>{
    BlogModel.findOne({ 'category': req.params.blogCategory }).
        exec((err, result) => {
            if (err) {
                console.log(err);
                let apiResponse = response.generate(true, 'Failed to find Blog details', 500, null);
                res.send(apiResponse);
            }
            else if(check.isEmpty(result)){
                let apiResponse = response.generate(true, 'No blog found', 404, null);
                res.send(apiResponse);
            } 
            else {
                let apiResponse = response.generate(false, 'Searched blog details', 200, result);
                res.send(apiResponse);
            }
        })
}

let viewByAuthor = (req, res) =>{
    BlogModel.findOne({ 'author': req.params.author }).
        exec((err, result) => {
            if (err) {
                console.log(err);
                let apiResponse = response.generate(true, 'Failed to find Blog details', 500, null);
                res.send(apiResponse);
            }
            else if(check.isEmpty(result)){
                let apiResponse = response.generate(true, 'No blog found', 404, null);
                res.send(apiResponse);
            } 
            else {
                let apiResponse = response.generate(false, 'Searched blog details', 200, result);
                res.send(apiResponse);
            }
        })
}

let editBlog = (req, res) =>{
    let options = req.body;
    console.log(options);
    BlogModel.update({'blogId':req.params.blogId}, options, {multi : true})
        .exec((err, result) => {
            if (err) {
                console.log(err);
                let apiResponse = response.generate(true, 'Failed to edit Blog details', 500, null);
                res.send(apiResponse);
            }
            else if(check.isEmpty(result)){
                let apiResponse = response.generate(true, 'No blog found', 404, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, 'Blog editted', 200, result);
                res.send(apiResponse);
            }
        })  
}

let deleteBlog = (req, res) =>{
    BlogModel.remove({ 'blogId': req.params.blogId }).
    exec((err, result) => {
        if (err) {
            console.log(err);
            let apiResponse = response.generate(true, 'Failed to delete Blog details', 500, null);
            res.send(apiResponse);
        }
        else if(check.isEmpty(result)){
            let apiResponse = response.generate(true, 'No blog found', 404, null);
            res.send(apiResponse);
        } 
        else {
            let apiResponse = response.generate(false, 'Blog deleted', 200, result);
            res.send(apiResponse);
        }
    })
}

let increaseBlogView = (req, res) =>{
    BlogModel.findOne({ 'blogId': req.params.blogId }).
        exec((err, result) => {
            if (err) {
                console.log(err);
                let apiResponse = response.generate(true, 'Failed to find Blog details', 500, null);
                res.send(apiResponse);
            }
            else if(check.isEmpty(result)){
                let apiResponse = response.generate(true, 'No blog found', 404, null);
                res.send(apiResponse);
            } 
            else {
                result.view++;
                result.save((err, result) => {
                    if (err) {
                        let apiResponse = response.generate(true, 'some error happened to locate blog', 500, null);
                        res.send(apiResponse);
                    }else {
                        let apiResponse = response.generate(false, 'view count increased', 200, result);
                        res.send(apiResponse);
                    }
                });

            }
        })
}

module.exports = {
    getAllBlog: getAllBlog,
    createBlog: createBlog,
    viewByBlogId: viewByBlogId,
    viewByCategory: viewByCategory,
    viewByAuthor: viewByAuthor,
    editBlog: editBlog,
    deleteBlog: deleteBlog,
    increaseBlogView: increaseBlogView
}