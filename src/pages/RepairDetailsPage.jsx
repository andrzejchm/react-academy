import React from 'react';
import PropTypes from 'prop-types';

export default function UsersPage({ match }) {
  return (
    <h1>REPAIR DETAILS PAGE {match.params.repairId}</h1>
  );
}

UsersPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repairId: PropTypes.number,
    }),
  }).isRequired,
};
