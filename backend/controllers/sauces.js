
const Sauces = require("../models/sauces");
const fs = require('fs');
// exports.createSauces = (req, res, next) => {
//   const sauces = new Sauces({
//     ...req.body
//   });
//   sauces.save()
//   .then(() => {res.status(201).json({message: 'Post saved successfully!'});})
//   .catch((error) => {res.status(400).json({error: error});});
// };
exports.createSauces = (req, res, next) => {
const saucesObject = JSON.parse(req.body.sauce);
   delete saucesObject._id;
   delete saucesObject._userId;
  const sauces = new Sauces({
    ...saucesObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],

  });

  sauces.save()
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( {message : 'Erreur d\'enregistrement' })})
};

exports.getAllSauces = (req, res, next) => {
  Sauces.find()
    .then((sauces) => {res.status(200).json(sauces);})
    .catch((error) => {res.status(400).json({error: error,});
   });
};

exports.getOneSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
  .then((sauces) => {res.status(200).json(sauces);})
  .catch((error) => {res.status(400).json({error: error,});
 });
};


// exports.modifySauces = (req, res, next) => {
//   Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then(() => res.status(200).json({ message: "Objet modifié !" }))
//     .catch((error) => res.status(400).json({ error }));
// };

exports.modifySauces = (req, res, next) => {
  const saucesObject = req.file ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete saucesObject._userId;
  Sauces.findOne({_id: req.params.id})
      .then((sauces) => {
          if (sauces.userId != req.auth.userId) {
              res.status(401).json({ message : 'Not authorized'});
          } else {
            Sauces.updateOne({ _id: req.params.id}, { ...saucesObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Objet modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

exports.deleteSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id})
      .then(sauces => {
          if (sauces.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'});
          } else {
              const filename = sauces.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                Sauces.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};

exports.likeSauces = (req, res, next) => {
  // const like = parseInt(req.body.likes);
  // const userId = req.body.userId;      
  // const sauceId = req.params.id;


  // console.log("J'ai atteint like")
  // console.log(req.body)

  /*{
    "userId":"63a08924d88d4452614a6025",
    "like" : 1
}
*/

// console.log(req.params)
/*
Récupère l'id de la sauce
*/
// console.log({_id:req.params.id})

Sauces.findOne({_id:req.params.id})

.then((sauces) => {
  //res.status(200).json(sauces)
  //méthode javascript includes()
  //utilisation de l'opérateur $inc (mongoDB)
  //utilisation de l'opérateur $push (mongoDB)
  //utilisation de l'opérateur $pull (mongoDB)
  
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2EwODkyNGQ4OGQ0NDUyNjE0YTYwMjUiLCJpYXQiOjE2NzE4MDIxMTEsImV4cCI6MTY3MTg4ODUxMX0.-fQmSEBSYe7gNfyPt6r1HxLhrPyZzkEWBgaOOfjyYNM
  if(!sauces.usersLiked.includes(req.body.userId) && req.body.like === 1 && !sauces.usersDisliked.includes(req.body.userId)){
    //Si userId n'est plas dans le tableau usersLiked

    Sauces.updateOne(
      {_id:req.params.id},
      {
        $inc: {likes:1},
        $push: {usersLiked: req.body.userId}
      }
    )
    .then(() => res.status(201).json({message : "La sauce est aimée"}))
    .catch(() => res.status(401).json(error))
  }

  if(sauces.usersLiked.includes(req.body.userId) && req.body.like === 0){
    Sauces.updateOne(
      {_id:req.params.id},
      {
        $inc: {likes: -1},
        $pull: {usersLiked: req.body.userId}
      }
    )
    .then(() => res.status(201).json({message : "La sauce n'est plus aimée"}))
    .catch(() => res.status(401).json(error))
  }

  if(!sauces.usersDisliked.includes(req.body.userId) && req.body.like === -1 && !sauces.usersLiked.includes(req.body.userId)){


    Sauces.updateOne(
      {_id:req.params.id},
      {
        $inc: {dislikes:1},
        $push: {usersDisliked: req.body.userId}
      }
    )
    .then(() => res.status(201).json({message : "La sauce est haïs !"}))
    .catch(() => res.status(401).json(error))
  }
  if(sauces.usersDisliked.includes(req.body.userId) && req.body.like === 0){


    Sauces.updateOne(
      {_id:req.params.id},
      {
        $inc: {dislikes:-1},
        $pull: {usersDisliked: req.body.userId}
      }
    )
    .then(() => res.status(201).json({message : "La sauce n'est plus haïs !"}))
    .catch(() => res.status(401).json(error))
  }
}

)
.catch(error => res.status(400).json(error))}

