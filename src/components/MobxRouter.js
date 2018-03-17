import React from 'react';
import {observer, inject} from 'mobx-react';

const MobxRouter = ({ store: { router, }, }) => (
  <>{router.currentView && router.currentView.component}</>
);
export default inject('store')(observer(MobxRouter));
