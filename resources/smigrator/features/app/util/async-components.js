export function Home () {
  return import(/* webpackChunkName: "features/home" */'@/features/home');
}

export function Stpacks () {
  return import(/* webpackChunkName: "features/stpacks" */'@/features/stpacks');
}

export function MobileHome () {
  return import(/* webpackChunkName: "features/mobile_home" */'@/features/mobile_home');
}

export function MobileRecentStpacks () {
  return import(/* webpackChunkName: "features/mobile_recent_stpacks" */'@/features/mobile_recent_stpacks');
}

export function MobileSearchStpacks () {
  return import(/* webpackChunkName: "features/mobile_search_stpacks" */'@/features/mobile_search_stpacks');
}
