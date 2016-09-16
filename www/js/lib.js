function parseDateTime(params) {
    var yyyy  = params.substr(0,4);
    var mm    = params.substr(4,2);
    var dd    = params.substr(6,2);
    var hh    = params.substr(9,2);
    var MM    = params.substr(11,2);
    var ss    = params.substr(13,2);
    var UTC_h   = params.substr(16,2);
    var UTC_m   = params.substr(18,2);

    //readble format to read from teamctiy
    return (yyyy+"-"+mm+"-"+dd+"T"+hh+":"+MM+":"+ss+"-"+UTC_h+":"+UTC_m);
}
