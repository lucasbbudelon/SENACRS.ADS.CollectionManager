import { Component, OnInit } from '@angular/core';

import { CollectionService } from '../../shared/services/collection.service'
import { Collection } from '../../shared/models/collection'

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

    collections: Collection[];

    constructor(private _service: CollectionService) {

    }

    async ngOnInit(): Promise<void> {

        await this._service
            .getAll()
            .toPromise()
            .then(result => {
                if (result.length) {
                    this.collections = result;
                } else {
                    alert("Não existem coleções cadastradas!");
                }
            })
            .catch(result => {
                console.log(result);
                alert("Erro ao carregar coleções!");
            });

    }
}
