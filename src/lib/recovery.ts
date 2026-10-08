import { isMarket } from './markets';
export function recoveryLink(pathname: string) {
  const market = pathname.split('/')[1];
  return isMarket(market) ? `/${market}/services` : '/';
}
