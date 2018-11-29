var file1 = [];//holds lines from input 1
var file2 = [];//holds lines from input 2
//var arr1 = [];//holds Courses from file1
//var arr2 = [];//holds Courses from file2
var arrCommon = [];
var arrUncommon = [];

var openFile = function(event, num)
{
    var input = event.target;
    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function(progressEvent)
    {
        //splits by line
        var lines = this.result.split('\n');
        if (num == 1)
        {
            file1 = lines.slice(0);
        }
        else
        {
            file2 = lines.slice(0);
        }
    };
    reader.readAsText(file);
};
printAll = function(tFile)
{
    for(var line = 0; line < tFile.length; line++)
        console.log(tFile[line]);
}

test = function()
{
    printAll(file1);
    console.log("*********************************************************");
    printAll(file2);
    
    var cl1 = new Course("A", "B", "C", "D", "E");
    var cl2 = new Course("A", "B", "C", "D", "E");
    
    //console.log(cl1.equals(cl2));
    //console.log(cl1.toString());
}
compareSched = function()
{
    document.getElementById("heck").innerHTML = "";
    arrCommon = [];
    console.clear();
    let arr = [];
    let arr1 = fileToArray(file1);//holds Courses from file1
    let arr2 = fileToArray(file2);

    for(let i = 0; i < arr1.length; i++)
        for(let j = 0; j < arr2.length; j++)
            if(arr1[i].equals(arr2[j]))
                arrCommon.push(arr1[i]);

    arrCommon.sort(compare);//orders classes by date and time
    toTable(arrCommon, false);   
}
combineSched = function()
{
    document.getElementById("heck").innerHTML = "";
    arrCommon = [];
    console.clear();
    let arr = [];
    let arr1 = fileToArray(file1);//holds Courses from file1
    let arr2 = fileToArray(file2);

    for(let i = 0; i < arr1.length; i++)
        for(let j = 0; j < arr2.length; j++)
            if(arr1[i].equals(arr2[j]))
                arr2.splice(j--, 1);

    for(let i = 0; i < arr1.length; i++)
        arrCommon.push(arr1[i]);
    for(let i = 0; i < arr2.length; i++)
        arrCommon.push(arr2[i]);
    //creates an array of all classes

    arrCommon.sort(compare);//orders classes by date and time
    console.log(arrCommon);
    toTable(arrCommon, true);   
}
var fileToArray = function(f)
{
    let arr = [];
    let tName = "";
    let tDate = "";
    let tHour = "";
    let tMins = "";
    let tEndHour = "";
    let tEndMins = "";
    let tProf = "";
    let tLoc = "";

        for(let i = 0; i < f.length-10; i++)
        {
            if(f[i].indexOf("SUMMARY") != -1)
            {
                let s = f[i];
                tName = s.substring(s.indexOf(":") + 1);
                //skips 4 lines ahead
                for(let j = 0; j < 4; j++)
                {
                    //checks for end of file
                    if(i < f.length)
                        i++;
                }
                s = f[i];

                if(s.charAt(0) == 'E')
                    break;
                let index = s.indexOf(":") + 5;
                tDate = s.substring(index, index+4);
                tDate = tDate.substring(0, 2) + "/" + tDate.substring(2);
                //tTime = s.substring(index+5, index+9);
                index = s.lastIndexOf("T") + 1;
                tHour = s.substr(index, 2);
                //tTime = tTime.substring(0, 2) + ":" + tTime.substring(2);
                tMins = s.substr(index+2, 2);

                i++;
                s = f[i];
                index = s.lastIndexOf("T") + 1;
                tEndHour = s.substr(index, 2);
                tEndMins = s.substr(index+2, 2);

                //used to be 3
                //skips 2 lines ahead
                for(let j = 0; j < 2; j++)
                {
                    //checks for end of file
                    if(i < f.length)
                        i++;
                }
                s = f[i];
                tProf = s.substring(s.indexOf(" ") + 1);

                s = f[++i];
                tLoc = s.substring(s.indexOf(":") + 1);
                if(tLoc.charAt(0) == " ")
                    tLoc = tLoc.substring(1);
                
                arr.push(new Course(tName, tDate, tHour, tMins, tEndHour, tEndMins, tProf, tLoc));
            }
        }
        //hotfix for Mechanics Recitations being logged as Lectures in .ics files
        //full fix available with more test data
        if(f[f.length-5].indexOf("SUMMARY") != -1)
            arr[arr.length-1].course = f[f.length-5].substring(f[f.length-5].indexOf(":")+1)
    return arr;
}
var compFile = function(compare)
{
    if(!(file1.length == 0 || file2.length == 0))
    {
        //test();
        if(compare)
            compareSched();
        else
            combineSched();
        //combineSched();
    }
};

var toDaysArray = function(a)
{
    let curDay = "";
    let dayInd = -1;
    let days = [[],[],[],[],[]];//mon, tues, wed, thurs, fri
    for(let i = 0; i < a.length; i++)
    {
        if(curDay != a[i].date)
        {
            curDay = a[i].date;
            dayInd++;
        }
        //console.log(curDay + " : " + dayInd);
        days[dayInd].push(a[i]);
    }
    return days;
}

var toTable = function(a, canCombine)//Takes a 2D array with each nested array containing ordered classes for a specific day
{
    let ceaseRows = [0,0,0,0,0];//determines the amount of rows to skip drawing blanks for per column
    let days = toDaysArray(a);

    console.log("DAVEDAYS");
    console.log(days);
    if(canCombine)
        combineConsec(days);
    console.log(days);
    var htmlString = "<table><tr id = \"headers\"><th>Time</th><th>Monday</th> <th>Tuesday</th><th>Wednesday</th><th>Thursday</th> <th>Friday</th></tr>";

    var hour = 8;
    var mins = 0;
    let timeClass = "evenTime";
    for(var t = 0; t <= 13*4; t++)
    {
        if(t!=0 && t%4 == 0)
        {
            hour++;
            mins = 0;
        }

        let sMins = "";
        if(mins == 0)
            sMins = "00";
        else
            sMins = "" + mins;
        if(hour < 10)
            sHour = "0"+ hour;
        else
            sHour = "" + hour;

        if(hour < 12)
            htmlString += "<tr><td class = \"" + timeClass + "\">" + hour + ":" + sMins + "&nbspAM</td>";
        else if(hour == 12)
            htmlString += "<tr><td class = \"" + timeClass + "\">" + hour + ":" + sMins + "&nbspPM</td>";
        else
            htmlString += "<tr><td class = \"" + timeClass + "\">" + (hour-12) + ":" + sMins + "&nbspPM</td>";

        if(timeClass == "evenTime")
            timeClass = "oddTime";
        else
            timeClass = "evenTime";
        
        let rowClass = "";//"class = \"even\"";
        //days[0][0] = days[0][1];
        //checks if a class is running then
        for(let i = 0; i < days.length; i++)
        {
            let skipMins = (ceaseRows[i]%4)*15;
            if(mins+skipMins == 0 || mins+skipMins == 30)
                rowClass = "even";
            else
                rowClass = "odd";
            let found = false;
            //if the class's time isn't in a 15-minute spot, estimate its position*/
            for(let j = 0; j < days[i].length; j++)
            {
                if(days[i][j].date != "2")
                    if(parseInt(days[i][j].startHour) == hour + ceaseRows[i]/4 && parseInt(closestQuarter(parseInt(days[i][j].startMins))) == mins + skipMins)
                    {
                        let addRows = Math.round((parseInt(days[i][j].endHour)*60 + parseInt(closestQuarter(parseInt(days[i][j].endMins))) - parseInt(days[i][j].startHour)*60 - parseInt(closestQuarter(parseInt(days[i][j].startMins))))/15) + 1;
                        ceaseRows[i] += addRows;
                        //console.log(days[i][j].course + ", " + i + ", CEASEROWS: " + ceaseRows[i] + ", ADDROWS: " + addRows);
                        htmlString += "<td class = \"course\" rowspan = \"" + addRows + "\">" + days[i][j].course + "</td>";
                        //htmlString += "<td>" + days[i][j].course + "</td>";
                        days[i][j].date = "2";//prevents reuse
                        found = true;
                        break;
                    }
            }
            if(!found && ceaseRows[i] == 0)
                htmlString += "<td class = \"" + rowClass + "\"></td>";
            else
                ceaseRows[i]--;
        }
        //if(!found)
           // htmlString += "<td></td>";
        htmlString += "</tr>";
        mins += 15;
    }


    htmlString += "</table>";
    document.getElementById("schedule").className = "content";
    document.getElementById("heck").innerHTML = htmlString;

}

var closestQuarter = function(a)
{

    let num = 0;

    for(let i = 0; i < 4; i++)// 00, 15, 30, 45
    {
        if(a == num)
            return "" + num;
        if(a-5 == num || a+5 == num)
        {
            if(num == 0)
                return "00";
            else
                return "" + num;
        }
        num += 15;
    }
    return "60";
}

var compare = function(a,b)
{
    if(a.isEarlier(b))
        return -1;
    return 1;
}

var combineConsec = function(arr)//only works for consecutive. Takes days[][] as input
{
    for(let n = 0; n < arr.length; n++)
    {
        for(let p = 0; p < arr[n].length-1; p++)
        {
            let startTime1 = parseInt(closestQuarter(parseInt(arr[n][p].startMins))) + parseInt((arr[n][p].startHour)*60);
            let endTime1 = parseInt(closestQuarter(parseInt(arr[n][p].endMins))) + parseInt((arr[n][p].endHour)*60);
            let startTime2 = parseInt(closestQuarter(parseInt(arr[n][p+1].startMins))) + parseInt((arr[n][p+1].startHour)*60);
            let endTime2 = parseInt(closestQuarter(parseInt(arr[n][p+1].endMins))) + parseInt((arr[n][p+1].endHour)*60);

            if(arr[n][p].course.includes("Series") && arr[n][p+1].course.includes("Intro")){
            console.log(arr[n][p].course + "\n" + arr[n][p+1].course);
            
            console.log(startTime1);
            console.log("End mins: " + parseInt(closestQuarter(arr[n][p].endMins)));
            console.log("End hour: " + parseInt((arr[n][p].endHour)));

            console.log("Start mins: " + parseInt(closestQuarter(arr[n][p+1].startMins)));
            console.log("Start hour: " + parseInt((arr[n][p+1].startHour)));
            
            console.log(endTime1);
            console.log(startTime2);
            console.log(endTime2);}

            if(startTime1 == startTime2 && endTime1 == endTime2 && startTime2)
            {
                arr[n][p+1].startMins = arr[n][p].startMins;
                arr[n][p+1].startHour = arr[n][p].startHour;
                arr[n][p].startHour = "99";
            }
            else
                if(startTime2 > startTime1 && (startTime2 < endTime1 || startTime2 == endTime1 + 15))// || startTime2 == endTime1 + 15))// || startTime2 == endTime1+15) )//if one class starts in the middle of or at the end of another
                {
                    
                    console.log("leedle lee");
                    if(endTime2 >= endTime1)//if class 2 ends after class 1
                    {
                        arr[n][p+1].startMins = arr[n][p].startMins;
                        arr[n][p+1].startHour = arr[n][p].startHour;
                        arr[n][p].startHour = "99";
                    }
                    else
                        arr[n][p+1].startHour = "99";
                }
            /*
            if(parseInt(closestQuarter(arr[n][p].endMins) + 15) == (parseInt(closestQuarter(arr[n][p+1].startMins))))//if the end of one class leads into the beginning of another
            //if(parseInt(closestQuarter(arr[n][p].endMins)) < parseInt(closestQuarter(arr[n][p+1].startMins)))//if one class starts in the middle of another and ends after
            {
                arr[n][p+1].startMins = arr[n][p].startMins;
                arr[n][p+1].startHour = arr[n][p].startHour;
                arr[n][p].startHour = "99";
            }
            else
                if(closestQuarter(arr[n][p].endMins) === "45" && closestQuarter(arr[n][p+1].startMins) === 0 && (parseInt(arr[n][p].endHour)+1) === parseInt(arr[n][p+1].startHour))//if the end of one class leads into the beginning of another
                {
                    arr[n][p+1].startMins = arr[n][p].startMins;
                    arr[n][p+1].startHour = arr[n][p].startHour;
                    arr[n][p].startHour = "99";
                }
            */
        }
    }
}