import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Repair from '../model/Repair';
import RepairsList from '../components/RepairsList';

const repairsList = [
  new Repair('1', 'name1'),
  new Repair('2', 'name2'),
  new Repair('3', 'name3'),
  new Repair('4', 'name4'),
];

export default function RepairsListPage({ history }) {
  return (
    <RepairsList repairsList={repairsList} history={history} />
  );
}

RepairsListPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};
