const express = require('express');
const blogController = require('./../controllers/controlBlog');
const appConfig = require('./../config/appConfig');
const example = require('./../middlewares/example');
const authenticate = require('./../middlewares/auth');

let setRouter = (app) => { 
    let baseUrl = appConfig.apiVersion+'/blogs';

    app.get(baseUrl+'/all/:authToken',authenticate.isAuth,blogController.getAllBlog);
    app.get(baseUrl+'/view/:blogId',authenticate.isAuth,example.exampleMWare,blogController.viewByBlogId);

    

    app.get(baseUrl+'/view/by/author/:author',authenticate.isAuth,blogController.viewByAuthor);
    app.get(baseUrl+'/view/by/category/:category',authenticate.isAuth,blogController.viewByCategory);

    app.post(baseUrl+'/delete/:blogId',authenticate.isAuth,blogController.deleteBlog);
    app.put(baseUrl+'/edit/:blogId',authenticate.isAuth,blogController.editBlog);
    app.post(baseUrl+'/create',authenticate.isAuth,blogController.createBlog);

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