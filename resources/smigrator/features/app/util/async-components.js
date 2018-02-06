export function Home () {
  return import(/* webpackChunkName: "features/home" */'../../home');
}

export function Stpacks () {
  return import(/* webpackChunkName: "features/stpacks" */'../../stpacks');
}

export function MobileHome () {
  return import(/* webpackChunkName: "features/home" */'../../mobile_home');
}

export function MobileRecentStpacks () {
  return import(/* webpackChunkName: "features/home" */'../../mobile_recent_stpacks');
}

export function MobileSearchStpacks () {
  return import(/* webpackChunkName: "features/home" */'../../mobile_search_stpacks');
}
