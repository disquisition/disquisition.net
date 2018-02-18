import Router from '../routes';

export default function redirect(res, target) {
  if (res) {
    res.redirect(target);
  } else {
    Router.replaceRoute(target);
  }
}
