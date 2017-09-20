import PropTypes from 'prop-types';

export default class ApiResponse {
  constructor(payload, error, status) {
    this.payload = payload;
    this.error = error;
    this.status = status;
  }
}

export const ErrorShape = PropTypes.shape({
  message: PropTypes.string,
  code: PropTypes.number,
});

export function ApiResponseShapeInterior(payloadShape) {
  return {
    payload: payloadShape,
    status: PropTypes.string,
    error: ErrorShape,
  };
}
