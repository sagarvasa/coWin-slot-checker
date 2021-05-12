const service = require('../services');
const errorConst = require('../utilities/errors');

exports.getStates = async (req, res) => {
    try {
        const data = await service.portal.getStates(req, res);
        return res.status(200).send(data);
      } catch (err) {
        return res.status(err.status || errorConst.INTERNAL_SERVER_ERROR).send(err);
      }
}

exports.getDistrictByState = async (req, res) => {
    try {
        const data = await service.portal.getDistrictByState(req, res);
        return res.status(200).send(data);
      } catch (err) {
        return res.status(err.status || errorConst.INTERNAL_SERVER_ERROR).send(err);
      }
}

exports.findByPinCode = async (req, res) => {
  try {
      const data = await service.portal.findByPinCode(req, res);
      return res.status(200).send(data);
    } catch (err) {
      return res.status(err.status || errorConst.INTERNAL_SERVER_ERROR).send(err);
    }
}

exports.findByDistrict = async (req, res) => {
  try {
      const data = await service.portal.findByDistrict(req, res);
      return res.status(200).send(data);
    } catch (err) {
      return res.status(err.status || errorConst.INTERNAL_SERVER_ERROR).send(err);
    }
}