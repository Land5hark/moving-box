import { Observable } from '@nativescript/core';
import { Box } from '../../models/box';
import { BoxService } from '../../services/box-service';
import { Camera } from '@nativescript/core';

export class BoxDetailViewModel extends Observable {
  private boxService: BoxService;
  private _box: Box;

  constructor(boxId: string) {
    super();
    this.boxService = new BoxService();
    this._box = this.boxService.getBoxById(boxId);
  }

  get box(): Box {
    return this._box;
  }

  async onTakePhoto() {
    try {
      const image = await Camera.takePicture({
        width: 1024,
        height: 1024,
        keepAspectRatio: true,
        saveToGallery: false
      });

      if (image) {
        const photoPath = await this.boxService.savePhoto(this._box.id, image.path);
        this._box.photos.push(photoPath);
        this.notifyPropertyChange('box', this._box);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }

  onPrintLabel() {
    // TODO: Implement label printing functionality
  }

  onPhotoTap(args: any) {
    // TODO: Show full-screen photo viewer
  }

  onEditBox() {
    // TODO: Navigate to edit box page
  }
}