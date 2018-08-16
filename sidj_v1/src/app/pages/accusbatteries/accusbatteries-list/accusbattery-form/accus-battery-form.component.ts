import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AccuService} from '../../../../@core/data/services/accus.service';
import {NotificationService} from '../../../../@core/data/services/notification.service';
import {BatteryService} from '../../../../@core/data/services/battery.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'ngx-accusbattery-form',
  templateUrl: './accusbattery-form.component.html',
  styleUrls: ['./accusbattery-form.component.scss'],
})
export class AccusBatteryFormComponent implements OnInit, OnDestroy {

  isEdit: boolean;
  item: any = {
    id: 0,
    ref: null,
  };
  id: number;
  isAccus: boolean;
  title: string;
  buttonText: string;
  itemDataSub: Subscription;
  routeDataSub: Subscription;
  blankTitle: string = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private accusService: AccuService,
              private batteryService: BatteryService,
              private notificationService: NotificationService,
              private toasterService: ToasterService,
  ) {
    this.routeDataSub = this.route.data.subscribe(x => {
        this.isAccus = x.isAccus;
        this.title = '';
        this.title = x.title;
      },
    );

    this.route.params.subscribe(p => {
      this.id = +p['id'] || 0;
      this.blankTitle = this.isEdit ? this.title + this.id : this.title;
      this.isEdit = !!this.id;
      this.buttonText = this.isEdit ? 'Modifier' : 'Créer';
      if (this.isEdit) {
        const $result = this.isAccus ? this.accusService.getAccu(this.id) : this.batteryService.getBattery(this.id);
        $result.subscribe(b => {
          this.item = b;
        })
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.routeDataSub) {
      this.routeDataSub.unsubscribe();
    }
    if (this.itemDataSub) {
      this.itemDataSub.unsubscribe();
    }
  }

  onSubmit() {
    const $service = this.isAccus ? this.accusService : this.batteryService;
    const $result = this.isEdit ? $service.update(this.item) : $service.create(this.item);

    $result.subscribe(x => {
        // console.log('x', x);
        this.handleSuccess(x);
      },
      err => {
        // console.log('err', err);
        this.handleError(err);
      })
  }

  handleSuccess(res) {
    const title = 'Succès';
    const body = res.ref + (this.isEdit ? ' modifiée ' : ' ajoutée ') + 'avec succès.'
    this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));
    this.router.navigate(['/accusbatteries/list/']);
  }

  handleError(err) {
    const title = 'Erreur';
    const body = err.statusText;
    this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));
  }
}
