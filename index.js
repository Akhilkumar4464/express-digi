import express from 'express';

const app = express();

 const PORT = 5000;

 app.use(express.json());

  let teaData = []
   let nextId = 1;
// for taking data from user 
   app.post('/teas', (req, res) => {
      
      const { name, price,} = req.body;

       const newTea = {
           id: nextId++,
           name,
             price,
       }
       teaData.push(newTea);
       res.status(201).json(newTea);

   })
// get all teas and a specific tea by id
   app.get('/teas', (req, res) => {
       res.status(200).send(teaData);  
   });
   app.get('/teas/:id', (req, res) => {
      teaData.find((t) => {
          if (t.id === parseInt(req.params.id)) {
              return res.status(200).send(t);
          }else {
              return res.status(404).send({ message: 'Tea not found' });
          }
      });
   });
   // update the tea by id
   app.put('/teas/:id', (req, res) => {
      const tea = teaData.find(t => t.id === parseInt(req.params.id));
      if (!tea) {
         return res.status(404).send({ message: 'Tea not found' });
      }
      const { name, price } = req.body;
      tea.name = name;
      tea.price = price;
      res.status(200).send(tea);
   });
// for deleting the tea by id

app.delete('/teas/:id', (req, res) => {
    const teaId = parseInt(req.params.id);
    if (isNaN(teaId)) {
        return res.status(400).send({ message: 'Invalid tea ID' });
    }

    const deleteTeaIndex = teaData.findIndex(t => t.id === teaId);
    if (deleteTeaIndex === -1) {
        return res.status(404).send({ message: 'Tea not found' });
    }

    teaData.splice(deleteTeaIndex, 1); // Just call splice without assignment
    return res.status(200).send({ message: 'Tea deleted successfully' });
});



  

 app.listen ( PORT,( )=>{
    console.log(`Server is running at ${PORT}...`);
 })