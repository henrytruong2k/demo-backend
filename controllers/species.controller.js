const axios = require("axios");
const redisClient = require("../config/redis");
const { TIME_EXPIRE } = require("../constants/expire.constants");

const speciesCtrl = {
  getSpeciesData: async (req, res) => {
    const species = req.params.species;
    try {
      const { data } = await axios.get(
        `https://www.fishwatch.gov/api/species/${species}`
      );
      if (data.length === 0) {
        throw new Error("API returned an empty array");
      }
      await redisClient.set(species, JSON.stringify(data), {
        EX: TIME_EXPIRE * 60,
        NX: true,
      });

      return res.send({
        fromCache: false,
        data,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(404).send({ message: error.message });
    }
  },
};

module.exports = speciesCtrl;
