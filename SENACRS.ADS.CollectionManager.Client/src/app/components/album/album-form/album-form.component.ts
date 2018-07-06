import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlbumService } from '../../../shared/services/album.service'
import { Album } from '../../../shared/models/album'

@Component({
    selector: 'app-album-form',
    templateUrl: './album-form.component.html',
    styleUrls: ['./album-form.component.css']
})
export class AlbumFormComponent implements OnInit {

    album: Album;

    constructor(private _service: AlbumService, 
                private _route: ActivatedRoute,
                private _router: Router ) {

    }

    async ngOnInit(): Promise<void> {
        
        var id = this._route.params.subscribe(params => {
            
            var id = params['id'];

             this._service
                .get(id)
                .toPromise()
                .then(result => {
                    if (result == null) {
                        alert("Não existem registro cadastrados!");
                    } else {
                        this.album = result;
                        console.log(result);
                    }
                })
                .catch(result => {
                    console.log(result);
                    alert("Erro ao carregar registros!");
                });
        });
    }

    // async ngOnInit(): Promise<void> {

    //     await this._service
    //         .getByEmail("lucasbbudelon@gmail.com")
    //         .toPromise()
    //         .then(result => {
    //             if (result.length) {
    //                 this.albums = result;
    //             } else {
    //                 alert("Não existem registros cadastrados!");
    //             }
    //         })
    //         .catch(result => {
    //             console.log(result);
    //             alert("Erro ao carregar registros!");
    //         });

    // }
}
