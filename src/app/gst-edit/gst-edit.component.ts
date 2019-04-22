import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BusinessService } from '../business.service';
import Player from '../Player';

@Component({
  selector: 'app-gst-edit',
  templateUrl: './gst-edit.component.html',
  styleUrls: ['./gst-edit.component.css']
})
export class GstEditComponent implements OnInit {

  player: Player;
  playerForm: FormGroup;
  coach: String;
  isNewPlayer: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private bs: BusinessService,
    private fb: FormBuilder) {
      this.createForm();
     }

  createForm() {
    this.playerForm = this.fb.group({
      id: ['', Validators.required ],
      name: ['', Validators.required ],
      position: ['', Validators.required ],
      MA: ['', Validators.required ],
      ST: ['', Validators.required ],
      AG: ['', Validators.required ],
      AV: ['', Validators.required ],
      skills: ['', Validators.required ],
      COMP: ['', Validators.required ],
      TD: ['', Validators.required ],
      INT: ['', Validators.required ],
      CAS: ['', Validators.required ],
      MVP: ['', Validators.required ],
      updated: ['', Validators.required ],
      cost: ['', Validators.required ],
      comment: ['', Validators.required ],
      missesNextMatch: ['', Validators.required ]
    });
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.coach = params['coach'];
      this.bs
        .getPlayers(params['coach'])
        .subscribe((data: Player[]) => {
          this.isNewPlayer = (params['id'] === '0');
          for (let i = 0; i < data.length ; i++) {
            if (data[i].id.toString() === params['id'] && data[i].updated == null) {
              this.player = data[i];
            }
          }
       });
    });
  }

  updatePlayer(id, name, position, MA, ST, AG, AV, skills, COMP, TD, INT, CAS, MVP, cost, comment, missesNextMatch) {
    if (this.isNewPlayer) {
      this.bs.createBasicPlayer(this.coach, position, MA, ST, AG, AV, skills, COMP, TD, INT, CAS, MVP, cost);
    }
    this.bs.updatePlayer(this.coach, this.player._id.$oid,
                          id, name, position, MA, ST, AG, AV,
                          skills, COMP, TD, INT, CAS, MVP, cost, comment, missesNextMatch);
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
          this.router.navigate(['teamview', this.coach]);
        }, 1000);
    });
  }
}
