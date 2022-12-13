const redisClient = require("../config/redis");

async function speciesCache(req, res, next) {
    const species = req.params.species;

    if (!species) return res.status(404);

    let results;
    try {
        const cacheResults = await redisClient.get(species);
        if (cacheResults) {
            results = JSON.parse(cacheResults);
            res.send({
                fromCache: true,
                data: results,
            });
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(404);
    }
}

module.exports = { speciesCache };