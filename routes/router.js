
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var TowCompany = require('../models/towCompany');
var ParkingSpace = require('../models/parkingSpace');
var SpaceStatus = require('../models/spaceStatus');
var SpaceStatus1 = require('../models/spaceStatus');
var Zone = require('../models/zone');
var path = require('path');
var app = require('express');
var CloudData = require('../get-message');



  var async = require('async');


// GET route for reading data
router.get('/', function (req, res, next) {
  console.log("I am here");
  return res.sendFile(path.join(__dirname + '/views/index.html'));
});
  

//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/ParkingDetails');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/ParkingDetails');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})
//post add tow company details
//POST route for updating data
router.post('/addTow', function (req, res, next) {

  console.log(req.body.name);
  if (req.body.name &&
    req.body.location &&
    req.body.address &&
    req.body.contact) {

    var towData = 
       {
      name: req.body.name,
      location: req.body.location,
      address: req.body.address,
      contact: req.body.contact,
    };
    

    // towData.save(function(err){
    //   if(err) throw err;
    //   console.log("towdata created");
    // });

    TowCompany.create(towData, function (error, towdata) {
      if (error) {
        return next(error);
      } else {
        console.log(towdata);
        return res.redirect('/addTow');
      } 
    });
  }

});

router.get('/addTow', function (req, res, next) {
  TowCompany.find({}, function(err, towdata) {
    if(err) return console.log(err);
    console.log(towdata);
    return res.render(path.resolve(__dirname + '/../views/TowingCompanyDetails.ejs'),{TowCompany:towdata});
  })
  
});
/*router.get('/parkingDetails', function (req, res, next) {

  ParkingSpace.find({}, function(err, parkdata) {
    if(err) return console.log(err);
    console.log(parkdata);
    return res.render(path.resolve(__dirname + '/../views/ParkingDetails.ejs'),{ParkingSpace:parkdata});
  })
  
});*/

router.post('/addZone', function (req, res, next) {

  console.log(req.body.name);
  if (req.body.name) {

    var zoneData = 
       {
      name: req.body.name,
    };
    
 Zone.authenticate(req.body.name, function (error, zone) {
      if (error || zone) {
        var err = new Error('Zone already exists');
        return res.redirect('/addZone');
      } else {
        req.session.userId = user._id;
        return res.redirect('/addZone');
      }
    });
    // towData.save(function(err){
    //   if(err) throw err;
    //   console.log("towdata created");
    // });

    Zone.create(zoneData, function (error, zoneData) {
      if (error) {
        return next(error);
      } else {
        console.log(zoneData);
        return res.redirect('/addZone');
      } 
    });
  }

});

router.post('/addZoneP', function (req, res, next) {

console.log("abcdefg");
  console.log(req.body.name);
   console.log(req.body.noOfLots);
    console.log(req.body.zoneName);
    if (req.body.name &&
    req.body.noOfLots &&
    req.body.zoneName) {

    var zonePData = 
       {
      name: req.body.name,
      numberOfLots: req.body.noOfLots,
      zone: req.body.zoneName,
    };
    
console.log("ZONE DATA");
        console.log(zonePData);
    ParkingSpace.create(zonePData, function (error, zonePData) {
      if (error) {
        return next(error);
      } else {
         console.log("ZONE DATA");
        console.log(zonePData);
        return res.redirect('/addZone');
      } 
    });
  }

});

router.get('/addZone', function (req, res, next) {
  var resultArray = {};
  var zoneTask=[
  function(callback)
  {
    ParkingSpace.find({}, function(err, parkdata) {
      if(err) return console.log(err);
    /* console.log(parkdata);*/

      resultArray.ParkingSpace=parkdata;
      callback();
  });
},
function(callback)
{
   Zone.find({}, function(err, zoneData) {
    if(err) return console.log(err);
    console.log("ZONE DATA");
    console.log(zoneData);
    resultArray.Zone=zoneData;
     callback();
  });
}
];

 async.parallel(zoneTask, function(err) { //This function gets called after the two tasks have called their "task callbacks"
            if (err) return next(err); //If an error occurred, let express handle it by calling the `next` function
            // Here `locals` will be an object with `users` and `colors` keys
            // Example: `locals = {users: [...], colors: [...]}`
            console.log("after here");
            res.render(path.resolve(__dirname + '/../views/Zone.ejs'),{ParkingSpace:resultArray.ParkingSpace, Zone:resultArray.Zone});
        });
  
});

router.get('/parkingDetails', function (req, res, next) {
  var resultArray = {};

  var deviceData = CloudData.data;
  console.log("abcd:");
  console.log(deviceData.data[0].data);
  
  var dataC=deviceData.data[0].data;

var spaceCData = 
       {
        zoneName: "a",
        parkingSpace:"Santa Clara University",
        lotNumber: 1,
        status: dataC.status,
        carInTime: "10:00", 
        hoursOccupied:5,
    };
      console.log("before1");
console.log(spaceCData);
console.log("before2");

/*SpaceStatus.create(spaceCData, function (error, spaceCData) {
      if (error) {
        return next(error);
      } else {
         console.log("ZONE DATA");
        console.log(spaceCData);
        return res.redirect('/addZone');
      } 
    });*/


  var tasks=[
function(callback)
{

  ParkingSpace.find({},null,{sort:{zone: 1}},function(err, parkdata) {
    if(err) return console.log(err);
    /* console.log(parkdata);*/

      resultArray.ParkingSpace=parkdata;
      callback();
  });
},
/*function(callback)
{
   SpaceStatus.find({}, function(err, spaceData) {
    if(err) return console.log(err);
     
    console.log(spaceData);
console.log(spaceData);
     resultArray.SpaceStatus=spaceData;
      callback();
     
  });
}*/
function(callback)
{
 
      resultArray.SpaceStatus=spaceCData;
      callback();

}

 
];

 async.parallel(tasks, function(err) { //This function gets called after the two tasks have called their "task callbacks"
            if (err) return next(err); //If an error occurred, let express handle it by calling the `next` function
            // Here `locals` will be an object with `users` and `colors` keys
            // Example: `locals = {users: [...], colors: [...]}`
            res.render(path.resolve(__dirname + '/../views/ParkingDetails.ejs'),{ParkingSpace:resultArray.ParkingSpace, SpaceStatus:resultArray.SpaceStatus});
        });
     
    //return res.render(path.resolve(__dirname + '/../views/ParkingDetails.ejs'),{ParkingSpace:parkData1, SpaceStatus:spaceData1});
});

router.post('/parkingDetails', function (req, res, next) {
  console.log('in parkingDetails post');

});

router.post('/parkingSpace', function (req, res, next) {
  console.log("in space status post");
  var body=req.body;
SpaceStatus.findOne({ 'parkingSpace': body.idA._id }, function(err, parkdata) {
    if(err) return console.log(err);
    return res.render(path.resolve(__dirname + '/../views/ParkingSpace.ejs'),{SpaceStatus:parkdata});
  })

});
// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          return res.render(path.resolve(__dirname + '/../views/Admin.ejs'),{user:user});

        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;