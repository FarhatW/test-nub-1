import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header">
      <span>Supprimer un fournisseur</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      voulez vous supprimer ce fournisseur ?
    </div>
    <div class="modal-footer ">
      <button class="btn btn-md btn-danger" (click)="closeModal()">NON</button>
      <button class="btn btn-md btn-success" (click)="delete()">OUI</button>
    </div>
  `,
})
export class DeleteRoleModalComponent {
  modalHeader: string;
  modalContent = `<h1>delet edelete</h1>`;
  constructor(private activeModal: NgbActiveModal) { }
  closeModal() {
    this.activeModal.close(false);
  }
  delete() {
    this.activeModal.close(true);
  }
}
