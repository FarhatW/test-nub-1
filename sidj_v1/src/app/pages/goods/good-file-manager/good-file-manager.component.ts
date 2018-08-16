import {Compiler, Component, OnInit, ViewChild} from '@angular/core';
import {FilesService} from "../../../@core/data/services/files.service";
import {SelectItem, TreeNode} from "primeng/primeng";
import {IDTONode} from "../../../@core/data/models/files/DTONode";
import {environment} from "../../../../environments/environment";
import {ToasterService} from "angular2-toaster";
import {TranslationService} from "../../../@core/data/services/translation.service";
import {CookieService} from "ngx-cookie-service";
import {TranslateService} from "@ngx-translate/core";
import {HelperService} from "../../../@core/utils/Helper.service";
import {LocalStorageService} from "angular-2-local-storage";
import {NotificationService} from "../../../@core/data/services/notification.service";
import {FileUpload} from 'primeng/primeng';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../../../@core/data/services/user.service";
import {UserToken} from "../../../@core/data/models/users/userToken";


@Component({
  selector: 'ngx-file-manager',
  templateUrl: './good-file-manager.component.html',
  styleUrls: ['./good-file-manager.component.scss']
})
export class GoodFileManagerComponent implements OnInit {

  files: any[] = [];
  errorMessage: string;
  invalidTypeMessage: string;
  fileList: TreeNode[];
  selectedNodes: TreeNode;
  foldersDropdown: SelectItem[] = [];
  selectedFolder: IDTONode;
  showCreateFolderPopup: boolean = false;
  NewFolderName: string = '';
  url: string = this.filesService.uploadsEndPoint;
  maxSizeMessage: string;
  user: UserToken;
  @ViewChild('fileInput') fileInput: FileUpload;
  isFrench: boolean;

  constructor(private filesService: FilesService,
              private compiler: Compiler,
              private translationService: TranslationService,
              public translate: TranslateService,
              private localStorageService: LocalStorageService,
              private notificationService: NotificationService,
              private toasterService: ToasterService,
              private helperService: HelperService,
              private userService: UserService,
  ) {
    this.isFrench = this.translationService.getCurrentLanguageAsBool();
    this.user = this.userService.getCurrentUser();
    this.maxSizeMessage = this.isFrench ? 'Le fichier ne doit pas dépasser 512kb' : 'Maximum upload size is 512 KB.';
    this.invalidTypeMessage = this.isFrench ? 'Mauvais type de fichier : seuls les .jpg ou .jpeg sont acceptés.'
      : 'Invalid file type : only .jpg and .jpeg types are allowed.'
  }

  ngOnInit() {
    this.getFilesAndFolders();
  }

  public getFilesAndFolders() {
    this.errorMessage = '';

    this.fileList = [];

    this.filesService.getFiles()
      .subscribe((files) => {
        console.log(files);
          // Show the Files in the Tree Control
          let childs = [];
          for (let file of files.children) {
            for (let fileChild of file.children) {
              console.log(file.label, '===', this.user.nameid)
              if (file.label === this.user.nameid) {
                this.fileList.push(fileChild);
              }
            }
          }
          console.log(this.fileList);
        },
        error => this.errorMessage = <any>error);

    this.foldersDropdown = [];
    this.filesService.getFolders()
      .subscribe((folders) => {
          var tempFoldersDropdown: SelectItem[] = [];
          for (let folder of folders.children) {
            let newSelectedItem: SelectItem = {
              label: folder.label,
              value: folder.data
            };
            let testItemValue = newSelectedItem.value.replace(/\D/g, '');
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
        }
        ,
        error => this.errorMessage = <any>error
      );
  }

  public deleteItems() {

    let ParentDTONode: IDTONode = {
      data: '',
      label: '',
      expandedIcon: '',
      collapsedIcon: '',
      children: [],
      parentId: 0
    };

    if (this.selectedNodes.type !== 'folder') {

      let ChildDTONode: IDTONode = {
        data: this.selectedNodes.data,
        label: this.selectedNodes.label,
        expandedIcon: this.selectedNodes.expandedIcon,
        collapsedIcon: this.selectedNodes.collapsedIcon,
        children: [],
        parentId: 0
      };

      ParentDTONode.children.push(ChildDTONode);

      this.filesService.deleteFilesAndFolders(ParentDTONode)
        .subscribe(() => {
            // Refresh the files and folders
            this.getFilesAndFolders();
          },
          error => this.errorMessage = <any>error);

    } else {
      const title: string = 'Attention !';
      const body: string = 'Vous ne pouvez pas supprimer le dossier ' + this.selectedNodes.label + '.';
      this.toasterService.popAsync(
        this.notificationService.showWarningToast(title, body));
    }
  }

  public openCreateFolder() {
    this.showCreateFolderPopup = true;
  }

  public CreateFolder(isCreateButton: boolean) {

    var NewFolder: string = isCreateButton ? this.selectedFolder + '\\' + this.NewFolderName :
       this.user.nameid;

    this.filesService.createFolder(NewFolder)
      .subscribe(res => {
          this.showCreateFolderPopup = false;
          this.getFilesAndFolders();
        },
        error => {
          this.errorMessage = <any>error;
        }
      )
  }

  public onBeforeUploadHandler(event) {
    event.formData.append('selectedFolder', this.selectedFolder);
  }

  public onUploadHandler(event) {

    if (event.xhr.status === 200) {
      event.files.forEach(item => {
        // console.log('item', item);
        this.toasterService.popAsync(
          this.notificationService.showSuccessToast(
            this.isFrench ? 'Image Ajoutée' : 'Picture added successfully', item.name))
      });

      this.getFilesAndFolders();
      this.compiler.clearCache();
    }
  }

  onUploadError(event) {

    const error = JSON.parse(event.xhr.response);
    const title = this.isFrench ? 'Problème d\'ajout' : 'Upload Error';
    const body = this.isFrench ? error.messageData.fr : error.messageData.eng;
    this.toasterService.popAsync(
      this.notificationService.showErrorToast(title, body))
  }
}
