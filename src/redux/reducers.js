import auth from '../usecases/authDuck';
import repairsList from '../usecases/repairsListDuck';
import repairsFiltersPanel from '../usecases/repairsFiltersPanelDuck';

export default {
  userInfo: auth,
  repairsList,
  filterPanel: repairsFiltersPanel,
};
