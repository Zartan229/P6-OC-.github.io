const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


//const Thing = require('./models/thing');
//const login = require('./models/User');


const userRoutes = require('./routes/user');

mongoose.connect("mongodb+srv://bob:bob@cluster0.cadw7vn.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(bodyParser.json());

app.use('/api/auth', userRoutes);

module.exports = app;

  // app.use('/api/auth/login', (req, res, next) => {
  //     const user = [
  //       {
  //         email: 'maxime.ortuno@hotmail.fr',
  //         password: 'bob',
  //       },
  //     ]
  //     res.status(200).json(user);
  //   });

  //   // app.post('/api/auth/login', (req, res, next) => {
  //   //     const login = new Login({
  //   //       ...req.body
  //   //     });
  //   //     login.save()
  //   //       .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
  //   //       .catch(error => res.status(400).json({ error }));
  //   //   });
  //     app.post('/api/auth/signup', (req, res, next) => {
  //       const user = new User({
  //         ...req.body
  //       });
  //        res.status(201).json({ message: 'Objet enregistré !'})
  //     })
      // app.post('/api/auth/login', (req, res, next) => {

      //   const user = new User({
      //     ...req.body
      //   });
      //   thing.save()
      //     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      //     .catch(error => res.status(400).json({ error }));
      // });
  // app.post('/api/stuff', (req, res, next) => {
  //   //delete req.body._id;
  //   const thing = new Thing({
  //     ...req.body
  //   });
  //   thing.save()
  //     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
  //     .catch(error => res.status(400).json({ error }));
  // });
  // app.use('/api/stuff', (req, res, next) => {
  //   Thing.find()
  //     .then(things => res.status(200).json(things))
  //     .catch(error => res.status(400).json({ error }));
  // });

  // app.post('/api/stuff', (req, res, next) => {
  //   console.log(req.body);
  //   res.status(201).json({
  //     message: 'Objet créé !'
  //   });
  // });

  // app.get('/api/stuff/:id', (req, res, next) => {
  //   Thing.findOne({ _id: req.params.id })
  //     .then(thing => res.status(200).json(thing))
  //     .catch(error => res.status(404).json({ error }));
  // });

  // app.use('/api/stuff', (req, res, next) => {
  //   const stuff = [
  //     {
  //       _id: 'oeihfzeoi',
  //       title: 'Mon premier objet',
  //       description: 'Les infos de mon premier objet',
  //       imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
  //       price: 4900,
  //       userId: 'qsomihvqios',
  //     },
  //     {
  //       _id: 'oeihfzeomoihi',
  //       title: 'Mon deuxième objet',
  //       description: 'Les infos de mon deuxième objet',
  //       imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
  //       price: 2900,
  //       userId: 'qsomihvqios',
  //     },
  //   ];
  //   res.status(200).json(stuff);
  // });





  /*
app.post('/api/auth/signup', (req, res, next) => {
  res.status(201).json({
    message: 'Objet créé !'
  });
});

app.post('/api/signup', (req, res, next) => {
  const thing = new signup({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});
*/
// app.use((req, res, next) => {
//   console.log('Requête reçue !');
//   next();
// });

// app.use((req, res, next) => {
//   res.status(201);
//   next();
// });

// app.use((req, res, next) => {
//   res.json({ message: 'Votre requête a bien été reçue !' });
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Réponse envoyée avec scès !');
// });

