const d = document;
const subBar = d.querySelector(".sub-goal-container");
const currentSubs = d.querySelector(".sub-goal__current-subs");
const goalValue = d.querySelector(".sub-goal__goal-number");
let subs, goal;

window.addEventListener('onWidgetLoad', function (obj) {
  
  	const fieldData = obj.detail.fieldData;
  	subs = obj.detail.session.data["subscriber-total"].count;
  	goal = fieldData.subGoal;
  	position = fieldData.goalBarPosition;
  	currentSubs.innerText = subs;
  	goalValue.innerText = goal;
  
  	subBar.style.setProperty('--bar-width', (subs/goal * 100) + '%');
  	
  	console.log(position);
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
      	currentSubs.innerText = subs;
      
      	subBar.style.setProperty('--bar-width', (subs/goal * 100) + '%');
    }
});
