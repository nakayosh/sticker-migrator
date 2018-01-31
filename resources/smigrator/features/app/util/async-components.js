export function Home () {
  return import(/* webpackChunkName: "features/home" */'../../home');
}

export function Stpacks () {
  return import(/* webpackChunkName: "features/stpacks" */'../../stpacks');
}

export function Compose () {
  return import(/* webpackChunkName: "features/compose" */'../../compose');
}
