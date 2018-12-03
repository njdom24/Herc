var audioGood = new Audio('Res/Dr. B Success.m4a');
var audioBad = new Audio('Res/Dr. B Failure.m4a');
var sansAudio = new Audio('Res/sansDance.mp3');
var fortnite = new Audio('Res/defaultDance.mp3');
var herc = new Audio('Res/Hercules.m4a');
var img = new Image();
var sansdance = new Image();
img.src = 'Res/sans.gif';
sansdance.src = 'Res/sansdance.gif';

function startQuiz()
{
    herc.play();
    let nodes = document.getElementsByClassName("content")[0].children;
    for(let i = 0; i < nodes.length; i++)
    {
        nodes[i].style.display = "inline";
        for(let j = 0; j < nodes[i].length; j++)
        {
            nodes[i][j].style.display = "inline";
            for(let k = 0; k < nodes[i][j].labels.length; k++)
            {
                nodes[i][j].labels[k].style.display = "inline";
            }
        }
    }
	document.getElementsByClassName("button")[0].style.display = "none";
}
function evaluateQuiz()
{
    let nodes = document.querySelectorAll("form");
	let n = document.getElementsByClassName("content")[0].style;
    let numRight = 0;
    let answers = [
    nodes[0][2].checked,
    nodes[1][3].checked,
    nodes[2][1].checked,
    nodes[3][0].checked,
    nodes[4][0].checked,
    ];

    for(let i = 0; i < answers.length; i++)
        if(answers[i])
            numRight++;
    if(numRight == 1)
        document.getElementById("corrects").innerHTML = "You got " + numRight + " answer correct!";
    else
    document.getElementById("corrects").innerHTML = "You got " + numRight + " answers correct!";

	if(numRight == 5)
	{
		audioGood.play();
		n.backgroundImage = "url(Res/sansdance.gif)";
		document.getElementById("corrects").style.color = "white";
	}
	else
	{
		audioBad.play();
		n.backgroundImage = "url(Res/sans.gif)";
		document.getElementById("corrects").style.color = "black";
	}
}

audioGood.onended = function()
{
	sansAudio.play();
}

audioBad.onended = function()
{
	fortnite.play();
}

function resetQuiz()
{
    let nodes = document.querySelectorAll("form");
    document.getElementsByClassName("content")[0].style.backgroundImage = null;
	document.getElementById("corrects").innerHTML = "";
    audioGood.pause();
	audioBad.pause();
	sansAudio.pause();
	fortnite.pause();
    for(let n = 0; n < nodes.length; n++)
        for(let p = 0; p < nodes[n].length; p++)
            nodes[n][p].checked = false;
}