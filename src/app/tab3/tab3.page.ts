import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  // Initialize variables to store contact details
  contact = {
    name: '',
    email: '',
    phone: '',
  };

  // Variable to store edited contact details
  editedContact: any;

  // Flag to indicate whether contact details are saved
  isContactSaved = false;

  constructor(private alertController: AlertController) {}

  // Define the saveContact method
  saveContact() {
    // Validate if name, email, and phone are provided
    if (!this.contact.name || !this.contact.email || !this.contact.phone) {
      this.presentAlert('Error', 'Please provide name, email, and phone.');
      return;
    }

    // Copy entered contact details to editedContact variable
    this.editedContact = { ...this.contact };

    // Set the flag to indicate contact details are saved
    this.isContactSaved = true;

    // Optionally, you can clear the input fields after saving
    this.clearFields();
  }

  // Helper function to present an alert
  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Helper function to clear input fields
  clearFields() {
    this.contact.name = '';
    this.contact.email = '';
    this.contact.phone = '';
  }

  // Method to toggle the edit mode
  toggleEditMode() {
    this.isContactSaved = !this.isContactSaved;
  }
}
