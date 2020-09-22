import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { AccidentProvider } from '../../providers/accident/accident';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastProvider } from '../../providers/toast/toast';
declare let VanillaFile: any;
/**
 * Generated class for the AddPedestrianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-pedestrian',
  templateUrl: 'add-pedestrian.html',
})
export class AddPedestrianPage {

  pedestrainForm: FormGroup;
  accidentForm: FormGroup;
  index: number = -1;
  pedestrianImageUrls = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public accSev: AccidentProvider,
    public camera: Camera,
    public modalCtrl: ModalController,
    private accService: AccidentProvider,
    public toastSev: ToastProvider,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController) {
    this.getPedestrianForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPedestrianPage');
    console.log(this.navParams.get('accident'));
    this.accidentForm = <FormGroup>this.navParams.get('accident');
    this.index = this.navParams.get('index');
    if (this.navParams.get('index') > -1) {
      const editPedestrainObj = this.accidentForm['pedestrians'][this.index];
      console.log(editPedestrainObj);
      Object.keys(editPedestrainObj).forEach(key => {
        if (editPedestrainObj[key] && this.pedestrainForm.controls[key]) {
          this.pedestrainForm.controls[key].patchValue(editPedestrainObj[key]);
        }
      });
    }
    // if (this.accidentForm['index']) {
    //   this.index = this.accidentForm['index'];
    // }
  }

  getPedestrianForm() {
    this.pedestrainForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      address: ['', [Validators.required]],
      gender: [, [Validators.required]],
      typeAndExtendOfHumanFactor: [null],
      natureOfAnyInjuries: [null],
      dataOnSocioEconomicStatus: [null],
      underInfluence: [false, [Validators.required]],
      medias: this.fb.array([]),
      type: ["Pedestrian", [Validators.required]],
    });

  }

  savePedestrian() {
    console.log(this.pedestrainForm.value);
    this.toastSev.showLoader();
    const pedestrian = <FormArray>this.accidentForm['pedestrians'];
    const formData = this.convertModelToFormData(this.pedestrainForm.value, new FormData(), '');
    if (this.pedestrainForm.value.id) {
      this.accService.editPedestrian(this.accidentForm['id'], this.pedestrainForm.value.id, formData).subscribe(response => {
        this.toastSev.hideLoader();
        this.toastSev.showToast('Pedestrian Updated !');
        pedestrian[this.index] = response;
        // pedestrian.removeAt(this.index);
        // pedestrian.insert(this.index, response);
        console.log(response);
        this.dismiss();
      }, (error => {
        this.toastSev.hideLoader();
      }))
    }
    else {
      this.accService.addPedestrian(this.accidentForm['id'], formData).subscribe(response => {
        pedestrian.push(response);
        this.toastSev.hideLoader();
        console.log(response);
        this.toastSev.showToast('Pedestrain Saved !');
        this.dismiss();
      }, (error => {
        this.toastSev.hideLoader();
      }))
    }
  }

  // submitPedestrian() {
  //   this.toastSev.showLoader();
  //   const formData = this.convertModelToFormData(this.pedestrainForm.value, new FormData(), '');
  //   this.accService.addPedestrian(this.accidentForm['id'], formData).subscribe(response => {
  // pedestrian.push(this.pedestrainForm.value);
  //     this.toastSev.hideLoader();
  //     console.log(response);
  //     this.toastSev.showToast('Pedestrian Saved !');
  //   }, (error => {
  //     this.showError(error.message);
  //     this.toastSev.hideLoader();
  //   }))
  // }

  convertModelToFormData(model: any, form: FormData = null, namespace = ''): FormData {
    let formData = form || new FormData();
    for (let propertyName in model) {
      if (!model.hasOwnProperty(propertyName) || model[propertyName] == undefined) continue;
      let formKey = namespace ? `${namespace}.${propertyName}` : propertyName;
      if (model[propertyName] instanceof Array) {
        if (propertyName == 'medias') {
          model[propertyName].forEach((element, index) => {
            if (element instanceof VanillaFile) {
              formData.append(propertyName + '[' + index + '].media', element);
            } else {
              formData.append(propertyName + '[' + index + '].id', element.id);
            }
          });
        } else {
          model[propertyName].forEach((element, index) => {
            if (typeof element != 'object') {
              formData.append(`${formKey}[${index}]`, element);
            } else {
              const tempFormKey = `${formKey}[${index}]`;
              this.convertModelToFormData(element, formData, tempFormKey);
            }
          });
        }
      } else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File)) {
        this.convertModelToFormData(model[propertyName], formData, formKey);
      }
      else {
        formData.append(formKey, model[propertyName].toString());
      }
    }
    return formData;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showError = (message) => {
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    })
    alert.present();
  }

}
