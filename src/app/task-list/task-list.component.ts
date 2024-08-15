import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import axios from 'axios';
import { ImagePreviewModalComponent } from '../image-preview-modal/image-preview-modal.component';

interface Task {
  title: string;
  description: string;
  imageUrl?: string;
  location?: any;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class TaskListComponent {
  tasks: Task[] = [];
  newTask: Task = { title: '', description: '' };

  constructor(private modalController: ModalController) {}

  addTask() {
    if (this.newTask.title && this.newTask.description) {
      this.tasks.push({ ...this.newTask });
      this.newTask = { title: '', description: '' };
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });

      const imageUrl = image.webPath ?? '';
      this.showImagePreview(imageUrl);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  async showImagePreview(imageUrl: string) {
    const modal = await this.modalController.create({
      component: ImagePreviewModalComponent,
      componentProps: { imageUrl }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.confirmed) {
      this.newTask.imageUrl = imageUrl;
    }
  }

  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.newTask.location = coordinates;
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }

  async syncTasks() {
    try {
      const response = await axios.post('https://api.example.com/sync', this.tasks);
      console.log('Tasks synchronized:', response.data);
    } catch (error) {
      console.error('Error syncing tasks:', error);
    }
  }
}







