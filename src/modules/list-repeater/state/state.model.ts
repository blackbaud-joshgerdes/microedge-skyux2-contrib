import { Injectable } from '@angular/core';
import { SkyListRepeaterPagingOptionsModel } from '../models';

@Injectable()
export class SkyListRepeaterStateModel {
  public pagingOptions: SkyListRepeaterPagingOptionsModel = new SkyListRepeaterPagingOptionsModel();
}
