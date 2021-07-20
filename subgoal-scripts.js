const d = document;
const subBar = d.querySelector(".sub-goal-container");
const currentSubs = d.querySelector(".sub-goal__current-subs");
const goalValue = d.querySelector(".sub-goal__goal-number");
let subs, goal;

function checkSubs(period, data) {
	switch (period) {
	  case "session":
    	return 0;
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
  	const customMainFont = fieldData.customFontName;
  	const customSubFont = fieldData.lastSubCustomFont;
    data = obj.detail.session.data;
  	goal = fieldData.subGoal;
  	position = fieldData.goalBarPosition;
  	autoReset = fieldData.autoReset;
  	showSub = fieldData.showLastSub;
    period = fieldData.subPeriod;
  	subs = 0;
  
	//console.log(data);
  
  	subs = checkSubs(period, data);
  
  	setInterval(function() {
	    subs = checkSubs(period, data);
	}, 5 * 60 * 1000); // 5 * 60 * 1000 milsec = 5 mins
  
  	
  	if(autoReset === "yes") {
    	subs = subs % goal;
    }
  
  	if(customMainFont === "animal") {
    	currentSubs.classList.add("animal");
      	goalValue.classList.add("animal");
    }
  	
  	if(customSubFont === "animal") {
    	subBar.classList.add("animal");
    }
  
  	currentSubs.innerText = subs;
  	goalValue.innerText = goal;	
  
  	subBar.style.setProperty('--bar-width', (subs/goal * 100) + '%');
  	
  	if(position === "top")
  		subBar.classList.add("top");
  
  	if(showSub === "yes") {      	
    	subBar.style.setProperty('--last-sub', `"${data["subscriber-latest"]["name"]}"`);
      
      	setTimeout(() => {
          
          	let barWidth = parseInt(window.getComputedStyle(subBar, ':before').width);
      		let subWidth = parseInt(window.getComputedStyle(subBar, ':after').width);
          	let padding = 0;
          
          	console.log(`BW: ${barWidth} SW: ${subWidth} Diff: ${barWidth - subWidth}`);
          
            if(barWidth < (subWidth + currentSubs.offsetWidth + 20)) {
              	subBar.classList.add("left");
				padding = currentSubs.offsetWidth + 30;
            }
          	else {
              subBar.classList.remove("left");
            }
          
          	subBar.style.setProperty('--last-sub-offset-right', `${padding}px`);
        }, 100);
      
		if(parseInt(window.getComputedStyle(subBar, ':before').width) >= subBar.offsetWidth - (goalValue.offsetWidth + 20)) {
          	let padding = goalValue.offsetWidth + 30;
            subBar.style.setProperty('--last-sub-offset-right', `${padding}px`);
        }
    }
  
  	setTimeout(() => { subBar.classList.add("transition"); }, 500);
});

window.addEventListener('onEventReceived', function (obj) {
    if (!obj.detail.event) {
      return;
    }
  
    const listener = obj.detail.listener.split("-")[0];
    const event = obj.detail.event;
  
  	//console.log(obj);
  
	if (listener === 'subscriber') {
        subs = parseInt(subs)+1;
      
      	if(autoReset === "yes") {
    		subs = subs % goal;
    	}
      
      	if(goal - subs >= 0)
      		subBar.style.setProperty('--bar-width', (subs/goal * 100) + '%');
      
      	if(showSub === "yes") {
          	subBar.style.setProperty('--last-sub', `"${event.name}"`);
          	
          	if(parseInt(window.getComputedStyle(subBar, ':before').width) < subBar.offsetWidth - (goalValue.offsetWidth + 50)) {
              setTimeout(() => {
                let barWidth = parseInt(window.getComputedStyle(subBar, ':before').width);
                let subWidth = parseInt(window.getComputedStyle(subBar, ':after').width);
                let padding = 0;

                if(barWidth < (subWidth + currentSubs.offsetWidth + 20)) {
                  subBar.classList.add("left");
                  padding = currentSubs.offsetWidth + 30;
                }
                else {
                  subBar.classList.remove("left");
                }
                
                subBar.style.setProperty('--last-sub-offset-right', `${padding}px`);

              }, 100);
            }
          
          if(parseInt(window.getComputedStyle(subBar, ':before').width) >= subBar.offsetWidth - (goalValue.offsetWidth + 50)) {
          	let padding = goalValue.offsetWidth + 30;
            subBar.style.setProperty('--last-sub-offset-right', `${padding}px`);
          }
    	}
      	
      	currentSubs.innerText = subs;
    }
});

