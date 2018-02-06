export function Home () {
  return import(/* webpackChunkName: "features/home" */'../../home');
}

export function Stpacks () {
  return import(/* webpackChunkName: "features/stpacks" */'../../stpacks');
}

export function MobileHome () {
  return import(/* webpackChunkName: "features/mobile_home" */'../../mobile_home');
}

export function MobileRecentStpacks () {
  return import(/* webpackChunkName: "features/mobile_recent_stpacks" */'../../mobile_recent_stpacks');
}

export function MobileSearchStpacks () {
  return import(/* webpackChunkName: "features/mobile_search_stpacks" */'../../mobile_search_stpacks');
}
