window.addEventListener("load", init);
var alarmPrompt = "";
var timerPrompt = "";
var audio = "";
var mp3 = "";
var alarmFlag = true;
var zoneHour = 0;
var now = new Date();
var timerHour = 0;
var timerMinute = 0;
var timerSecond = 0;

function init()
{
  var c=document.getElementById("canvas");
  var ctx=c.getContext("2d");

  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  //some of this code is borrowed from http://findnerd.com/list/view/A-Concentric-Circle-Clock-Using-JavaScript-and-Canvas/22842/
  var now = new Date();
  var hours = now.getHours() + zoneHour;
  var minutes = now.getMinutes();
  var seconds = now.getSeconds(); //define seconds inside draw
  //end of borrowed code

  window.setInterval(drawHands, 20);


  function drawHands()
  {
      //when calculating the end point of the hands, the coordinates get a little tricky:
      //we have to add the cos value to the Y coordinate and sin value to the x coordinate, because the clock is not oriented like the unit circle
      //the y value must be negative becuase the clock is moving clockwise, as opposed to the counter clockwise unit circle


      now =new Date();


        ctx.beginPath();
        ctx.arc(centerX,centerY,200,0,2*Math.PI);
        ctx.fillStyle = 'lightsalmon';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(centerX,centerY,20,0,2*Math.PI);
        ctx.fillStyle = 'gray';
        ctx.fill();
        ctx.closePath();
      //draws second hand

        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.strokeStyle= "black";
        ctx.lineWidth = 1;
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX+180*Math.sin((now.getSeconds()*6)*Math.PI /180),
        centerY+180*-Math.cos((now.getSeconds()*6)*Math.PI /180));
        ctx.stroke();
        ctx.closePath();

//draw a ball when one second passes

        ctx.beginPath();
        ctx.arc((centerX+230*Math.sin((now.getSeconds()*6)*Math.PI /180)),
        (centerY+230*-Math.cos((now.getSeconds()*6)*Math.PI /180)), 3,0,2*Math.PI);
        ctx.fillStyle="gray";
        ctx.fill();
        ctx.closePath();

//clears seconds dots
    if(now.getSeconds()==0)
      {
        ctx.beginPath();
        ctx.arc(centerX,centerY, 230,0,2*Math.PI);
        ctx.lineWidth = 10;
        ctx.strokeStyle="lightgray";
        ctx.stroke();
        ctx.closePath();
      }

      //draws minutes hand
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.strokeStyle= "gray";
        ctx.lineWidth = 7;
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX+150*Math.sin(((now.getMinutes())*6)*Math.PI /180),
        centerY+150*-Math.cos(((now.getMinutes())*6)*Math.PI /180));
        ctx.stroke();
        ctx.closePath();

      //draws hours hand
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.strokeStyle= "gray";
        ctx.lineWidth = 13;
        ctx.moveTo(centerX, centerY);
        ctx.lineTo((centerX+100*Math.sin( ((now.getHours()+zoneHour)*30*Math.PI/180) +now.getMinutes()*.5*Math.PI /180)),
        (centerY+100*-Math.cos( ((now.getHours()+zoneHour)*30*Math.PI/180) +now.getMinutes()*.5*Math.PI /180)));
        ctx.stroke();
        ctx.closePath();


  }
    document.getElementById("alarmButton").addEventListener("click", setAlarm);
    document.getElementById("timerButton").addEventListener("click", setTimer);
}

function setTimer()
{
  var now = new Date();
      timerPrompt = prompt("Enter how long you want your timer to be.", "HH:MM:SS");
//figure out correct REGEX!!! --> timer will loop every 24 hours, but if 8 hour timer is set at 23:59... wat do u do
  if (timerPrompt.search(/([2][0-3]|[0-1][0-9]):[0-5][0-9]:[0-5][0-9]/) == 0)
      {
        document.getElementById("Tconfirm").innerHTML = "Your timer is set for " + timerPrompt;
        var now = new Date();
        //document current timer
        timerHour = now.getHours();
        timerMinute = now.getMinutes();
        timerSecond = now.getSeconds();
        setTimeout(ringTimer,timerPrompt.slice(0,2)*3600000+timerPrompt.slice(3,5)*60000+timerPrompt.slice(-2)*1000);
        //timerPrompt.slice(0,2)*3,600,000+timerPrompt.slice(3,5)*60,000+timerPrompt.slice(-2)*1000
      }
  else
  	{
  		alert("The expected format is MILITARY TIME: HH:MM:SS");
  	}

}

function ringTimer()
{
  if (!alarmFlag)
  {
    //do this later: document.getElementById("alarmButton").innerHTML = "STOP ALARM";
    document.getElementById('stopTimerButton').style.display = "inline-block";
    document.getElementById('stopTimerButton').addEventListener("click", stopSound);
    document.getElementById("Tconfirm").innerHTML = "";
    return;
  }
  var now = new Date();
  if (alarmFlag)
  {
    alarmFlag = false;
    startSound("bensound-littleidea.mp3");
  }

}
function setAlarm()
{
	var now = new Date();
	    alarmPrompt = prompt("Enter the time you want to sound the alarm. Enter in Military time.", "HH:MM:SS");
			if (alarmPrompt.search(/([2][0-3]|[0-1][0-9]):[0-5][0-9]:[0-5][0-9]/) == 0)
			{
        document.getElementById("Aconfirm").innerHTML = "Your Alarm is set to " + alarmPrompt;
        var now = new Date();

        window.setInterval(soundAlarm, 700);

//problem: once sound starts,the function keeps being repeated and the sound starts playing over and over again.

    	}
    	else
    		{
    			alert("The expected format is MILITARY TIME: HH:MM:SS");
    		}
		}
function soundAlarm()
{
    if (!alarmFlag)
    {
      //do this later: document.getElementById("alarmButton").innerHTML = "STOP ALARM";
      document.getElementById('stopAlarmButton').style.display = "inline-block";
      document.getElementById('stopAlarmButton').addEventListener("click", stopSound);
      document.getElementById("Aconfirm").innerHTML = "";
      return;
    }
    var now = new Date();
    if ((parseInt(alarmPrompt.slice(0,2))==now.getHours()) &&
            (parseInt(alarmPrompt.slice(3,5))==now.getMinutes()) &&
                (parseInt(alarmPrompt.slice(-2))==now.getSeconds()))
        {
          alarmFlag = false;
          startSound("bensound-littleidea.mp3");

          //var AlarmAlert= alert("Click To End Alarm");
          //AlarmAlert.addEventListener("click", stopSound("bensound-littleidea.mp3"));
        }
}



function startSound(mp3)
{
  audio = new Audio('bensound-littleidea.mp3');
  audio.play();
  //get stopAlarmButton to disapear after clicked
  document.getElementById('stopAlarmButton').style.display = "none";

}
function stopSound()
{
    audio.pause();
}


	//figure out time for alarm
