import { Component } from '@angular/core';

@Component({
  selector: 'app-people-register',
  templateUrl: './people-register.component.html',
  styleUrls: ['./people-register.component.css']
})
export class PeopleRegisterComponent {
  pessoa: any = {
    name: '',
    sex: '',
    birthDate: '',
    maritalStatus: ''
  };

  endereco: any = {
    cep: '',
    address: '',
    number: '',
    complement: '',
    district: '',
    state: '',
    city: ''
  };

  adicionarEndereco(): void {

    console.log('Adicionar mais um endereço');
  }
}
