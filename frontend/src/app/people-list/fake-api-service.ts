// fake-api.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  private pessoas = [
    {
      id: 1,
      name: 'João',
      sex: 'M',
      birthDate: '1975-04-12',
      maritalStatus: 'Solteiro',
      addresses: [
        {
          cep: '12345-678',
          address: 'Rua das Flores',
          number: '123',
          complement: 'Apartamento 101',
          district: 'Centro',
          state: 'SP',
          city: 'São Paulo'
        }
      ]
    },
    // FAKE...
  ];

  getPessoas(): any[] {
    return this.pessoas;
  }
}
