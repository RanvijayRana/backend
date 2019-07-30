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

    /**
     *  @api {post} /api/v1/blogs/create Create blog
     *  @apiVersion 0.0.1
     *  @apiGroup create
     * 
     *  @apiParam {String} authToken the token for authentication (send a squery param)
     *  @apiParam {String} title tiltle of the blog as a parameter
     *  @apiParam {String} description
     *  @apiParam {String} blogbody
     *  @apiParam {String} category
     * 
     *      @apiSuccessExample {json} Success.Response:
     *      {
     *      "error" : false,
     *      "message" : "Blog Created",
     *      "status" : 200,
     *      "data" : [
     *              {
     *                  bloogId : "string",
     *                  title: "string",
     *                  description : "string"
     *              }
     *          ]
     *      }
     */

    app.get(baseUrl+'/:blogId/count/view',blogController.increaseBlogView);

}

module.exports = {
    setRouter : setRouter
}