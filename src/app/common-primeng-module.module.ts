import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    GalleriaModule,
    ImageModule,
    DividerModule,
    TabViewModule,
    TableModule,
  ],
  exports: [
    ButtonModule,
    GalleriaModule,
    ImageModule,
    DividerModule,
    TabViewModule,
    TableModule,
  ],
})
export class CommonPrimengModuleModule {}
