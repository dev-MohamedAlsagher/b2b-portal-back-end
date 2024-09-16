const ServiceError = require('../core/serviceError');
const adresRepo = require('../repository/adres');


const getAdresByKlantId = async (id) => {
  const adres = await adresRepo.getAdresByKlantId(id);

  if(!adres) {
    throw ServiceError.notFound("Not found");
  }
  return adres;
}

const getAdresByLeverancierId = async (id) => {
  const adres = await adresRepo.getAdresByLeverancierId(id);

  if(!adres) {
    throw ServiceError.notFound("Not found");
  }
  
  return adres;
}


const getAdresById = async(id) => {
  const adres = await adresRepo.getAdresById(id)
  if(!adres){
    throw ServiceError.notFound(`There is no adres with id ${id}.`, {id})
  }
  return adres  
};

const createAdres = async ({ straat, nummer, stad, postcode }) => {
  const idNewAdres = await adresRepo.createAdres({ straat, nummer, stad, postcode})
  return await adresRepo.getAdresById(idNewAdres)
};



module.exports = {
  getAdresById,
  createAdres,
  getAdresByKlantId,
  getAdresByLeverancierId,
};