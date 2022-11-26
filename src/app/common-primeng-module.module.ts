import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { OrderListModule } from 'primeng/orderlist';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    GalleriaModule,
    ImageModule,
    DividerModule,
    TabViewModule,
    TableModule,
    InputTextModule,
    RadioButtonModule,
    InputTextareaModule,
    CheckboxModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    DialogModule,
    OrderListModule,
    TagModule,
    DropdownModule,
  ],
  exports: [
    ButtonModule,
    GalleriaModule,
    ImageModule,
    DividerModule,
    TabViewModule,
    TableModule,
    InputTextModule,
    RadioButtonModule,
    InputTextareaModule,
    CheckboxModule,
    ToastModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    DialogModule,
    OrderListModule,
    TagModule,
    DropdownModule,
  ],
})
export class CommonPrimengModuleModule {}
