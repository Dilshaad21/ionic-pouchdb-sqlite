import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmployeeService } from '../employee.service';
import { EmployeePage } from '../employee/employee.page';
import { Employee } from '../employee';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public employees: Employee[] = [];
  constructor(
    public modalCtrl: ModalController,
    public employeeService: EmployeeService
  ) {}

  onInit() {}

  async addEmployee() {
    await this.employeeService.createPouchDB();

    this.employeeService
      .read()
      .then((employees) => {
        this.employees = employees;
      })
      .catch((err) => {});
    this.employeeService.create({
      firstName: 'Dilshaad',
      lastName: 'Muthalif',
    });
  }

  async showDetails(employee) {
    const modal = await this.modalCtrl.create({
      component: EmployeePage,
      componentProps: { employee },
    });
    return await modal.present();
  }
}
