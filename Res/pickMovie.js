function NewMovie()
{
    if(document.getElementById("MovieResult").innerHTML != "<img src=\"Res/HercLogo.png\" id=\"herc\">")
    {
        let num = Math.floor(Math.random() * 11);//0-10
        if(num > 9)//10% chance
        {
            let n = document.getElementsByClassName("content");
            n[0].style.backgroundImage = "url(Res/confetti.gif)";
            n[1].style.backgroundImage = "url(Res/confetti.gif)";
            document.getElementsByClassName("movie")[0].style.opacity = 0.7;
            
            document.getElementById("MovieResult").innerHTML = "<img src=\"Res/HercLogo.png\" id=\"herc\">";
            window.scrollTo(0,document.body.scrollHeight);
        }
        else
            document.getElementById("MovieResult").innerHTML = "The Emoji Movie!<br><br>";
    }
}