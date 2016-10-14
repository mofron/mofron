function dbg_print(obj) {
    var ret_str = "";
    for (var i in obj){
        ret_str += i + "=" + obj[i] + "\n";
    }
    alert(ret_str);
}
