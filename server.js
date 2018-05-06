const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'hacktilldawn',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }));

app.use(bodyParser.json());
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/raveMomApi');

var UsersSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    friends: {type: Array},
    friendRequests: {type: Array},
}, {timestamps:true, usePushEach: true});

var CoordsSchema = new mongoose.Schema({
    _id: {type: String},
    coords: {type: Object}
}, {timestamps: true});

mongoose.model('User', UsersSchema);
mongoose.model('Coords', CoordsSchema);
var User = mongoose.model('User');
var Coords = mongoose.model('Coords');

app.get('/', function(req, res) {
    // 
});

app.post('/register', function(req, res) {
    var user = new User(req.body);
    user.save(function(err, savedUser) {
        if(err) {
            console.log(err);
            res.json({message: "Error", error: err});
        } else {
            req.session.id = savedUser._id;
            res.json({message: "Success", data: savedUser});
        }
    });
});

app.post('/login', function(req, res) {
    User.find({email: req.body.email}, function(err, foundUser) {
        if(err) {
            console.log(err);
            res.json({message: "Error", error: err});
        } else{
            //compare password, TODO: use bcrypt to hash
            if(foundUser[0].password == req.body.password) {
                req.session.id = foundUser[0]._id;
                res.json({message: "Success", data: foundUser[0]});
            }
        }
    });
});

app.get('/api/users', function (req, res) {
    User.find({}, function(err, foundUsers) {
        if (err) {
            console.log(err);
            res.json({message: "Error", error: err});
        } else {
            res.json({message: "Success", message: foundUsers});
        }
    })
});

app.get('/api/users/:id', function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        if (err) {
            console.log(err);
            res.json({message: "Error", error: err});
        } else {
            res.json({message: "Success", message: foundUser});
        }
    })
});

app.post('/api/users', function (req, res) {
    var user = new User(req.body);
    user.save(function(err, user) {
        if (err) {
            console.log("Error in new user: ", err);
            res.json({message: "Error", error: err});
        } else {
            res.json({message: "Success", data: user});
        }
    })
});

app.get('/api/coords', function (req, res) {
    Coords.find({}, function(err, allCoords) {
        if (err) {
            console.log(err);
            res.json({message: "Error", error: err});
        } else {
            res.json({message: "Success", data: allCoords});
        }
    })
});

app.get('/api/coords/:id', function (req, res) {
    Coords.find({user_id: req.params.id}, function (err, coord) {
        if (err) {
            console.log(err);
            res.json({message: "Error", error: err});
        } else {
            res.json({message: "Success", data: coord});
        }
    });
});

app.post('/api/coords', function(req, res) {
    let id = req.body.id || res.session.id;
    Coords.findById(id, function(err, foundCoords) {
        if (err) {
            console.log("Error finding coord: ", err);
            res.json({message: "Error", data: err});
        } else {
            if(foundCoords != null) {
                foundCoords.coords = req.body.coords;
                foundCoords.save(function(err, coords) {
                    if(err) {
                        console.log("Error saving coords: ", err);
                        res.json({message: "Error", error: err});
                    } else {
                        res.json({message: "Success", data: coords});
                    }
                });
            } else {
                var coords = new Coords(req.body);
                coords.save(function(err, coords) {
                    if (err) {
                        console.log("Error posting new coords");
                        res.json({message: "Error saving new coords", error: err});
                    } else {
                        res.json({message: "Success", data: coords});
                    }
                });
            }
        }
    })
});

app.post('/api/users/friend_request', function (req, res) {
    // Find friend by email then add their ids to the friends array
    // TODO: Get friends approval before adding them
    if(!req.session.id) {
        res.json({message: "Not logged in"});
        return
    }
    User.find({email: req.body.email}, function(err, friend) {
        if (err) {
            console.log("Error finding friend:", err);
        } else {
            User.findById(req.session.id, function(err, foundUser) {
                if (err) {
                    console.log("Error finding user: ", err);
                    res.json({message: "Error", error: err});
                } else {
                    friend[0].friendRequests.push({_id: foundUser._id, name: foundUser.name});
                    console.log("friends array: ", foundUser.friends);
                    friend[0].save(function(err, savedUser) {
                        if (err) {
                            console.log("Error saving user: ", err);
                            res.json({message: "Error", error: err});
                        } else {
                            res.json({message: "Success", data: "Successfully sent friend request to ".concat(savedUser.name)});
                        }
                    });
                }
            });
        }
    });
});

app.post('/api/users/accept_request', function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        if(err) {
            console.log(err);
            res.json({message: "Error", error: err});
        } else {
            // let arrMinusUser = foundUser.friendRequests.filter(req => {
            //     req != req.body.id
            // });
            // foundUser.friendRequests = arrMinusUser;
            let idx;
            let friend;
            for(var i in foundUser.friendRequests) {
                if (foundUser.friendRequests[i]._id == req.body.id) {
                    idx = i;
                    friend = foundUser.friendRequests[i];
                    break;
                }
            }
            foundUser.friendRequests.splice(idx);
            foundUser.friends.push(friend);
            foundUser.save(function(err) {
                if(err){
                    console.log(err);
                    res.json({message: "Error", error: err});
                } else {
                    User.findById(req.body.id, function(err, friend) {
                        if(err) {
                            console.log(err);
                            res.json({message: "Error", error: err});
                        } else {
                            friend.friends.push({_id: foundUser._id, name: foundUser.name});
                            friend.save(function(err) {
                                if (err) {
                                    console.log(err);
                                    res.json({message: "Error", error: err});
                                } else {
                                    res.json({message: "Success"});
                                }
                            })
                        }
                    });
                }
            });
        }
    })
});

// TODO:
// app.delete('/api/users/:id/remove_friend', function (req, res) {
//     // Find friend by email then delete their ids from the friends array
//     User.find({email: req.body.id}, function(err, friend) {
//         if (err) {
//             console.log("Error finding friend:", err);
//         } else {
//             User.findById(req.params.id, function(err, user) {
//                 if (err) {
//                     console.log("Error finding user: ", err);
//                     res.json({message: "Error", error: err});
//                 } else {
//                     let frUpdate = user.friends.map(friend => {
//                         friend.email != req.body.email
//                     });
//                     user.friends = frUpdate;
//                     user.save(function(err, savedUser) {
//                         if (err) {
//                             console.log("Error saving user: ", err);
//                             res.json({message: "Error", error: err});
//                         } else {
//                             res.json({message: "Success", data: savedUser});
//                         }
//                     })
//                 }
//             });
//         }
//     });
// });

app.put('/api/users/:id', function (req, res) {
    console.log(req.params.id, req.body);
    User.findByIdAndUpdate(req.params.id, req.body, function(err, formerUserData) {
        if (err) {
            console.log("error updating: ", err);
            res.json({message: "Error", error: err});
        } else {
            res.json({message: "Success", data: formerUserData});
        }
    });
});

app.delete('/api/users/:id', function(req, res) {
    User.findOneAndRemove({_id: req.params.id}, function(err) {
        if (err) {
            console.log(err);
            res.json({message: "Error", error: err});
        } else {
            Coords.findByIdAndRemove(req.params.id, function(err) {
                if (err) {
                    console.log("Error deleting ", err);
                } 
                res.json({message: "Succesfully deleted from db"});
            })
        }
    })
});

app.listen(8000, function(){
    console.log('listening on port 8000')
})