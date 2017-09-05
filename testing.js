function handleKhadi(cb){
  khaadi.find((err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
}

a
function handleAA(cb){
  aa.find((err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
}


async.series({
  one: handleKhadi(cb),
  two: handleAA(cb)
}, (err, results) => {
  if (err) {
    res.send('error');
  } else {
    res.render('blah blah');
  }
});


<!DOCTYPE html>
<html>
<body>

<p>Click the button to parse different strings.</p>

<button onclick="myFunction()">Try it</button>

<p id="demo"></p>

<script>
var price = "pkr 800";
var or_price = price.split(" ");
var or_price2 = or_price[1].split(",");
var org_price = parseInt(or_price[1]);
var org_price2 = parseInt(or_price2[1]);
var bfinalprice = 0;
var finalprice= 0;
if(org_price2 != typeof Int){
finalprice = org_price;
}else{
for(var i=0;i<org_price;i++ ){
  bfinalprice = org_price*1000;
}
finalprice = bfinalprice+org_price2;
}



var n = finalprice;
