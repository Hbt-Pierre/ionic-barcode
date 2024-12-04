import { Injectable } from '@angular/core';
import {Barcode} from "../model/barcode.declaration";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {

  private static readonly LOCAL_STORAGE_KEY = "barcodes";
  public barcodes = new BehaviorSubject<Barcode[]>([{code: "001010100101",productName: "Brosse à dents"}]);

  constructor() {
    //Chargement des tâches
    this.loadFromStorage();

    //A chaque changement d'état
    this.barcodes.subscribe({next: (_) => {
        this.saveToStorage();
      }});
  }

  /**
   * Méthode utilisée pour retirer le code bar du cache
   * @param bc Object code barre
   */
  delete(bc: Barcode) {
    const newBc = this.barcodes.value.filter(b => b != bc);
    this.barcodes.next(newBc);
  }

  /**
   * Méthode utilisée pour ajouter le code bar au cache
   * @param bc Object code barre
   */
  add(bc: Barcode) {
    const newBc = this.barcodes.value;
    newBc.push(bc);
    this.barcodes.next(newBc);
  }

  /**
   * Méthode utilisée pour ajouter le code bar au cache
   * @param bcs Liste de codes barres
   */
  addMultiple(bcs: Barcode[]) {
    const newBc = this.barcodes.value;
    bcs.forEach(b => newBc.push(b));
    this.barcodes.next(newBc);
  }

  fetchInfo(bc: Barcode) {

  }

  /**
   * Méthode utilisée pour charger les données depuis le localStorage
   * @private
   */
  private loadFromStorage(){
    const savedTasks = localStorage.getItem(BarcodeService.LOCAL_STORAGE_KEY);
    let tasks = savedTasks ? JSON.parse(savedTasks) : [];

    this.barcodes.next(tasks);
  }

  /**
   * Méthode utilisée pour enregistrer les tâches dans le localStorage
   * @private
   */
  saveToStorage(){
    localStorage.setItem(BarcodeService.LOCAL_STORAGE_KEY, JSON.stringify(this.barcodes.value));
  }
}
