const d = document;
const subBar = d.querySelector(".sub-goal-container");
const currentSubs = d.querySelector(".sub-goal__current-subs");
const goalValue = d.querySelector(".sub-goal__goal-number");
let subs, goal;

function checkSubs(period, data) {
	switch (period) {
	  case "session":
    	return data["subscriber-session"]["count"];
      case "week":
    	return data["subscriber-week"]["count"];
      case "month":
    	return data["subscriber-month"]["count"];
      case "allTime":
    	return data["subscriber-total"].count;
    }
}

window.addEventListener('onWidgetLoad', function (obj) {
  
  	const fieldData = obj.detail.fieldData;
    	data = obj.detail.session.data;
  	goal = fieldData.subGoal;
  	position = fieldData.goalBarPosition;
  	//autoReset = fieldData.autoReset;
    	period = fieldData.subPeriod;
  	subs = 0;
  
  	subs = checkSubs(period, data);
  
  	setInterval(function() {
	    subs = checkSubs(period, data);
	}, 5 * 60 * 1000); // 5 * 60 * 1000 milsec = 5 mins
  
  	
  	/*if(autoReset === "yes") {
    		subs = subs % goal;
    	}*/
  
  	currentSubs.innerText = subs;
  	goalValue.innerText = goal;
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
  
	if (listener === 'subscriber') {
        subs = parseInt(subs)+1;
      
      	/*if(autoReset === "yes") {
    		subs = subs % goal;
    	}*/
      	
      	currentSubs.innerText = subs;
      
      	subBar.style.setProperty('--bar-width', (subs/goal * 100) + '%');
    }
});
