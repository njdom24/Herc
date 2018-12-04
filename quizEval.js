<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
	<title>Quiz!</title>
	<link rel="stylesheet" href="Res\style.css">
	<link rel="shortcut icon" type="image/x-icon" href="Res\favicon.ico"/>
	<script src="Res\quizEval.js"></script>
</head>
<body>
	<header>
		<h1>Your Favorite Time of the Week!</h1>
		<nav class="navClass">
		<ul>
			<li><a href="index.html">Home</a></li>
			<li>Time Management
				<ul class = "sub_menu">
					<li><a href="TimeManImp.html">Importance</a></li>
					<li><a href="timeQuiz.html">Quiz</a></li>
				</ul>
				<span class="arrow">&#9660</span>
			</li>
			<li>Scheduling
				<ul class = "sub_menu">
					<li><a href = "hercschedule.html">See Professor Herc's Schedule</a></li>
					<li> <a href="compare2schedules.html">Compare 2 Schedules</a></li>
					<li><a href ="herculesoremojimovie.html">Watch Hercules or the Emoji Movie?</a></li>
				</ul>
				<span class="arrow">&#9660;</span>
			</li>
		</ul>
	</nav>
	</header>
	<div class="content">
	<button class = "button" id = "quizButton" onclick = "startQuiz()">Start Your Quiz!</button>
	<br>
	<p></p>
	<br>
	<p class = "question" >1. What is the first thing to do when trying to manage your time?</p>
	<br>
	<form>
		<br>
		<input type="radio" name="pick" id="Sleep"><label for = "Sleep">Sleep</label><br>
		<input type="radio" name="pick" id="Watch TV"><label for = "Watch TV">Watch TV</label><br>
		<input type="radio" name="pick" id="Set a goal"><label for = "Set a goal">Set a goal</label><br>
		<input type="radio" name="pick" id="Play a board game"><label for = "Play a board game">Play a board game</label><br>
	</form>
	<br>
	<p class = "question" >2. What are one of the 7 tips to manage your time?</p>
	<br>
	<form>
		<br>
		<input type="radio" name="pick" id="Don't Prioritize"><label for = "Don't Prioritize">Don't prioritize</label><br>
		<input type="radio" name="pick" id="Keep doing a task until you get it"><label for = "Keep doing a task until you get it">Keep doing a task until you get it</label><br>
		<input type="radio" name="pick" id="Don't take breaks"><label for = "Don't take breaks">Don't take breaks</label><br>
		<input type="radio" name="pick" id="Plan ahead!"><label for = "Plan ahead!">Plan ahead!</label><br>
	</form>
	<br>
	<p class ="question">3. It is recommended that one should not take breaks in between a long work period.</p>
	<br>
	<form>
		<br>
		<input type="radio" name="pick" id="True0"><label for = "True0">True</label><br>
		<input type="radio" name="pick" id="False0"><label for = "False0">False</label>
	</form>
	<br><br>
	<p class = "question" >4. Set time limits on tasks, and if you cant complete the task in a period of time, skip it and come back to it.</p>
	<br>
	<form>
		<br>
		<input type="radio" name="pick" id="True1"><label for = "True1">True</label><br>
		<input type="radio" name="pick" id="False1"><label for = "False1">False</label>
	</form>
	<br><br>
	<p class = "question" >5. Time management is important.</p>
	<br>
	<form>
		<br>
		<input type="radio" name="pick" id="True2"><label for = "True2">True</label><br>
		<input type="radio" name="pick" id="False2"><label for = "False2">False</label>
	</form>
	<br><br>
	<button class = "question" onclick = "evaluateQuiz()">Submit</button>
	<button class = "question" onclick = "resetQuiz()">Reset</a></button>
	<p id = "corrects"></p>
	</div>
</body>
</html>