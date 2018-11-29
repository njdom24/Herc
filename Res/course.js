function Course(c, d, h, m, eH, eM, p, l)
{
    this.course = c;
    this.date = d;
    this.startHour = h;
    this.startMins = m;
    this.endHour = eH;
    this.endMins = eM;
    this.prof = p;
    this.loc = l;

    this.isEarlier = function(o)
    {
        let thisMonth = this.date.substring(0, this.date.indexOf("/"));
        let thisDay = this.date.substring(this.date.indexOf("/")+1, this.date.length);
    
        let thatMonth = o.date.substring(0, o.date.indexOf("/"));
        let thatDay = o.date.substring(o.date.indexOf("/")+1, o.date.length);

        let thisTime = parseInt(this.startHour)*60 + parseInt(this.startMins);
        let thatTime = parseInt(o.startHour*60 + parseInt(o.startMins));
    
        if(thisMonth < thatMonth)
            return true;
        else
            if(thisMonth == thatMonth)// && thisDay < thatDay)
            {
                if(thisDay < thatDay)
                    return true;
                else
                    if(thisDay == thatDay && thisTime < thatTime)
                        return true;
            }
        return false;
    }
    /*
    this.getHourString = function()
    {
        return this.time.substring(0, this.time.indexOf(":"));
    }
    this.getMinString = function()
    {
        return this.time.substring(this.time.indexOf(":")+1);
    }
    this.getHourStringEnd = function()
    {
        return this.end.substring(0, this.end.indexOf(":"));
    }
    this.getMinStringEnd = function()
    {
        return this.end.substring(this.end.indexOf(":")+1);
    }
    */
}

Course.prototype.equals = function(o)
{
    return this.course === o.course && this.date === o.date && this.startHour === o.startHour && this.startMins === o.startMins && this.endHour === o.endHour && this.endMins === o.endMins && this.prof === o.prof && this.loc === o.loc;
}
Course.prototype.toString = function()
{
    return (this.course + '<br>&emsp;&emsp;' + this.date + '<br>&emsp;&emsp;' + this.time + '<br>&emsp;&emsp;' + this.prof + '<br>&emsp;&emsp;' + this.loc + '<br>&emsp;&emsp;');
}

//TODO:
//Table has 5 days
//Get earliest day and make it the first element in the table, so on and so forth
//Iterate through arrCommon, hold a variable for the date and check when it changes