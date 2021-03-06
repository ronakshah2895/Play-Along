import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './../services/communication.service';
import { UserService } from './../services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formData = {username: '', password: '', is_admin: true};
  loginError = false;
  constructor(private comm: CommunicationService, private user: UserService, private navCtrl: NavController) { }

  ngOnInit() {
    if (this.user.logged_in) {
      this.logout();
    } else {
      this.checkIfUserLogged();
    }
  }
  
  checkIfUserLogged() {
    this.comm.get('user_logged_in').subscribe((res) => {
      this.user.logged_in = res['logged_in'];
      if (this.user.logged_in) {
        this.navCtrl.navigateRoot('/home');
      }
    });
  }

  login() {
    this.comm.sendPost('login', this.formData).subscribe(() => {
      this.user.logged_in = true;
      this.navCtrl.navigateRoot('/home');
    }, (err) => {
      this.loginError = true;
      console.log(err);
    });
  }

  logout() {
    this.comm.get('logout').subscribe(() => {
      this.user.logged_in = false;
    });
  }

}
