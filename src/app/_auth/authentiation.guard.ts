import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthenticationService,
    private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isUserLoggedIn) {
        // authorised so return true
        return true;
      }
      else {
        // not logged in so redirect to login page with the return url
        this.router.navigate(['login'], {
          queryParams: { returnUrl: state.url }
        });
      }
    return false
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isUserLoggedIn) {
      // authorised so return true
      return true;
    }
    else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['login'], {
        queryParams: { returnUrl: state.url }
      });
    }

      //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    // canDeactivate(
    //   component: unknown,
    //   currentRoute: ActivatedRouteSnapshot,
    //   currentState: RouterStateSnapshot,
    //   nextState ?: RouterStateSnapshot): Observable < boolean | UrlTree > | Promise < boolean | UrlTree > | boolean | UrlTree {
    //   return true;
    // }
    canLoad(
      route: Route,
      segments: UrlSegment[]): Observable < boolean | UrlTree > | Promise < boolean | UrlTree > | boolean | UrlTree {

      if (this.authService.isUserLoggedIn)
        return true;

      return false;
    }
  }
