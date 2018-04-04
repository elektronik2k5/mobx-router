import React from 'react';
import { observer, } from 'mobx-react';

const newTabProps = {
  target: '_blank',
  rel: 'noopener',
}

export function Link({
  view,
  className,
  params = {},
  queryParams = {},
  href = view.replaceUrlParams(params, queryParams),
  store = {},
  refresh = false,
  style,
  children,
  title = children,
  router = store.router,
  shouldOpenInNewTab = false,
  ...linkProps,
}){
  if (!router) {
    return console.error(
      "The 'router' prop must be defined for a Link component to work!", { args: arguments, }
    )
  }
  const anchorProps = {
    ...(style && { style, }),
    ...(className && { className, }),
    ...(shouldOpenInNewTab && newTabProps),
    onClick(e){
      const isMiddleClick = e.which === 2
      const isCmdOrCtrl = (e.metaKey || e.ctrlKey);
      const realShouldOpenInNewTab = shouldOpenInNewTab || isMiddleClick || isCmdOrCtrl;
      const shouldNavigateManually = refresh || realShouldOpenInNewTab || isCmdOrCtrl;
      if (!shouldNavigateManually) {
        e.preventDefault()
        router.goTo(view, params, store, queryParams)
      }
    },
    href,
    children: title,
    ...linkProps,
  }
  return <a {...anchorProps} />
}

export const ObserverLink = observer(Link)

export default ObserverLink
