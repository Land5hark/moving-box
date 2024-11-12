import { Observable, ObservableArray } from '@nativescript/core';
import { Box } from '../../models/box';
import { BoxService } from '../../services/box-service';

export class BoxListViewModel extends Observable {
  private boxService: BoxService;
  private _boxes: ObservableArray<Box>;
  private _searchQuery: string = '';

  constructor() {
    super();
    this.boxService = new BoxService();
    this._boxes = new ObservableArray<Box>();
    this.loadBoxes();
  }

  get boxes(): ObservableArray<Box> {
    return this._boxes;
  }

  get searchQuery(): string {
    return this._searchQuery;
  }

  set searchQuery(value: string) {
    if (this._searchQuery !== value) {
      this._searchQuery = value;
      this.notifyPropertyChange('searchQuery', value);
      this.filterBoxes();
    }
  }

  private loadBoxes() {
    const boxes = this.boxService.getBoxes();
    this._boxes.push(...boxes);
  }

  private filterBoxes() {
    const boxes = this.boxService.getBoxes();
    const filtered = boxes.filter(box => 
      box.label.toLowerCase().includes(this._searchQuery.toLowerCase()) ||
      box.description.toLowerCase().includes(this._searchQuery.toLowerCase()) ||
      box.room.toLowerCase().includes(this._searchQuery.toLowerCase())
    );
    this._boxes.splice(0);
    this._boxes.push(...filtered);
  }

  onAddBox() {
    // Navigate to add box page
  }

  onBoxTap(args: any) {
    const box = this._boxes.getItem(args.index);
    // Navigate to box detail page
  }
}