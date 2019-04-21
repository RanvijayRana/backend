const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema(
    {
        title:{
            type:String,
            default:'Song of Ice and Fire',
            unique:true
        },
        blogId:{
            type:String,
            default:''
        },
        blogCategory:{
            type:String,
            default:''
        },
        description:{
            type:String,
            default:''
        },
        price:{
            type:Number,
            default:''
        },
        author:{
            type:String,
            default:''
        },
        release:{
            type:Date,
            default:''
        },
        view:{
            type:Number,
            default:''
        },
        tags:[],
        createdOn:{
            type:Date,
            defaulut:Date.now()
        }
    }
);

mongoose.model('blogs', blogSchema);

