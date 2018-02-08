export function Home () {
  return import(/* webpackChunkName: "features/home" */'@/features/home');
}

export function Stpacks () {
  return import(/* webpackChunkName: "features/stpacks" */'@/features/stpacks');
}

export function MobileHome () {
  return import(/* webpackChunkName: "features/mobile_home" */'@/features/mobile_home');
}

export function RecentStpacks () {
  return import(/* webpackChunkName: "features/recent_stpacks" */'@/features/recent_stpacks');
}

export function SearchStpacks () {
  return import(/* webpackChunkName: "features/search_stpacks" */'@/features/search_stpacks');
}
