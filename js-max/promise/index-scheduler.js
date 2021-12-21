function Scheduler() {
  this.list = [];
  this.maxCount = 2;
  let tempRunIndex = 0;

  this.taskStart = function() {
    for(let i = 0; i < this.maxCount; i++){
      request.bind(this)();
    }
  }

  this.add = function(promiseCreator){
      this.list.push(promiseCreator);
  }

  function request(){
    if(!this.list || !this.list.length || tempRunIndex >= this.maxCount){
        return;
    }
    tempRunIndex++;
    this.list.shift()().then(() => {
        tempRunIndex--;
        request.bind(this)();
    });
  }


}

function timeout(time) {
  return new Promise(function(resolve, reject){
    setTimeout(resolve, time);
  })
}

let scheduler = new Scheduler();

function addTask(time,order){
  scheduler.add(() => {
      return timeout(time).then(() => {
          console.log(order);
      });
  })
}

addTask(100,3);
addTask(10,2);
addTask(1,1);

scheduler.taskStart();