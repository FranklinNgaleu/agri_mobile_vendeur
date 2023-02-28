// import { UserInterface } from './../interfaces/user.interface';
import { LocalStorage } from './localStorage';

export class UserHelper {
  constructor() {

  }

  /**
   * determine wheather or not a user is authenticate
   */
  static isConnect(): boolean {

    return LocalStorage.getItem('agriweb_Vendeur') !== (undefined || null);
  }
  /**
   * Remove user data to the local DB
   */
  static disconect(): void {
    LocalStorage.delete('agriweb_Vendeur');
  }

  /**
   * Get the current log user
   */
  static getUser(): any {
    return JSON.parse(LocalStorage.getItem('agriweb_Vendeur'));
  }
  static getUserId(): any {
    const user = LocalStorage.getItem('agriweb_Vendeur');
    const userJson = JSON.parse(user);

    return userJson.id_User;
  }

  /**
   * Add user data to the local DB
   * @param * user user object to be saved
   */
  static connect(user: any): void {
    LocalStorage.setItem('agriweb_Vendeur', JSON.stringify(user));
  }


  
}
