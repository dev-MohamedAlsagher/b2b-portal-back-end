const orderDetailsRepository = require("../repository/orderDetails");
const ServiceError = require("../core/serviceError");

const getOrderDetailsById = async (idOrderDetails) => {
  try {
    const orderDetails = await orderDetailsRepository.getOrderDetailsById(
      idOrderDetails
    );

    if (!orderDetails) {
      throw ServiceError.notFound(
        `There are no order details with id ${idOrderDetails}.`,
        { idOrderDetails }
      );
    }

    return orderDetails;
  } catch (error) {
    throw error;
  }
};

const getOrderDetailsByOrderId = async (idOrder) => {
  try {
    const orderdetails = await orderDetailsRepository.getOrderDetailsByOrderId(
      idOrder
    );
    if (!orderdetails) {
      throw ServiceError.notFound(
        `There is no orderDetails with id ${idOrder}.`,
        { idOrder }
      );
    }
    return orderdetails;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getOrderDetailsById,
  getOrderDetailsByOrderId,
};
