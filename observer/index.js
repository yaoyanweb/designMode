class Subject {
    constructor(name){
        this.name = name;
        this.state = '😊';
        this.observers = [];
    }
    attach(o){
        this.observers.push(o);
    }
    setState(state){
        this.state = state;
        this.observers.forEach(o=>{
            o.update(this)
        })
    }

}

class Observer {
    constructor(name){
        this.name = name;
    }
    update(s){
       console.log(`${this.name}:${s.name}当前的状态是${s.state}`);
    }
}

let baby = new Subject('被观察者');
let parent = new Observer('我是观察者-1');
let parent2 = new Observer('我是观察者-2');
baby.attach(parent);
baby.attach(parent2);

baby.setState('😒');
setTimeout(()=>{
    baby.setState('🤣');
},5000)