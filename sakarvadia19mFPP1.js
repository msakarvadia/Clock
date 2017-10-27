window.addEventListener("load", init);

function init()
{
  var c=document.getElementById("canvas");
  var ctx=c.getContext("2d");

  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  //some of this code is borrowed from http://findnerd.com/list/view/A-Concentric-Circle-Clock-Using-JavaScript-and-Canvas/22842/
var now = new Date();
//var time = now.toLocaleTimeString();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds(); //define seconds inside draw

//  var seconddeg = seconds*6;
  //var minutedeg = minutes*6;
  //var hourdeg = hours%12*30;

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

  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX+100*Math.sin((now.getSeconds()*6)*Math.PI /180),
  centerY+100*-Math.cos((now.getSeconds()*6)*Math.PI /180));
  ctx.stroke();
//draws minutes hand

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX+150*Math.sin((now.getMinutes()*6)*Math.PI /180),
  centerY+150*-Math.cos((now.getMinutes()*6)*Math.PI /180));
  ctx.stroke();
//draws hours hand

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
//  ctx.lineTo((centerX+200*Math.sin(now.getHours()*30*Math.PI /180+now.getMinutes()*.5*Math.PI /180)),
  //(centerY+200*-Math.cos(now.getHours()*30*Math.PI/180 +now.getMinutes()*.5*Math.PI /180)));
  ctx.lineTo((centerX+180*Math.sin( (now.getHours()*30*Math.PI/180) +now.getMinutes()*.5*Math.PI /180)),
  (centerY+180*-Math.cos( (now.getHours()*30*Math.PI/180) +now.getMinutes()*.5*Math.PI /180)));

  ctx.stroke();
}

document.getElementById("alarmButton").addEventListener("click", alarm);



}




function alarm()
{
	var now = new Date();
	var alarmPrompt = prompt("Enter the time you want to sound the alarm. Enter in Military time.", "HH:MM:SS");
			if (alarmPrompt.search(/[0-2][0-3]:[0-5][0-9]:[0-5][0-9]/) == 0)
			{
        document.getElementById("Aconfirm").innerHTML = "Your Alarm is set to " + alarmPrompt;
        var now = new Date();
				//check that the input is correct
				//check type of input, lenght of input
				//var alarmHour = alarmPrompt.slice(0,2);
				//var alarmmin = alarmPrompt.slice(3,5);
				//var alarmsec = alarmPrompt.slice(6,8);

				//print: "ur alarm will cound in __ hours, __ minutes __ seconds"

				if (parseInt(alarmPrompt.slice(0,2))==now.getHours() &&
                parseInt(alarmPrompt.slice(3,5))==now.getMinutes() &&
                    parseInt(alarmPrompt.slice(-2)==now.getSeconds()))
    				{
              var audio = new Audio('bensound-littleidea.mp3'); ///ADD In My Audio file
              audio.play();
              var AlarmAlert= alert("Click To End Alarm");
              AlarmAlert.addEventListener("click", stopSound);
    				}

    			}
    			else
    			{
    				alert("The expected format is MILITARY TIME: HH:MM:SS");
    			}
		}

  function stopSound(mp3)
  {
    var audio = new Audio(mp3);
    audio.stopSound();
  }
	//figure out time for alarm