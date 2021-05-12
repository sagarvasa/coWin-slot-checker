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

exports.notifyForPincodes = async (req, res) => {
  try {
      const data = await service.portal.findForPincodes(req, res);
      if(Array.isArray(data) && req.body.mobile) {
        service.portal.triggerNotification(data, req);
      }
      return res.status(200).send(data);
    } catch (err) {
      return res.status(err.status || errorConst.INTERNAL_SERVER_ERROR).send(err);
    }
}

exports.notifyForDistricts = async (req, res) => {
  try {
      const data = await service.portal.findForDistricts(req, res);
      if(Array.isArray(data) && req.body.mobile) {
        service.portal.triggerNotification(data, req);
      }
      return res.status(200).send(data);
    } catch (err) {
      return res.status(err.status || errorConst.INTERNAL_SERVER_ERROR).send(err);
    }
}