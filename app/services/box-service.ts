import { Observable, ObservableArray, File, knownFolders, path } from '@nativescript/core';
import { Box } from '../models/box';

export class BoxService extends Observable {
  private boxes: ObservableArray<Box> = new ObservableArray<Box>();
  private readonly STORAGE_KEY = 'moving_boxes';

  constructor() {
    super();
    this.loadBoxes();
  }

  private loadBoxes() {
    // TODO: Load from local storage
  }

  async addBox(box: Omit<Box, 'id' | 'createdAt' | 'updatedAt'>): Promise<Box> {
    const newBox: Box = {
      ...box,
      id: `BOX_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.boxes.push(newBox);
    await this.saveBoxes();
    return newBox;
  }

  async savePhoto(boxId: string, imagePath: string): Promise<string> {
    const documents = knownFolders.documents();
    const folderPath = path.join(documents.path, 'box_photos', boxId);
    const fileName = `photo_${Date.now()}.jpg`;
    const destinationPath = path.join(folderPath, fileName);

    // Ensure directory exists
    if (!File.exists(folderPath)) {
      File.mkdirSync(folderPath);
    }

    // Copy photo to app storage
    const file = File.fromPath(imagePath);
    await file.copy(destinationPath);

    return destinationPath;
  }

  getBoxes(): Box[] {
    return this.boxes.slice();
  }

  getBoxById(id: string): Box | undefined {
    return this.boxes.find(box => box.id === id);
  }

  private async saveBoxes(): Promise<void> {
    // TODO: Save to local storage
  }
}