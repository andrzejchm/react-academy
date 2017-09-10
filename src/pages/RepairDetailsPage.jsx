import React from 'react';

export default function UsersPage({ match }) {
  return (
    <h1>REPAIR DETAILS PAGE {match.params.repairId}</h1>
  );
}
