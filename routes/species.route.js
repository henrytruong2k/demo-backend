const { speciesCache } = require('../cache/species.cache');
const speciesCtrl = require('../controllers/species.controller');

const router = require('express').Router();

router.get("/:species", speciesCache, speciesCtrl.getSpeciesData);

module.exports = router;