
export enum AppState {
  LANDING = 'LANDING',
  ATELIER = 'ATELIER',
  LETTER = 'LETTER',
  REVIEW = 'REVIEW',
  GARDEN = 'GARDEN'
}

export interface FlowerData {
  id: string;
  name: string;
  meaning: string;
  color: string;
  modelPath?: string;
}

export interface BouquetItem {
  id: string;
  flowerId: string;
  position: [number, number, number];
  rotation: [number, number, number];
}

export interface SavedBouquet {
  id: string;
  creator: string;
  location: string;
  items: BouquetItem[];
  message: string;
  timestamp: number;
}
