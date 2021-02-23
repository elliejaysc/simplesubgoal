const d = document;
const subBar = d.querySelector(".sub-goal-container");
const currentSubs = d.querySelector(".sub-goal__current-subs");
const goalValue = d.querySelector(".sub-goal__goal-number");
let subs, goal;

window.addEventListener('onWidgetLoad', function (obj) {
  
  	const fieldData = obj.detail.fieldData;
  	//subs = obj.detail.session.data["subscriber-total"].count;
    data = obj.detail.session.data;
  	goal = fieldData.subGoal;
  	position = fieldData.goalBarPosition;
    period = fieldData.subPeriod;
  	subs = 0;
  
  	switch (period) {
	  case "session":
    	subs = data["subscriber-session"]["count"];
		console.log(data["subscriber-session"]["count"]);
	    break;
      case "week":
    	subs = data["subscriber-week"]["count"];
		console.log(data["subscriber-week"]["count"]);
	    break;
      case "month":
    	subs = data["subscriber-month"]["count"];
        		console.log(data["subscriber-month"]["count"]);
	    break;        
      case "allTime":
    	subs = data["subscriber-total"].count;
        		console.log(data["subscriber-month"]["count"]);
	    break;
    }
  
  
  	currentSubs.innerText = subs;
  	goalValue.innerText = goal;
  
  	//console.log("Session Subs: " + sessionSubs);
  
  	subBar.style.setProperty('--bar-width', (subs/goal * 100) + '%');
  	
  	if(position === "top")
  		subBar.classList.add("top");
  
  	setTimeout(() => { subBar.classList.add("transition"); }, 500);
});

window.addEventListener('onEventReceived', function (obj) {
    if (!obj.detail.event) {
      return;
    }
  
    const listener = obj.detail.listener.split("-")[0];
    const event = obj.detail.event;
  
  	console.log(obj);
  
	if (listener === 'subscriber') {
        subs = parseInt(subs)+1;
      	currentSubs.innerText = subs;
      
      	subBar.style.setProperty('--bar-width', (subs/goal * 100) + '%');
    }
});

