export interface Box {
  id: string;
  label: string;
  description: string;
  notes: string;
  room: string;
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  id: string;
  name: string;
}