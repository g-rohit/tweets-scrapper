const express = require('express');
const router = express.Router();


// to show any msg on home page
// router.get('/', (req, res) => {
//     res.send('Welcome');
// })


// to render anything from the views folder

router.get('/', (req, res) => res.render('welcome'));
 




module.exports = router;