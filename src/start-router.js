import {Router} from 'director/build/director';
import {autorun} from 'mobx';
import {viewsForDirector} from './utils';

const createDirectorRouter = (views, store, directorConf = {}) => {
  return new Router({
    ...viewsForDirector(views, store)
  }).configure({
    html5history: true,
    ...directorConf,
  }).init();
};

const startRouter = (views, store, directorConf) => {
  //create director configuration
  const directorRouter = createDirectorRouter(views, store, directorConf);

  //autorun and watch for path changes
  autorun(() => {
    const {currentPath} = store.router;
    const { pathname, search, } = window.location
    const fullPath = `${ pathname }${ search }`
    if (currentPath !== fullPath) {
      window.history.pushState(null, null, currentPath)
    }
  });
  return directorRouter
};

export default startRouter;
