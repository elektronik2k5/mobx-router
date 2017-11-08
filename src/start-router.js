import {Router} from 'director/build/director';
import {autorun} from 'mobx';
import {viewsForDirector} from './utils';

const createDirectorRouter = (views, store, directorConf = {}) => {
  new Router({
    ...viewsForDirector(views, store)
  }).configure({
    html5history: true,
    ...directorConf,
  }).init();
};

const startRouter = (views, store, directorConf) => {
  //create director configuration
  createDirectorRouter(views, store, directorConf);

  //autorun and watch for path changes
  autorun(() => {
    const {currentPath} = store.router;
    if (currentPath !== window.location.pathname) {
      window.history.pushState(null, null, currentPath)
    }
  });
};

export default startRouter;
