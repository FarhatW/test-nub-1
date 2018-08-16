import {AfterContentChecked, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IDTONode} from '../../../../@core/data/models/Files/DTONode';
import {SelectItem, TreeNode} from 'primeng/primeng';
import {LocalStorageService} from 'angular-2-local-storage';
import {NotificationService} from '../../../../@core/data/services/notification.service';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';
import {HelperService} from '../../../../@core/utils/Helper.service';
import {TranslationService} from '../../../../@core/data/services/translation.service';
import {ToasterService} from 'angular2-toaster';
import {FilesService} from '../../../../@core/data/services/files.service';
import {GoodService} from '../../../../@core/data/services/good.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ImageFromService} from '../../../../@core/data/services/imageFrom.service';
import {environment} from '../../../../../environments/environment';
import {EnumTranslation} from '../../../../@core/data/models/enums/enumTranslation';
import {SaveSidjGood} from '../../../../@core/data/models/goods/sidjGood/saveSidjGood';
import {GoodFormService} from '../shared/good-form.service';
import {UserService} from '../../../../@core/data/services/user.service';
import {UserToken} from '../../../../@core/data/models/users/userToken';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';
import {RedirectService} from '../../../../@core/data/services/redirect.service';

@Component({
  selector: 'ngx-good-form-step-6',
  templateUrl: './good-form-step-6.component.html',
  styleUrls: ['./good-form-step-6.component.scss'],
})
export class GoodFormStep6Component implements OnInit, AfterContentChecked {
  @ViewChild('f') validMainForm: NgForm;
  user: UserToken;
  isFrench: boolean;
  goodImageFrom: EnumTranslation[];
  errorMessage: string;
  fileList: TreeNode[];
  selectedNodes: TreeNode;
  foldersDropdown: SelectItem[] = [];
  selectedFolder: IDTONode;
  showCreateFolderPopup: boolean = false;
  NewFolderName: string = '';
  url: string = this.filesService.uploadsEndPoint;
  urlWithGoodsNumber: string = this.filesService.uploadWithGoodsNumber;
  goodNameFilename: string;
  image: string;
  good: SaveSidjGood;
  errorBody: string;
  urlPhoto: string;
  path: string;
  languageSub: Subscription;
  navigationSubscription: Subscription;
  getCurrentId: number;
  imageSplit: string[];
  imageToAPI: string;
  getPictureExtension: string;
  currentPictureNumber: string[];
  newCurrentPictureNumber: number;

  constructor(
    private filesService: FilesService,
    private translationService: TranslationService,
    public translate: TranslateService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService,
    private toasterService: ToasterService,
    private helperService: HelperService,
    private cookieService: CookieService,
    public goodService: GoodService,
    private imageFromService: ImageFromService,
    private goodsService: GoodService,
    private goodFormService: GoodFormService,
    private userService: UserService,
    private router: Router,
    private redirectService: RedirectService) {
    this.goodsService.getCurrentGoodId().subscribe( x => {
      this.getCurrentId = x;
    });

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getCurrentSaveGood();
      }
    });
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();

    this.urlPhoto = environment.apiPicture;

    this.getCurrentSaveGood();
    this.getFilesAndFolders();

    this.imageFromService.getAll().subscribe(imagefrom => {
      this.goodImageFrom = imagefrom;
    });

    this.languageSub = this.translationService.getLanguage().subscribe(x => {
      this.isFrench = x;
    });
  }

  ngAfterContentChecked() {
    this.goodFormService.setValidForm(this.validMainForm.valid);
  }

  getCurrentSaveGood() {
    this.goodsService.getCurrentSaveGood().subscribe(g => {
      if (g === undefined) {
        (this.getCurrentId) ? this.redirectService.getRedirectEditForm(this.getCurrentId)
          : this.redirectService.getRedirectNewForm();
      } else {
        if (g.id) {
          this.good = this.goodFormService.checkCurrentGood(g.id, g, this.router.url);
        }
      }
    });
  }

  public getFilesAndFolders() {

    this.errorMessage = '';
    this.fileList = [];

    this.filesService.getFiles()
      .subscribe((files) => {
        const childs = [];
        for (const file of files.children) {
          for (const fileChild of file.children) {
            if (fileChild.label === this.user.nameid) {
              this.fileList = fileChild.children;
            }
          }
        }
      }, error => this.errorMessage = <any>error);

    this.foldersDropdown = [];
    this.filesService.getFolders()
      .subscribe((folders) => {
        let tempFoldersDropdown: SelectItem[] = [];
        for (const folder of folders.children) {
          const newSelectedItem: SelectItem = {
            label: folder.label, value: folder.data,
          };

          const testItemValue = newSelectedItem.value.replace(/\D/g, '');

          if (newSelectedItem.label !== 'SIDJFileBase' && testItemValue === this.user.nameid) {
            tempFoldersDropdown.push(newSelectedItem);
          }
        }
        this.foldersDropdown = tempFoldersDropdown;

        if (this.foldersDropdown.length === 0) {
          this.CreateFolder(false);
        }
        if (this.foldersDropdown[0]) {
          this.selectedFolder = this.foldersDropdown[0].value;
        }
      }, error => this.errorMessage = <any>error);
  }

  public deleteItemById() {
    this.path = this.good.supplierId + '/' + this.good.picture;

    const ParentDTONode: IDTONode = {
      data: '', label: '', expandedIcon: '', collapsedIcon: '', children: [], parentId: 0,
    };

    const ChildDTONode: IDTONode = {
      data: this.path, label: '', expandedIcon: '', collapsedIcon: '', children: [], parentId: 0,
    };

    ParentDTONode.children.push(ChildDTONode);
    this.filesService.deleteFilesAndFolders(ParentDTONode)
      .subscribe(() => {
        // Refresh the files and folders
        this.getFilesAndFolders();
      }, error => this.errorMessage = <any>error);

    this.good.picture = '';
    this.goodService.update(this.good)
      .subscribe(x => console.log(x));
  }

  public deleteItemByIdWithoutCleanGoodPicture() {
    this.path = this.good.supplierId + '/' + this.good.picture;

    const ParentDTONode: IDTONode = {
      data: '', label: '', expandedIcon: '', collapsedIcon: '', children: [], parentId: 0,
    };

    const ChildDTONode: IDTONode = {
      data: this.path, label: '', expandedIcon: '', collapsedIcon: '', children: [], parentId: 0,
    };

    ParentDTONode.children.push(ChildDTONode);
    this.filesService.deleteFilesAndFolders(ParentDTONode)
      .subscribe(() => {
        // Refresh the files and folders
        this.getFilesAndFolders();
      }, error => this.errorMessage = <any>error);
  }

  public CreateFolder(isCreateButton: boolean) {

    let NewFolder: string = isCreateButton ? this.selectedFolder + '\\' + this.NewFolderName : this.user.nameid;
    this.filesService.createFolder(NewFolder)
      .subscribe(res => {
        this.showCreateFolderPopup = false;
        this.getFilesAndFolders();
      }, error => {
        this.errorMessage = <any>error;
      });
  }

  public onBeforeUploadHandler(event) {
    event.formData.append('selectedFolder', this.selectedFolder);
  }

  public onUploadHandler(event) {
    if (event.xhr.status === 200) {
      event.files.forEach(item => {
        this.deleteItemByIdWithoutCleanGoodPicture();
        this.setNameImage(item.name);
        this.toasterService.popAsync(this.notificationService.showSuccessToast
        (this.isFrench ? 'Image Ajoutée' : 'Picture added successfully', this.good.picture));
        this.router.navigate([this.router.url]);

      });

      this.getFilesAndFolders();
    }
  }

  private _handleSubmitError(err) {
    this.errorBody = this.isFrench ?
      'Une erreur est survenu lors du téléchargement de votre Image'
      : '\n' + 'An error occurred while uploading your Picture';
    const title = this.isFrench ? 'Une erreur est survenu !' : '\n' + 'An error has occurred !'
    const body = this.errorBody;
    this.toasterService.popAsync(this.notificationService.showErrorToast(title, body))
  }

  goToBefore() {
    this.goodService.setCurrentSaveGoods(this.good);
    this.good.id === 0 ?
      this.router.navigate(['/good/form/comantary'])
      : this.router.navigate(['/good/form-edit/' + this.good.id + '/comantary'])
  }

  keyDown(event) {
    if (event.keyCode === 13) {
      this.submit();
    }
  }


  checkSupplier(): string {
    let agentId = 0;
      if (this.goodFormService.getCurrentAffectecSupplierValue()) {
      agentId = this.goodFormService.getCurrentAffectecSupplierValue().original.original;
    }
    return this.urlPhoto + (agentId ? agentId :  this.good.supplierId)
      + '/' + this.good.picture;
  }

  submit() {
    this.goodService.setCurrentSaveGoods(this.good);
    this.goodService.update(this.good)
      .subscribe(x => console.log(x),
      );
    this.router.navigate(['/dashboard'])
  }

  onBeforeSend(event) {
    this.goodService.getCurrentSaveGood().subscribe(x => {
      this.good = x;
      this.imageSplit = this.good.picture.toLowerCase().split('.');
      this.currentPictureNumber = this.imageSplit[0].split('-');
      this.newCurrentPictureNumber = (this.currentPictureNumber[0] === '') ? 0 : +this.currentPictureNumber[1] + 1;
      this.imageToAPI = this.good.reference + '-' + this.newCurrentPictureNumber;
    });
    event.formData.append('reference', this.imageToAPI);
  }

  public setNameImage(pictureName) {
    this.goodService.getCurrentSaveGood().subscribe(x => {
      this.good = x;
      this.getPictureExtension = pictureName.toLowerCase().split('.');
      this.imageSplit = this.good.picture.toLowerCase().split('.');
      this.currentPictureNumber = this.imageSplit[0].split('-');
      this.newCurrentPictureNumber = (this.currentPictureNumber[0] === '') ? 0 : +this.currentPictureNumber[1] + 1;
      this.goodNameFilename =
        this.good.reference + '-' + this.newCurrentPictureNumber + '.' + this.getPictureExtension[1];
      this.good.picture = this.goodNameFilename;
    });

    this.goodService.update(this.good)
      .subscribe(x => {
        this.good = x;
      }, err => {
        this._handleSubmitError(err);
      });
  }

}
