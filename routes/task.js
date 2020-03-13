var express = require("express");
var router = express.Router();
const authenticationEnsurer = require("./authenticationEnsurer");
const Task = require("../models/task");
const uuid = require('uuid');
/**
 * タスクのDBへの保存は完了
 * タスクの状態を変更するためのボタン機能の実装をする必要がある、
 */

router.post("/", authenticationEnsurer, (req, res) => {
  const updatedAt = new Date();
  //console.log(req.body.task);
  const taskId = uuid.v4();

  Task.create({
    taskId: taskId,
    taskname: req.body.task || '無題のタスク',
    createdBy: req.user.id,
    updatedAt: updatedAt,
    status: '進行中',
  });
  res.redirect("/");
});

router.post('/:taskId',authenticationEnsurer,(req,res) =>{
 if(parseInt(req.query.delete)===1){
   deleteTask(req.params.taskId,() =>{
	   res.redirect('/');
   });
 }else if(parseInt(req.query.updateStatus) === 1){
   updateStatus_complete(req.params.taskId,() =>{
     res.redirect('/');
   });
  }else if(parseInt(req.query.updateStatus) === 0){
    updateStatus_active(req.params.taskId,() =>{
      res.redirect('/');
    });
   }
});

function deleteTask(taskId,done,err){
  
  Task.findOne({
    where:{taskId:taskId}
    }).then((t) =>{
      //console.log(t);
     return t.destroy();
  }).then(() =>{
    if(err) return done(err);
    done();
  });
}

function updateStatus_complete(taskId,done,err){
  Task.findOne({
    where:{taskId:taskId}
  }).then((t) =>{
    //console.log(t);
    t.update({
      status:'完了'
    });
  }).then(() =>{
  if(err) return done(err);
    done();
  });
}

function updateStatus_active(taskId,done,err){
  Task.findOne({
    where:{taskId:taskId}
  }).then((t) =>{
    //console.log(t);
    t.update({
      status:'進行中'
    });
  }).then(() =>{
  if(err) return done(err);
    done();
  });
}
module.exports = router;
