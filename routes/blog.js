const express = require('express');
const blogController = require('./../controllers/controlBlog');
const appConfig = require('./../config/appConfig');
const example = require('./../middlewares/example');

let setRouter = (app) => { 
    let baseUrl = appConfig.apiVersion+'/blogs';

    app.get(baseUrl+'/all',blogController.getAllBlog);
    app.get(baseUrl+'/view/:blogId',example.exampleMWare,blogController.viewByBlogId);
    app.get(baseUrl+'/view/by/author/:author',blogController.viewByAuthor);
    app.get(baseUrl+'/view/by/category/:category',blogController.viewByCategory);

    app.post(baseUrl+'/delete/:blogId',blogController.deleteBlog);
    app.put(baseUrl+'/edit/:blogId',blogController.editBlog);
    app.post(baseUrl+'/create',blogController.createBlog);

    app.get(baseUrl+'/:blogId/count/view',blogController.increaseBlogView);

}

module.exports = {
    setRouter : setRouter
}