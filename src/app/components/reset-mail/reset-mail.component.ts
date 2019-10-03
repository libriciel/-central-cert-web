/*
 * Central Cert Web
 * Copyright (C) 2018-2019 Libriciel-SCOP
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-reset-mail',
    templateUrl: './reset-mail.component.html',
    styleUrls: ['./reset-mail.component.css']
})
export class ResetMailComponent implements OnInit {

    constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(data => {
            let id = data.id;
            let add = data.addMail;
            this.http.get('/api/certificat/resetMail?id=' + id + '&addMail=' + add).subscribe(data => {
            });
        });
    }
}
