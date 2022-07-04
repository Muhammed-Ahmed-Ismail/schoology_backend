// const express = require('express');
// const BulkSaveResultsToDB = require('./bulkSaveResultsToDB');
// const app = express()
// const port = 4000
// const formID = '1m1FMrF8iPz-XJU9v8yMjrc4Zq5XnwwLYjqZJOxnc0c4';
// const getResultsFromApi = require('./getResFromApiService')

// app.get('/save/:formID', async(req, res) => {
//     result = await getResultsFromApi(req.params.formID);
//     statusx = await BulkSaveResultsToDB(result);
//     // console.log(result)
//   res.send(result)
// })
// app.get('/api/:id', (req,res) => {
//   res.send(req.params.id)
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// copied the two services files to scoolix project
// copied the app code here , will have to copy it in /router/controller and so on
// copied credentials.json file here
// notice:will have to install googleapi and so on here


// TO DO

// list exam -> end point to filter by course id
// list exam -> end point to filter by class id
// list exam -> for a specfic exam -> {student name - score}
// for student -> list every exam with my score

// note : all exams max score is 5.
